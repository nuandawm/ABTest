//$container = $('#container');
  /*var likeIt = true;
  for (var i in expPercs) {
    if (likeExp(expPercs[i],'A')) {
      $('<div>').addClass('exp-cell').html(i).appendTo($container);
      $('<div>').addClass('exp-cell').html('YES').appendTo($container);
      $('<br/>').addClass('cb').appendTo($container);
    }
    else {
      $('<div>').addClass('exp-cell').html(i).appendTo($container);
      $('<div>').addClass('exp-cell').html('NO').appendTo($container);
      $('<br/>').addClass('cb').appendTo($container);
      likeIt = false;
    }
  }
  $('<div>').addClass('exp-cell').html('Like it: ').appendTo($container);
  $('<div>').addClass('exp-cell').html(''+likeIt).appendTo($container);
  $('<br/>').addClass('cb').appendTo($container);*/
  
  /*for (var i=0; i<params.users; i++) {
    var likeIt = book(expPercs);
    $('<div>').addClass('exp-cell').html('Like it: ').appendTo($container);
    $('<div>').addClass('exp-cell').html(''+likeIt).appendTo($container);
    $('<br/>').addClass('cb').appendTo($container);
  }*/
  
  /*for (var i in expResults) {
    var Aconversion = calculateConversion(expResults[i]['A'].visits,expResults[i]['A'].books);
    var Bconversion = calculateConversion(expResults[i]['B'].visits,expResults[i]['B'].books);
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
    $('<div>').addClass('exp-cell').html('ratio - real: '+calculateRatio(expPercs[i]['B'],expPercs[i]['A'])+' expected: '+calculateRatio(Bconversion,Aconversion)).appendTo($container);
    $('<br/>').addClass('cb').appendTo($container);
  }*/