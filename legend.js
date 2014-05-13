'use strict';

function legend () {

  var width = 1024;
  var height = 64;
  var size = 30;
  var cornerRadius = 5;
  var prefixer = '';

  function chart (selection) {

    selection.each(function (data) {
      var container = d3.select(this);

      container.selectAll('.legend')
                .data(data)
                .enter()
                .append('div')
                .classed('legend', true)
                .attr('data-id', function (d) {
                  return d.id;
                })
                .html(function (d) {
                  return '<span class="icon ' + prefixer + d.id + '"></span> \
                          <span class="label">' + d.name + '</span>';
                });
      /*
      container.select('#parties').selectAll('.label')
                .data(data)
                .enter()
                .append('div')
                .classed('label', true)
                .text(function (d) {
                  console.log(d);
                  return d.name;
                });
      */
    });
  }

  chart.prefixer = function (v) {
    if (!arguments.length) return prefixer;
    prefixer = v;
    return chart;
  };

  return chart;
}
