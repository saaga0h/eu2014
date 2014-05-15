'use strict';
/*
 * TODO
 * parties data needs gender data
 * parties data needs age grou data
 * candidate filter might need an exception?
 */
/*
 * Filtering logic?
 *
 * { type: 'gender', values: ['F', 'M'] }
 * Should age always be range
 * { type: 'age', values: [0, 30] }
 * { type: 'party', values: [179, 183, 186] }
 * { type: 'candidate', values: [239, 80, 94] }
 * { type: 'opinion', values: [0, 2, 4] }
 * { type: 'question', values: ['q5779', 'q5780'] }
 */

var filters = [];

var updateFilter = function (type, values) {
  var filter = filters.filter(function (v) {
    return v.type === type && v.values.toString() === values.toString();
  })[0];

  if (!filter) {
    filters.push({ type: type, values: values });
  } else {
    filters.splice(filters.indexOf(filter), 1);
  }

  // update visualisations
  self.g.filter(filters);
  self.v.filter(filters);
  self.p.filter(filters);
  self.a.filter(filters);
  self.b.filter(filters);
  self.h.filter(filters);
};



parties.sort(function (a, b) {
  return a.order - b.order;
});

var p = legend().id('party');
var a = legend().id('answer');

d3.select('#parties').datum(parties).call(p);
d3.select('#answers').datum(answers).call(a);

// Age distribution
var b = bars().id('party').parties(parties);

// Genders
var g = vbars().id('gender');
var v = vbars().id('id');

// Heatmap
var h = heatmap().questions(questions).parties(parties);

// filter
var self = this;

var f = function (a, b) {
  self.b.filterByAge(a, b);
  self.h.filterByAge(a, b);
}

var findPartyById = function (partyId) {
  return parties.filter(function (v) {
    return v.partyId === partyId;
  })[0];
};

var findCandiadteWordsById = function (data, id) {
  var candidate = data.filter(function (v) {
    return v.id === id;
  })[0];

  // $.map(findCandiadteWordsById(_, 186), function (e,i) { x[e] = (x[e] || 0) + 1 })
  return candidate.comments.join(' ').replace(/[^\w\säöå]/gi, '').split(' ');
};

var _;

// Load and parse data for heatmap
d3.tsv('candidates.tsv', function (res) {
  /**
   * returns
   *
   * { answers: Array[0,1,3,4,3,2..]
   *   party: 185
   *   person: "Kai  Aalto",
   *   id: 31 }
   */
  var _ = {
    id: parseInt(res['Id']),
    partyId: parseInt(res['Puolue']),
    age: parseInt(res['Ikä']),
    person: res['Etunimi'] + ' ' + res['Sukunimi'],
    candidateId: parseInt(res['Ehdokasnumero']),
    gender: res['Sukupuoli'],
    answers: [],
    comments: []
  };

  for (var i = 0; i < questions.length; i++) {
    var key = Object.keys(questions[i])[0];
    _.answers.push(res[key]);
    _.comments.push(res[key.replace('q', 'c')]);
  }
  return _;

}, function (data) {
  data.sort(
    firstBy(function (a, b) {
      //return a.party - b.party;
      return self.findPartyById(a.partyId).order - self.findPartyById(b.partyId).order;
    })
    .thenBy(function (a, b) {
      return a.age - b.age;
    })
  );

  d3.select('svg#candidates').datum(data).call(h);
  d3.select('svg#age').datum(data).call(b);

  // Genders
  var genders = [
    { id: 0,
      count: 0,
      gender: 'F',
      name: 'Naiset' },
    { id: 1,
      count: 0,
      gender: 'M',
      name: 'Miehet' },
    { id: 2,
      count: 0,
      gender: '',
      name: 'Ei tiedossa'}
  ];

  genders[0]['count'] = data.filter(function (v) {
    return v.gender === 'F';
  }).length;

  genders[1]['count'] = data.filter(function (v) {
    return v.gender === 'M';
  }).length;

  genders[2]['count'] = data.filter(function (v) {
    return v.gender === '';
  }).length;

  d3.select('#genders').datum(genders).call(g);

  // Age
  var age = [
    { id: '0-30',
      count: 0,
      age: 15,
      name: 'alle 30'
    },
    { id: '30-39',
      count: 0,
      age: 35,
      name: '30 - 39'
    },
    {
      id: '40-55',
      count: 0,
      age: 45,
      name: '40 - 55'
    },
    {
      id: '56-65',
      count: 0,
      age: 60,
      name: '56 - 65'
    },
    {
      id: '66-150',
      count: 0,
      age: 80,
      name: 'yli 65'
    }
  ]

  age[0].count = data.filter(function (v) {
    return v.age < 30;
  }).length;

  age[1].count = data.filter(function (v) {
    return v.age >= 30 && v.age <= 39;
  }).length;

  age[2].count = data.filter(function (v) {
    return v.age >= 40 && v.age <= 55;
  }).length;

  age[3].count = data.filter(function (v) {
    return v.age >= 56 && v.age <= 65;
  }).length;

  age[4].count = data.filter(function (v) {
    return v.age > 65;
  }).length;

  d3.select('#agedistribution').datum(age).call(v);

  // for debug
  self._ = data;
});

$('body').on('click', 'svg#candidates rect, svg#age rect', function (e) {
  var id = parseInt($(e.currentTarget).attr('data'));
  self.updateFilter('candidateId', [id]);
});

$('body').on('click', '#parties .legend', function (e) {
  var id = parseInt($(e.currentTarget).attr('data'));
  $(e.currentTarget).toggleClass('selected');
  self.updateFilter('partyId', [id]);
});

$('body').on('click', '#answers .legend', function (e) {
  var id = parseInt($(e.currentTarget).attr('data'));
  $(e.currentTarget).toggleClass('selected');
  self.updateFilter('answerId', [id]);
});

$('body').on('click', '#genders .bar', function (e) {
  var id = $(e.currentTarget).attr('data');
  self.updateFilter('gender', [id]);

});

$('body').on('click', '#agedistribution .bar', function (e) {
  var v = $(e.target).attr('data').split('-').map(function (v) { return parseInt(v); });
  self.updateFilter('age', [v[0], v[1]]);
});

