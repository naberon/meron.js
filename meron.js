/**
 * meron.js
 * http://github.com/naberon/meron.js
 *
 * Copyright 2012, naberon
 *
 * Released under the MIT License.
 * http://www.opensource.org/licenses/mit-license.php 
 */
var meron = meron || function() {
  var _isInit
    , _visitorId
    , _isVisitor
    , _visits
    , _recency
    , _pageviews
    , _firstSessionDate
    , _previousSessionDate
    , _currentSessionDate;

  var getdate = function(date) {
    // default format: yyyy/mm/dd hh:mm:ss
    return date.getFullYear()
      +'/'+ ("00"+ (date.getMonth() + 1) ).slice(-2)
      +'/'+ ("00"+ date.getDate()).slice(-2)
      +' '+ ("00"+ date.getHours()).slice(-2)
      +':'+ ("00"+ date.getMinutes()).slice(-2)
      +':'+ ("00"+ date.getSeconds()).slice(-2);
  };
  var init = function () {
    if(_isInit) return true;

    var _get_utma = function(value) { 
      _visitorId = value[1];
      _firstSessionDate = new Date(Number(value[2]) * 1E3);
      _previousSessionDate = new Date(Number(value[3]) * 1E3);
      _currentSessionDate = new Date(Number(value[4]) * 1E3);
      _visits = Number(value[5]);
      _recency = Math.round(
          (_currentSessionDate.getTime() - _previousSessionDate.getTime()) / 86400000 // 1000 * 60 * 60 * 24
      );
      if(_recency <= 0) _recency = 0;
      _isVisitor = (_firstSessionDate.getTime() !== _currentSessionDate.getTime()) ? true : false;
      return true;
    };
    var _get_utmb = function(value) { 
      var pageviews = Number(value[1]);
      _pageviews = (null != pageviews) ? pageviews : 1;
      return true;
    };

    var c = window.document.cookie.split(';');
    var values = '';
    for(var i=0,l=c.length;i<l;i++){
      values = c[i].split('=');

      switch(values[0].replace(/(^\s+|\s+$)/g, '')) {
        case '__utma': _get_utma(values[1].split(".")); break;
        case '__utmb': _get_utmb(values[1].split(".")); break;
      }
    }
    return true;
  };

  return {
    reload:              function() { _isInit = false; return true; },
    isVisitor:           function() { _isInit = _isInit || init(); return _isVisitor; },
    visits:              function() { _isInit = _isInit || init(); return _visits; },
    recency:             function() { _isInit = _isInit || init(); return _recency; },
    pageviews:           function() { _isInit = _isInit || init(); return _pageviews; },
    visitorId:           function() { _isInit = _isInit || init(); return _visitorId; },
    firstSessionDate:    function() { _isInit = _isInit || init(); return getdate(_firstSessionDate); },
    previousSessionDate: function() { _isInit = _isInit || init(); return getdate(_previousSessionDate); },
    currentSessionDate:  function() { _isInit = _isInit || init(); return getdate(_currentSessionDate); },
    setDateformat:       function(func) { getdate = func; },
    getDate:             function(date) { 
      if(null==date) date = new Date();
      return getdate(date); 
    }
  };
}();

