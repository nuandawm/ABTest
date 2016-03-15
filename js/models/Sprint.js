/**
 * Created by rossig on 15/03/2016.
 */
var Sprint = function(params, expPercs){
  this.expResults = [];
  this.params = params;
  this.expPercs = expPercs;
};
Sprint.prototype.likeExp = function (exp,version) {
  return (Math.random()<=exp[version]);
};
/**
 * Simulates a book based on the percentages of each experiment
 * @param expPercs Experiment percentages
 * @returns {boolean} true == user booked; false == user didn't book.
 */
Sprint.prototype.book = function (expPercs) {
  var pattern = [];
  var booked = true;
  for (var i in expPercs) {
    var version = (Math.random()>=0.5) ? 'A' : 'B';
    this.expResults[i][version].visits += 1;
    pattern.push(version);
    if (!this.likeExp(expPercs[i], version))
      booked = false;
  }

  if (booked) {
    for (var i in this.expResults)
      this.expResults[i][pattern[i]].books += 1;
    return true;
  }
  else
    return false;
};
/**
 * Simulates the effect of the experiments on some users visiting the website and calculate the result visits and
 * books for each experiment
 * @returns {Array} An array of object like this: ( visits: 100, books: 3 )
 */
Sprint.prototype.simulate = function () {
  // Clear expResults
  this.expResults = [];
  for (var i in this.expPercs) {
    this.expResults.push({
      A: {visits:0, books:0},
      B: {visits:0, books:0}
    });
  }

  for (var i=0; i<this.params.users; i++) {
    this.book(this.expPercs);
  }

  return this.expResults;
};