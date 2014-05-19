'use strict';

function vbars () {

  var prefixer = '';
  var container;
  var selector = '.bar';
  var id;

  function chart (selection) {

    selection.each(function (data) {
      container = d3.select(this);

      var x = d3.scale.linear()
                .domain([0, d3.max(data, function (v) {
                  return v.count
                })])
                .range([0, 80]);

      container.selectAll(selector)
                .data(data)
                .enter()
                .append('div')
                .classed('bar', true)
                .attr('data', function (d) {
                  return d[id];
                })
                .attr('style', function (d) {
                  return 'margin-left: 60px; width: ' + x(d.count) + '%';
                })
                .html(function (d) {
                  var g = d.name + ' (' + d.count + ')';
                  return '<span style="margin-left: -60px" class="label">' + g + '</span>';
                });
    });
  }

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

  chart.prefixer = function (v) {
    if (!arguments.length) return prefixer;
    prefixer = v;
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

        for (var i=0; i < filters.length; i++) {
          var filter = filters[i];

          if (d.hasOwnProperty(filter.type) && f(d[filter.type], filter.values, filter.type))
            return false;
        }

        return true;
      })
      .classed('dimm', true);
  };

  return chart;
}
