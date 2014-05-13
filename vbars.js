'use strict';

function vbars () {

  var prefixer = '';

  function chart (selection) {

    selection.each(function (data) {
      var container = d3.select(this);

      var x = d3.scale.linear()
                .domain([0, d3.max(data, function (v) {
                  return v.count
                })])
                .range([0, 80]);

      container.selectAll('.bar')
                .data(data)
                .enter()
                .append('div')
                .classed('bar', true)
                .attr('data-id', function (d) {
                  return d.id;
                })
                .attr('style', function (d) {
                  return 'margin-left: 60px; width: ' + x(d.count) + '%';
                })
                .html(function (d) {
                  var g = d.id === 'F' ? 'Naiset (' + d.count + ')' : d.id === 'M' ? 'Miehet (' + d.count + ')' : 'Ei tiedossa (' + d.count + ')'
                  return '<span style="margin-left: -60px" class="label">' + g + '</span>';
                });
    });
  }

  chart.prefixer = function (v) {
    if (!arguments.length) return prefixer;
    prefixer = v;
    return chart;
  };

  chart.filterByGender = function (v) {
    d3.selectAll('#genders .bar')
      .classed('dimm', true)
      .filter(function (d) {
        if (v === undefined) {
          return true;
        } else if (v === d.id) {
          return true;
        } else {
          false;
        }
      })
      .classed('dimm', false);
  };

  return chart;
}
