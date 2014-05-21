'use strict';

function legend () {

  var width = 1024;
  var height = 64;
  var size = 30;
  var cornerRadius = 5;
  var prefixer = '';

  var container;
  var selector = '.legend';
  var id;

  function chart (selection) {

    selection.each(function (data) {
      container = d3.select(this);

      container.selectAll(selector)
                .data(data)
                .enter()
                .append('div')
                .classed('legend', true)
                .attr('data', function (d) {
                  return id === 'party' ? d.partyId : d.answerId;
                })
                .html(function (d) {
                  return '<span class="icon ' + id + '-' + (id === 'party' ? d.partyId : d.answerId) + '"></span> \
                          <span class="label">&nbsp;&nbsp;' + d.name + '</span>';
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

  chart.filter = function (filters) {
    /*
    var f = function (data, values, type) {
      if (type !== 'age')
        return values.indexOf(data) !== -1 ? true : false;
      else {
        var _ = [];
        for (var i=0; i < values.length; i++) {
        // data.min < values[  ] > data.max
          _.push(data[0] < values[i] && values[i] < data[1]);
        }
        return _.indexOf(true) > -1 ? true : false;
        //(values[0] <= data && data <= values[1]);
      }
    };

    chart.container().selectAll(chart.selector())
      // find once that don't match existing filters
      // Filter always have value array and type
      .classed('dimm', false)
      .filter(function (d) {
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
    */
  };

  return chart;
}
