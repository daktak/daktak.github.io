(function() {
  loadOptions();
  submitHandler();
})();

function submitHandler() {
  var $submitButton = $('#submitButton');

  $submitButton.on('click', function() {
    console.log('Submit');

    var return_to = getQueryParam('return_to', 'pebblejs://close#');
    document.location = return_to + encodeURIComponent(JSON.stringify(getAndStoreConfigData()));
  });
}

function loadOptions() {
  var $myAPIKey = $('#myAPIKey');
  var $mypplurl = $('#mypplurl');
  var $latitude = $('#latitude');
  var $longitude = $('#longitude');
  var $defaultlocOnly = $('#defaultlocOnly');
  var $metric = $('#metric');
  //var $vibration = $('#vibration');

  if (localStorage.myAPIKey) {
    $myAPIKey[0].value = localStorage.myAPIKey;
    $mypplurl[0].value = localStorage.mypplurl;
    $latitude[0].value = localStorage.latitude;
    $longitude[0].value = localStorage.longitude;
    $defaultlocOnly.checked = localStorage.defaultlocOnly;
    //$metric.checked = localStorage.metric;
    if (localStorage.metric == 'true') {
      console.log("metric true");
      $metric.setAttribute("checked"); 
    } else {
      $metric.removeAttribute("checked");
    }
    console.log(localStorage.metric)
    //$vibration[0].checked = localStorage.vibration === true;
  }

}

function getAndStoreConfigData() {
  var $myAPIKey = $('#myAPIKey');
  var $mypplurl = $('#mypplurl');
  var $latitude = $('#latitude');
  var $longitude = $('#longitude');
  var $defaultlocOnly = $('#defaultlocOnly');
  var $metric = $('#metric');
  //var $vibration = $('#vibration');

  var options = {
    myAPIKey: $myAPIKey.val(),
    mypplurl: $mypplurl.val(),
    latitude: $latitude.val(),
    longitude: $longitude.val(),
    defaultlocOnly: $defaultlocOnly[0].checked,
    metric: $metric[0].checked
    //vibration: $vibration[0].checked
  };

  localStorage.myAPIKey = options.myAPIKey;
  localStorage.mypplurl = options.mypplurl;
  localStorage.latitude = options.latitude;
  localStorage.longitude = options.longitude;
  localStorage.defaultlocOnly = options.defaultlocOnly;
  localStorage.metric = options.metric;
  //localStorage.vibration = options.vibration;

  console.log('Got options: ' + JSON.stringify(options));
  return options;
}

function getQueryParam(variable, defaultValue) {
  var query = location.search.substring(1);
  var vars = query.split('&');
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');
    if (pair[0] === variable) {
      return decodeURIComponent(pair[1]);
    }
  }
  return defaultValue || false;
}
