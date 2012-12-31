# meron.js
meron.js is get data for Google Analytics tracking uses cookies.

## Example
```html
<script src="./meron.js"></script>

<script type="text/javascript">
  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-xxxxxx-yy']);
  _gaq.push(['_trackPageview']);
  (function() {
   var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
   ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
   var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
   })();

  window.onload = function(){
    // get data
    console.log('userID: ' + meron.visitorId() );    // => userID: 1717516088
    console.log(meron.isVisitor()                    // => Returning visit user
        ? 'Returning visit user': 'New visit user');
    console.log(meron.visits() + ' Visits');         // => 12 Visits
    console.log(meron.pageviews() + ' PV');          // => 5 PV
    console.log(meron.recency()                      // => 1 Days Since Last Visit
        + ' Days Since Last Visit');
    console.log(meron.firstSessionDate());           // => 2012/12/25 10:11:39
    console.log(meron.previousSessionDate());        // => 2012/12/28 09:13:14
    console.log(meron.currentSessionDate());         // => 2012/12/29 15:21:08
    console.log(meron.getDate());                    // => 2012/12/29 16:05:09

    // Customize Date format
    meron.setDateformat( function(date) { return date.toString(); } );
    console.log(meron.getDate());                    // => Sat Dec 29 2012 16:05:09 GMT+0900

    meron.setDateformat( function(date) { return date.toGMTString(); } );
    console.log(meron.getDate());                    // => Sat, 29 Dec 2012 05:05:09 GMT 

    meron.setDateformat( function(date) { return date; } );
    console.log(meron.getDate());                    // => Date Object {Sat Dec 29 2012 16:05:09 GMT+0900}
  }
</script>
```

## Copyright and license 
Copyright &copy; 2012, naberon  
Released under the [MIT License](http://www.opensource.org/licenses/mit-license.php).
