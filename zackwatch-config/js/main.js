(function() {
  loadOptions();
  submitHandler();
})();

function submitHandler() {
  var $submitButton = $('#submitButton_input');

  $submitButton.on('click', function() {
    console.log('Submit_input');

    var return_to = getQueryParam('return_to', 'pebblejs://close#_input');
    document.location = return_to + encodeURIComponent(JSON.stringify(getAndStoreConfigData()));
  });
}

function loadOptions() {
  var $apikey = $('#apikey_input');
  var $ppl = $('#ppl_input');
  var $latitude = $('#latitude_input');
  var $longitude = $('#longitude_input');
  var $defaultlocOnly = $('#defaultlocOnly_input');
  var $metric = $('#metric_input');
  var $vibration = $('#vibration_input');
  var $refresh = $('#refresh_text');
  var $ppl_disable = $('#ppl_disable_input');

  if (localStorage.apikey) {
    $apikey[0].value = localStorage.apikey;
    $ppl[0].value = localStorage.ppl;
    $latitude[0].value = localStorage.latitude;
    $longitude[0].value = localStorage.longitude;
    $metric[0].checked = Boolean(localStorage.metric == "true");
    $defaultlocOnly[0].checked = Boolean(localStorage.defaultlocOnly == "true");
    $refresh[0].value = localStorage.ppl_disable;
    $vibration[0].checked = Boolean(localStorage.vibration == "true");
  }

}

function getAndStoreConfigData() {
  var $apikey = $('#apikey_input');
  var $ppl = $('#ppl_input');
  var $latitude = $('#latitude_input');
  var $longitude = $('#longitude_input');
  var $defaultlocOnly = $('#defaultlocOnly_input');
  var $metric = $('#metric_input');
  var $vibration = $('#vibration_input');
  var $ppl_disable = $('#ppl_disable_input');
  var $refresh = $('#refresh_text');

  var options = {
    apikey: $apikey.val(),
    ppl: $ppl.val(),
    latitude: $latitude.val(),
    longitude: $longitude.val(),
    defaultlocOnly: $defaultlocOnly[0].checked,
    metric: $metric[0].checked,
    ppl_disable: $ppl_disable.val(),
    refresh: $refresh.val(),
    vibration: $vibration[0].checked
  };

  localStorage.apikey = options.apikey;
  localStorage.ppl = options.ppl;
  localStorage.latitude = options.latitude;
  localStorage.longitude = options.longitude;
  localStorage.defaultlocOnly = options.defaultlocOnly;
  localStorage.metric = options.metric;
  localStorage.ppl_disable = options.ppl_disable;
  localStorage.vibration = options.vibration;
  localStorage.refresh = options.refresh;

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
