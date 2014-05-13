'use strict';

function heatmap () {

  var width = 1024;
  var height = 800;
  var cornerRadius = 2;
  var blockSize = 30;
  var blockHeight = 30;
  var blockWidth = 4;
  var gap = 1;
  var yAxisValues;
  var xAxisValues;
  var margin = 10;
  var questions = [];

  function chart (selection) {

    selection.each(function (data) {

      var groupColors = ['#1c7ac4', '#ffa000', '#f60067'];
      var categories = d3.scale.quantile()
          .domain([0, 2])
          .range(groupColors);

      var answerColors = ['#17d71b', '#bef0bf', '#ebee19', '#e08488', '#e32932'];
      var colors = d3.scale.ordinal()
          .domain([0, 1, 2, 3, 4])
          .range(answerColors);

      width = data.length * blockWidth + (data.length - 1) * gap + 2 * margin;
      height = 30 * blockHeight + 29 * gap + 2 * margin;

      var svg = d3.select(this)
                  .attr('width', width)
                  .attr('height', height);

      svg.append('g')
        .attr('class', 'groups')
        .attr('transform', 'translate(2,10)')
        .selectAll('.group')
        .data(['Arvot', 'Talous', 'Valta'])
        .enter()
        .append('rect')
        .attr('class', function (d) {
          return d.toLowerCase();
        })
        .attr('width', 5)
        .attr('height', function (d, i) {
          return 10 * blockHeight + 9 * gap;
        })
        .attr('x', 0)
        .attr('y', function (d, i) {
          return i * (10 * blockHeight + 10 * gap);
        })
        .attr('rx', 5)
        .attr('ry', 5);

      var g = svg.append('g')
                .attr('class', 'matrix')
                .attr('transform', 'translate(' + margin + ', ' + margin + ')');

      // map answers
      var answers = [];

      data.map(function (v, i) {
        // row_id, coloumn_id, value
        for (var j = 0; j < v.answers.length; j++) {
          answers.push({  y: j,
                          x: i,
                          question: questions[j],
                          answer: v.answers[j],
                          comment: v.comments[j],
                          age: v.age,
                          id: v.id,
                          person: v.person
                        });
        }
      });

      g.selectAll('.block').data(answers)
                            .enter()
                            .append('rect')
                            .attr('class', 'block')
                            .attr('data-q-id', function (d) {
                              return Object.keys(d.question)[0];
                            })
                            .attr('data-p-id', function (d) {
                              return d.id;
                            })
                            .attr('height', function () {
                              return blockHeight;
                            })
                            .attr('width', function () {
                              return blockWidth;
                            })
                            .attr('y', function (d, i) {
                              return d.y * blockHeight + d.y * gap;
                            })
                            .attr('x', function (d, i) {
                              return d.x * blockWidth + d.x * gap;
                            })
                            .attr('rx', function () {
                              return cornerRadius;
                            })
                            .attr('ry', function () {
                              return cornerRadius;
                            })
                            .attr('fill', function (d) {
                              return colors(d.answer);
                            });

      $('svg#candidates .block').tipsy({
        gravity: 'n',
        html: true,
        title: function() {
          var d = this.__data__;//, c = colors(d.i);
          return '<strong>' + d.question[Object.keys(d.question)[0]] + '</strong><br><q>' + d.comment + '</q><br>- ' + d.person;
        }
      });
    });

  }

  chart.filterByAge = function (a, b) {
    d3.selectAll('svg#candidates .block')
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

  chart.filterByQuestion = function (q) {
    d3.selectAll('svg#candidates .block')
      .classed('dimm', true)
      .filter(function (d) {
        if (q != undefined) {
          return d.question[q] != null;
        } else {
          return true;
        }
      })
      .classed('dimm', false);
  };

  chart.filterById = function (i) {
    d3.selectAll('svg#candidates .block')
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

  chart.filterByComments = function (v) {
    d3.selectAll('svg#candidates .block')
      .classed('dimm', true)
      .filter(function (d) {
        if (v) {
          return d.comment != '';
        } else if (!v) {
          return d.comment == '';
        } else {
          return true;
        }
      })
      .classed('dimm', false);
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

  chart.gap = function (v) {
    if (!arguments.length) return gap;
    gap = v;
    return chart;
  };

  chart.questions = function (v) {
    if (!arguments.length) return questions;
    questions = v;
    return chart;
  };

  return chart;
}
