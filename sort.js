window.App.n0.eu.Sort = window.App.n0.eu.Sort || {};

(function() {
  var self = this;

  this.getSortBy = function (type) {
    var sorting;

    switch (type) {
      case 'age':
        sorting = self.sortByAge();
        break;
      case 'gender':
        sorting = self.sortByGender();
        break;
      case 'partyId':
        sorting = self.sortByParty();
        break;
      case 'party':
        sorting = self.sortByParty();
        break;
      default:
        sorting = self.sortByDefault();
    }

    return sorting;
  };
  /*
  this.groupSortByDefault = function () {
    return firstBy(function (a, b) {
      return a - b;
    });
  };
  */
  this.sortByDefault = function () {
    return firstBy(function (a, b) {
      return a.partyOrder - b.partyOrder;
    })
    .thenBy(function (a, b) {
      return a.age - b.age;
    });
  };

  this.groupSortByParty = function () {
    return firstBy(function (a, b) {
      return a - b;
    });
  };

  this.sortByParty = function () {
    return firstBy(function (a, b) {
      return a.dimm - b.dimm;
    })
    .thenBy(function (a, b) {
      return a.partyOrder - b.partyOrder;
    })
    .thenBy(function (a, b) {
      return a.age - b.age;
    })
    .thenBy(function (a, b) {
      return d3.ascending(a.gender, b.gender);
    });
  };

  this.groupSortByAge = function () {
    return firstBy(function (a, b) {
      // party?
      return a - b;
    });
  };

  this.sortByAge = function () {
    return firstBy(function (a, b) {
      return a.dimm - b.dimm;
    })
    .thenBy(function (a, b) {
      return a.partyOrder - b.partyOrder;
    })
    .thenBy(function (a, b) {
      return a.age - b.age;
    })
    .thenBy(function (a, b) {
      return d3.ascending(a.gender, b.gender);
    });
  };

  this.groupSortByGender = function (order) {
    if (!order)
      return ['F', 'M', 'X'];
    return {
      'F': ['F', 'M', 'X'],
      'M': ['M', 'F', 'F'],
      'X': ['X', 'F', 'M']
    }[order];
    /*
    return firstBy(function (a, b) {
      return d3.ascending(a, b);
    });
    */
  };

  this.sortByGender = function () {
    return firstBy(function (a, b) {
      return a.dimm - b.dimm;
    })
    .thenBy(function (a, b) {
      return d3.ascending(a.gender, b.gender);
    })
    .thenBy(function (a, b) {
      return a.partyOrder - b.partyOrder;
    })
    .thenBy(function (a, b) {
      return a.age - b.age;
    });
  };

}).call(App.n0.eu.Sort);
