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
  var parties = [];

  var container;
  var selector = '.block';
  var id;

  function chart (selection) {

    selection.each(function (data) {

      // Party scale based on id's
      //
      var p = d3.scale.ordinal()
                .domain([181, 183, 179, 176, 184, 177, 186, 185, 178, 174, 170, 172, 171, 173, 180])
                .range([0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60]);

      var groupColors = ['#1c7ac4', '#ffa000', '#f60067'];
      var categories = d3.scale.quantile()
          .domain([0, 2])
          .range(groupColors);

      var answerColors = ['#17d71b', '#bef0bf', '#ebee19', '#e08488', '#e32932'];
      var colors = d3.scale.ordinal()
          .domain([0, 1, 2, 3, 4])
          .range(answerColors);

      width = data.length * blockWidth + (data.length - 1) * gap + 2 * margin + 60;
      height = 30 * blockHeight + 29 * gap + 2 * margin;

      container = d3.select(this)
                  .attr('width', width)
                  .attr('height', height);

      var groups = container.append('g')
                      .attr('class', 'groups')
                      .attr('transform', 'translate(2,10)');

      groups.selectAll('.group')
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

       groups.selectAll('.label')
             .data(['Arvot', 'Talous', 'Valta'])
             .enter()
             .append('g')
             .attr('transform', function (d, i) {
               var c = (5 * blockHeight) + i * (10 * blockHeight + 10 * gap)
               return 'translate(0, ' + c + ')';
             })
             .classed('label', true)
             .append('text')
             .text(function (d) {
               return d;
             })
             .attr('transform', 'rotate(90)');

      var matrix = container.append('g')
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
                          answer: parseInt(v.answers[j]),
                          comment: v.comments[j],
                          age: v.age,
                          id: v.id,
                          person: v.person,
                          partyId: v.partyId,
                          gender: v.gender,
                          candidateId: v.candidateId
                        });
        }
      });

      matrix.selectAll(selector).data(answers)
                            .enter()
                            .append('rect')
                            .attr('class', 'block')
                            .attr('data-q-id', function (d) {
                              return Object.keys(d.question)[0];
                            })
                            .attr('data-id', function (d) {
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
                              return d.x * blockWidth + d.x * gap + p(d.partyId);
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
        gravity: function () {
          var d = this.__data__;
          var dir;

          if (d.x < 50)
            return 'w';
          else if (d.x < 50 && d.y < 10)
            return 'se';
          else if (d.x > 173)
            return 'e';
          else if (d.x > 173 && d.y > 20)
            return 'nw'
          else if (d.y > 20)
            return 's';
          else if (d.y > 20 && d.x < 50)
            return 'nw';
          else if (d.y > 20 && d.x > 173)
            return 'nw'
          else
            return 'n';
          return $.fn.tipsy.autoWE;//d.x < 50 && d.x > 183 ? $.fn.tipsy.autoWE : $.fn.tipsy.autoNS;
        },
        html: true,
        title: function() {
          var d = this.__data__;//, c = colors(d.i);
          var p = parties.filter(function (v) {
            return v.partyId === d.partyId;
          })[0];
          return '<strong>' + d.question[Object.keys(d.question)[0]] + '</strong><br><q>' + (d.comment != '' ? d.comment : 'Ei kommentia') + '</q><br>- ' + d.person + ' (' + p.name + ')';
        }
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

  chart.parties = function (v) {
    if (!arguments.length) return parties;
    parties = v;
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
