// Tests - number of books must be equals to sum of books of A and B for each exp
/**
 * Simulates several itereations of the same set of experiments and returns the A and B conversion and
 * the ratio between A and B of the first experiment inserted
 * @param params
 * @param expPercs
 * @param num
 * @returns {Array}
 */
var IterationSeries = function (params, expPercs, num) {
  var expData = [];
  this.params = params;
  this.expPercs = expPercs;
  this.maxIteration = num;
  this.getExpData = function(){
    return expData;
  };

  for (var i=0; i<num; i++)
    expData.push(i);
};
IterationSeries.prototype.doIterations = function (sleep) {
  var that = this;
  return this.getExpData().reduce(function(promise, el){
    return promise.then(function(result){
      var data = null;
      var sprint = new Sprint(that.params, that.expPercs);
      var expResults = sprint.simulate();
      var Aconversion = calculateConversion(expResults[0]['A'].visits,expResults[0]['A'].books);
      var Bconversion = calculateConversion(expResults[0]['B'].visits,expResults[0]['B'].books);
      data = {
        Aconversion: Aconversion,
        Bconversion: Bconversion,
        ratio: (Bconversion/Aconversion)
      };
      that.getExpData().push(data);

      return new Promise(function(success){
        sleep(function(){
          success();
        });
      });
    });
  }, Promise.resolve(true));
};
IterationSeries.prototype.doNext = function () {
    var result = null;
    if (this.getExpData().length < this.maxIteration) {
      var sprint = new Sprint(this.params, this.expPercs);
      var expResults = sprint.simulate();
      var Aconversion = calculateConversion(expResults[0]['A'].visits,expResults[0]['A'].books);
      var Bconversion = calculateConversion(expResults[0]['B'].visits,expResults[0]['B'].books);
      result = {
        Aconversion: Aconversion,
        Bconversion: Bconversion,
        ratio: (Bconversion/Aconversion)
      };
      this.getExpData().push(result);
    }
    return result;
};

var statisticAnalysis = function(expData, intervals){
  var sum = 0;
  for (var i in expData) {
    sum += expData[i];
  }

  var sortedData = _.sortBy(expData, 'ratio');
  var max = sortedData[sortedData.length-1].ratio;
  var min = sortedData[0].ratio;
  var intervalWidth = (max - min) / intervals;
  var counter = 0;
  var index = 0;
  var frequencies = [];
  var maxFrequency = 0;
  for (var i in sortedData) {
    if (sortedData[i].ratio >= (min + index*intervalWidth) && sortedData[i].ratio < (min + (index+1)*intervalWidth))
      counter += 1;
    else {
      index += 1;
      frequencies.push({
        x: min + (index+0.5)*intervalWidth,
        y: counter
      });

      if (maxFrequency<counter)
          maxFrequency = counter;
      counter = 0;
    }
  }

  return {
    mean: sum/expData.length,
    max: max,
    min: min,
    frequencies: frequencies,
    maxFrequency: maxFrequency
  };
};

var calculateConversion = function (visits, books) {
  return (books/visits)*100;
};

var calculateRatio = function (Bconv, Aconv) {
  return Bconv/Aconv;
};