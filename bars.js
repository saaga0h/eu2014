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

  function chart (selection) {

    selection.each(function (data) {

      width = data.length * blockWidth + (data.length - 1) * gap + 2 * margin;
      height = 300;

      /*
      var color = d3.scale.quantile()
          .domain([0, 100])
          .range(['#bef0bf', '#1c7ac4', '#ffa000', '#f60067']);
      */
      var y = d3.scale.linear()
                .domain([0, 100])
                .range([height, 0]);

      var _width = (width - gap * (data.length - 1)) / data.length;

      var svg = d3.select(this)
                  .attr('height', height)
                  .attr('width', width);

      var g = svg.append('g').attr('transform', 'translate(' + margin + ', 0)');

      g.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('width', function () {
          return blockWidth;
        })
        .attr('height', function (d) {
          return height - y(d.age);
        })
        .attr('y', function (d) {
          return y(d.age);
        })
        .attr('x', function (d, i) {
          return i * blockWidth + i * gap;
        })
        .attr('class', function (d) {
          return 'party-' + d.party;
        });

      $('svg#age rect').tipsy({
        gravity: 'n',
        html: true,
        title: function() {
          var d = this.__data__;//, c = colors(d.i);
          var p = parties.filter(function (v) {
            return parseInt(Object.keys(v)[0]) == d.party;
          });
          p = p[0][Object.keys(p[0])];
          return '<strong>' + p + '</strong><br><span>' + d.person + '</span> <em>(' + d.age + ')</em>';
        }
      });
    });
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

  chart.filter = function (v) {
    d3.selectAll('svg#age rect')
      .filter(function (f) {

      })
      .attr('opacity', 0.35);
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
