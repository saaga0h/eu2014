window.App = window.App || {}
window.App.n0 = window.App.n0 || {}
window.App.n0.eu = window.App.n0.eu || {}
window.App.n0.eu.Data = window.App.n0.eu.Data || {};

(function($) {

  this.questions = [];
  this.answers = [];
  this.parties = [];

}).call(App.n0.eu.Data, jQuery);

var questions = [
  {'q5770': 'Mitä mieltä olet väitteestä: Tykkään EU:sta.'},
  {'q5771': 'Mitä mieltä olet väitteestä: EU-maista tulevat työntekijät vievät suomalaisten työpaikat.'},
  {'q5772': 'Mitä mieltä olet väitteestä: Elinkeinoelämän ääni kuuluu EU:ssa liian voimakkaana.'},
  {'q5773': 'Mitä mieltä olet väitteestä: Heikko EU on uhka Euroopan turvallisuudelle.'},
  {'q5774': 'Mitä mieltä olet väitteestä: Nato-jäsenyys vahvistaisi Suomen turvallisuutta.'},
  {'q5775': 'Mitä mieltä olet väitteestä: Ukrainalle on avattava tie EU-jäsenyyteen.'},
  {'q5776': 'Mitä mieltä olet väitteestä: EU:n pitää tukea kansalaisjärjestöjen toimintaa Venäjällä demokratian edistämiseksi.'},
  {'q5777': 'Mitä mieltä olet väitteestä: Laitonta maahanmuuttoa EU-alueelle torjutaan parhaiten avaamalla lisää mahdollisuuksia lailliselle maahanmuutolle.'},
  {'q5778': 'Mitä mieltä olet väitteestä: Euroopan unionilla on siirtomaahistorian vuoksi erityinen vastuu Afrikan kehittämisessä.'},
  {'q5779': 'Mitä mieltä olet väitteestä: Turkin paikka on EU:ssa.'},
  {'q5780': 'Mitä mieltä olet väitteestä: EU-jäsenyys maksaa liikaa.'},
  {'q5781': 'Mitä mieltä olet väitteestä: Eurosta on ollut suomalaisille enemmän hyötyä kuin haittaa.'},
  {'q5782': 'Mitä mieltä olet väitteestä: Yhteinen valuutta vaatii euroalueen yhteistä talouspolitiikkaa.'},
  {'q5783': 'Mitä mieltä olet väitteestä: Verokilpailun rajoittamiseksi EU:ssa on päätettävä yritysveron vähimmäistasosta.'},
  {'q5784': 'Mitä mieltä olet väitteestä: EU:n on katkaistava kaikki rahaliikenne veroparatiiseihin.'},
  {'q5785': 'Mitä mieltä olet väitteestä: Pankkeja ei saa enää koskaan tukea veronmaksajien rahoilla.'},
  {'q5786': 'Mitä mieltä olet väitteestä: Suomalaisilta pankeilta kerättyjä varoja voidaan käyttää eurooppalaisten pankkien tukemiseen.'},
  {'q5787': 'Mitä mieltä olet väitteestä: Tavaroiden, palvelujen, pääomien ja työvoiman vapaa liikkuminen EU:n alueella on lisännyt suomalaisten hyvinvointia.'},
  {'q5788': 'Mitä mieltä olet väitteestä: Kansainvälisten yritysten ja sijoittajien kiinnostusta Eurooppaan on voimakkaasti lisättävä karsimalla yritystoimintaan kohdistuvia rajoituksia ja kustannuksia.'},
  {'q5789': 'Mitä mieltä olet väitteestä: EU:n on sidottava kauppasuhteet tiukemmin ihmisoikeuksiin ja työntekijöiden oikeuksien kunnioittamiseen.'},
  {'q5790': 'Mitä mieltä olet väitteestä: Susien suojelu Suomessa ei kuulu EU:lle.'},
  {'q5791': 'Mitä mieltä olet väitteestä: Marihuanaa tulisi käsitellä lainsäädännössä samalla tavalla kuin tupakkaa tai alkoholia.'},
  {'q5792': 'Mitä mieltä olet väitteestä: EU-alueelle on säädettävä minimipalkka.'},
  {'q5793': 'Mitä mieltä olet väitteestä: EU:sta on kehitettävä liittovaltio, jossa Brysselissä yhteisesti päätettävät asiat on tarkasti rajattu ja muista asioista päätetään jäsenmaissa.'},
  {'q5794': 'Mitä mieltä olet väitteestä: EU:ssa hyväksyttyjä säädöksiä (direktiivejä) pitäisi soveltaa suomalaiseen lainsäädäntöön selvästi nykyistä väljemmin.'},
  {'q5795': 'Mitä mieltä olet väitteestä: EU-budjetin monimutkaisesta rahoituksesta pitäisi siirtyä yleiseen EU-veroon.'},
  {'q5796': 'Mitä mieltä olet väitteestä: EU:n kykyä itsenäiseen, sotilaalliseen toimintaan on vahvistettava.'},
  {'q5797': 'Mitä mieltä olet väitteestä: EU-jäsenyys on muuttanut suomalaista maataloutta hyvään suuntaan.'},
  {'q5798': 'Mitä mieltä olet väitteestä: Energia- ja ilmastopolitiikassa etusijalle on asetettava teollisuuden kilpailukyky.'},
  {'q5799': 'Mitä mieltä olet väitteestä: Euroopan siirtymistä uusiutuvan energian käyttämiseen on nopeutettava, vaikka se nostaisi sähkön ja polttoaineiden hintoja.'}];

var answers = [
  { answerId: 0,
    name:'Täysin samaa mieltä' },
  { answerId: 1,
    name: 'Samaa mieltä' },
  { answerId: 2,
    name: 'Ohita'},
  { answerId: 3,
    name: 'Eri mieltä' },
  { answerId: 4,
    name: 'Täysin eri mieltä' }
];

var parties = [
  { partyId: 170,
    name: 'Itsenäisyyspuolue',
    order: 11 },
  { partyId:171,
    name: 'Suomen Kristillisdemokraatit',
    order: 13 },
  { partyId: 172,
    name: 'Suomen Keskusta',
    order: 12 },
  { partyId: 173,
    name: 'Kansallinen Kokoomus',
    order: 14 },
  { partyId: 174,
    name: 'Köyhien Asialla',
    order: 10 },
  { partyId: 176,
    name: 'Muutos 2011',
    order: 4 },
  { partyId: 177,
    name: 'Perussuomalaiset',
    order: 6 },
  { partyId: 178,
     name: 'Piraattipuolue',
     order: 9 },
  { partyId: 179,
    name: 'Suomen Sosialidemokraattinen Puolue',
    order: 3 },
  { partyId: 180,
    name: 'Ruotsalainen kansanpuolue',
    order: 15 },
  { partyId: 181,
    name: 'Suomen Kommunistinen Puolue',
    order: 0 },
  { partyId: 183,
    name: 'Vasemmistoliitto',
    order: 1 },
  { partyId: 184,
    name: 'Vihreä liitto',
    order: 5 },
  { partyId: 185,
    name: 'Sinivalkoinen Rintama',
    order: 8 },
  { partyId: 186,
    name: 'Kristiina Ilmarinen valitsijayhdistys',
    order: 7 }
];
