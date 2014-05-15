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
  var id;

  function chart (selection) {

    selection.each(function (data) {

      width = data.length * blockWidth + (data.length - 1) * gap + 2 * margin + 60;
      height = 170;

      /*
      var color = d3.scale.quantile()
          .domain([0, 100])
          .range(['#bef0bf', '#1c7ac4', '#ffa000', '#f60067']);
      */
      // Party scale based on id's
      var p = d3.scale.ordinal()
                .domain([181, 183, 179, 176, 184, 177, 186, 185, 178, 174, 170, 172, 171, 173, 180])
                .range([0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60]);

      var y = d3.scale.linear()
                .domain([0, 81])
                .range([height, 0]);

      var _width = (width - gap * (data.length - 1)) / data.length;

      container = d3.select(this)
                  .attr('height', height)
                  .attr('width', width);

      var g = container.append('g').attr('transform', 'translate(' + margin + ', 0)');

      g.selectAll(selector)
        .data(data)
        .enter()
        .append('rect')
        .attr('width', function () {
          return blockWidth;
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
          return i * blockWidth + i * gap + p(d.partyId);
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
          return '<strong>' + p.name + '</strong><br><span>' + d.person + '</span> <em>(' + (d.age ? d.age + ' vuotta' : 'Ei tiedossa') + ')</em>';
        }
      });
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
        // if data doesn't have the property, no filtering
        if (filters.filter(function (v) {
          return d.hasOwnProperty(v.type);
        }).length === 0)
          return false;

        if (!filters || filters.length === 0)
          return false;

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

        return Object.keys(_r).map(function (k) {
          return _r[k];
        }).indexOf(true) > -1 ? true : false;
      })
      .classed('dimm', true);
  };

  chart.filterByAge = function (a, b) {
    d3.selectAll('svg#age rect')
      .classed('dimm', false)
      .filter(function (d) {
        if (a == undefined) {
          return false;
        } else {
          return d.age < a || d.age > b;
        }
      })
      .classed('dimm', true);
  };

  chart.filterById = function (i) {
    d3.selectAll('svg#age rect')
      .classed('dimm', true)
      .filter(function (d) {
        if (Array.isArray(i)) {
          return i.indexOf(d.id) > -1 ? true : false
        } else if (i != undefined){
          return d.id == i;
        } else {
          return true;
        }
      })
      .classed('dimm', false);
  };

  chart.filterByGender = function (v) {
    d3.selectAll('svg#age rect')
      .classed('dimm', true)
      .filter(function (d) {
        if (v === undefined) {
          return true;
        } else if (v === d.gender) {
          return true;
        } else {
          false;
        }
      })
      .classed('dimm', false);
  };

  chart.filterByParty = function (v) {
    d3.selectAll('svg#age rect')
      .classed('dimm', true)
      .filter(function (d) {
        if (v === d.partyId) {
          return true;
        } else if (v === undefined) {
          return true;
        } else {
          return false;
        }
      })
      .classed('dimm', false);
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
