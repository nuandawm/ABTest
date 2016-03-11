// Tests - number of books must be equals to sum of books of A and B for each exp
var expResults = [];

var likeExp = function (exp,version) {
  return (Math.random()<=exp[version]);
};

var book = function (expPercs) {
  var pattern = [];
  var booked = true;
  for (var i in expPercs) {
    var version = (Math.random()>=0.5) ? 'A' : 'B';
    expResults[i][version].visits += 1;
    pattern.push(version);
    if (!likeExp(expPercs[i], version))
      booked = false;
  }
  
  if (booked) {
    for (var i in expResults)
      expResults[i][pattern[i]].books += 1;
    return true;
  }
  else
    return false;
};

var simulate = function (params, expPercs) {
  // Clear expResults
  expResults = [];
  for (var i in expPercs) {
    expResults.push({
      A: {visits:0, books:0},
      B: {visits:0, books:0}
    });
  }
  
  for (var i=0; i<params.users; i++) {
    book(expPercs);
  }
  
  return expResults;
};

var doIterations = function(params, expPercs, num){
  var expData = [];
  for (var i=0; i<num; i++) {
    var expResult = simulate(params, expPercs);
    var Aconversion = calculateConversion(expResults[0]['A'].visits,expResults[0]['A'].books);
    var Bconversion = calculateConversion(expResults[0]['B'].visits,expResults[0]['B'].books);
    expData.push({
      Aconversion: Aconversion,
      Bconversion: Bconversion,
      ratio: (Bconversion/Aconversion)
    });
  }
  return expData;
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