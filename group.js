window.App.n0.eu.Group = window.App.n0.eu.Group || {};

(function() {

  var self = this;

  this.getGroupBy = function (type, value) {
    var grouping;
    switch (type) {
      case 'gender':
        grouping = self.groupByGender();
        break;
      case 'age':
        grouping = self.groupByAge(App.n0.eu.Sort.groupSortByAge());
        break;
      default:
        grouping = self.groupByDefault();
    }

    return grouping;
  };

  this.groupByDefault = function () {
    var d0 = [181, 183, 179, 176, 184, 177, 186, 185, 178, 174, 170, 172, 171, 173, 180];//.sort(sort);
    return d3.scale.ordinal()
                   .domain(d0)
                   .range([0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60]);
  };

  this.groupByGender = function (value) {
    // default sort girls first
    var d0 = ['F', 'M', 'X'];
    return d3.scale.ordinal()
                   .domain(d0)
                   .range([0, 2, 4]);
  };

  this.groupByAge = function (sort) {
    var d0 = [30, 40, 56, 66].sort(sort);
    return d3.scale.threshold().domain(d0).range([0, 2, 4, 6, 8]);
  };

}).call(App.n0.eu.Group);
