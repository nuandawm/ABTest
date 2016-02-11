var resultsView = function (expResults) {
  $container = $('#container');
  
  for (var i in expResults) {
    var Aconversion = ''+calculateConversion(expResults[i]['A'].visits,expResults[i]['A'].books).toFixed(2);
    var Bconversion = ''+calculateConversion(expResults[i]['B'].visits,expResults[i]['B'].books).toFixed(2);
    $('<div>').addClass('exp-cell').html(i).appendTo($container);
    $('<div>').addClass('exp-cell').html(
        'A - '
          +' visits: '+expResults[i]['A'].visits
          +' books: '+expResults[i]['A'].books
          +' conversion: '+Aconversion+'<br>'
        +'B - '
          +' visits: '+expResults[i]['B'].visits
          +' books: '+expResults[i]['B'].books
          +' conversion: '+Bconversion).appendTo($container);
    $('<div>').addClass('exp-cell').html(
                          'ratio - real: '+(''+calculateRatio(expPercs[i]['B'],expPercs[i]['A']).toFixed(2))
                          +' expected: '+(''+calculateRatio(Bconversion,Aconversion).toFixed(2)) ).appendTo($container);
    $('<br/>').addClass('cb').appendTo($container);
  }
};