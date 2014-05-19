function bars () {

  var width;
  var height;
  var gap = 1;
  var blockWidth = 4;
  var vertical = true;
  var color = d3.scale.category20();
  var format = d3.format();
  var margin = 10;
  var parties = [];
  var container;
  var selector = 'rect';
  var scale = d3.scale.ordinal();

  //var scale = d3.scale.ordinal();

  function chart (selection) {

    selection.each(function (data) {

      width = 1140; //data.length * blockWidth + (data.length - 1) * gap + 2 * margin + 60;
      height = 170;

      var y = d3.scale.linear()
                .domain([0, 81])
                .range([height, 0]);
      //
      var ids = data.map(function (v) {
        return +v.id;
      })
      scale.domain(ids)
           .rangeBands([0, width], .2, 0);
      // no groups
      //  - 60

      var _width = (width - gap * (data.length - 1)) / data.length;

      container = d3.select(this)
                  .attr('height', height)
                  .attr('width', width);

      var g = container.append('g').attr('transform', 'translate(' + 0 + ', 0)');

      g.selectAll(selector)
        .data(data)
        .enter()
        .append('rect')
        .attr('width', function () {
          return scale.rangeBand();
        })
        .attr('data', function (d) {
          return d.candidateId;//d.id;
        })
        .attr('data-party-id', function (d) {
          return d.partyId;
        })
        .attr('height', function (d) {
          return height - y(d.age ? d.age : 17);
        })
        .attr('y', function (d) {
          return y(d.age ? d.age : 17);
        })
        .attr('x', function (d, i) {
          return scale(d.id);// + App.n0.eu.Group.getGroupBy()(d.partyId);
        })
        .attr('class', function (d) {
          return 'party-' + d.partyId;
        });

      $('svg#age rect').tipsy({
        gravity: 'n',
        html: true,
        title: function() {
          var d = this.__data__;//, c = colors(d.i);
          var p = parties.filter(function (v) {
            return v.partyId === d.partyId;
          })[0];
          //p = p[0][Object.keys(p[0])];
          return '<strong>' + p.name + '</strong><br><span>' + d.person + '</span> <em>(' + (d.age ? d.age + ' vuotta' : 'Ei vastausta') + ')</em>';
        }
      });
    });
  };

  chart.scale = function () {
    return scale;
  };

  chart.sort = function (type, reset) {
    // Clone data array, otherwise sort will destroy the order
    var s = App.n0.eu.Sort.getSortBy(reset ? undefined : type);

    // how to figure out which way to sort items
    //
    //var g0 =  App.n0.eu.Group.getGroupBy(type);

    var s0 = Array.apply(null, container.datum()).sort(s);
    var d0 = s0.map(function (d) {
      return +d.id;
    });

    var x0 = scale.copy();
    x0.domain(d0);

    var transition = chart.container().transition().duration(250);
    var delay = function (d, i) {
      return i * 5;
    };

    transition.selectAll(chart.selector())
              .delay(delay)
              .attr('x', function (d, i) {
                return x0(d.id);// + g0(d[type]);
              });
  };

  chart.container = function (v) {
    if (!arguments.length) return container;
    container = v;
    return chart;
  };

  chart.selector = function (v) {
    if (!arguments.length) return selector;
    selector = v;
    return chart;
  };

  chart.id = function (v) {
    if (!arguments.length) return id;
    id = v;
    return chart;
  };

  chart.filter = function (filters) {
    var f = function (data, values, type) {
      if (type !== 'age')
        return values.indexOf(data) !== -1 ? true : false;
      else
        return (values[0] <= data && data <= values[1]);
    };

    chart.container().selectAll(chart.selector())
      // find once that don't match existing filters
      // Filter always have value array and type
      .classed('dimm', false)
      .filter(function (d) {

        if (!filters || filters.length === 0)
          return false;

        // if data doesn't one of the filtering properties
        // removed it from filters array
        filters = filters.filter(function (v) {
          return d.hasOwnProperty(v.type);
        });
        /*
        if (filters.filter(function (v) {
          return d.hasOwnProperty(v.type);
        }).length === 0)
          return false;
        */

        var _f = [];

        for (var i=0; i < filters.length; i++) {
          var filter = filters[i];

          if (d.hasOwnProperty(filter.type) && f(d[filter.type], filter.values, filter.type))
            _f.push({ type: filter.type, value: false });
          else
            _f.push({ type: filter.type, value: true });
        }

        // reduce to unique values
        var _r = {};

        for (var i=0; i < _f.length; i++) {
          //
          if (_r[_f[i].type] && _f[i].value === false)
            _r[_f[i].type] = false;
          else if (_r[_f[i].type] == undefined)
            _r[_f[i].type] = _f[i].value;
        }

        var _ = Object.keys(_r).map(function (k) {
          return _r[k];
        }).indexOf(true) > -1 ? true : false;

        d.dimm = _ ? 1 : 0;
        return _;
      })
      .classed('dimm', true);

    return chart;
  };

  chart.parties = function (v) {
    if (!arguments.length) return parties;
    parties = v;
    return chart;
  };

  chart.format = function (v) {
    if (!arguments.length) return format;
    format = v;
    return chart;
  };

  chart.gap = function (v) {
    if (!arguments.length) return gap;
    gap = v;
    return chart;
  };

  chart.width = function (v) {
    if (!arguments.length) return width;
    width = v;
    return chart;
  };

  chart.height = function (v) {
    if (!arguments.length) return height;
    height = v;
    return chart;
  };

  return chart;

};
