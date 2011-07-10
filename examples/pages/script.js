/** @init RouteJs */
var app = new RouteJs('app', {
    name: 'RouteJs'
});

new RouteJs('lib', lib);

var app_event = {
    onloadend () {
        /**Animation**/
       var r = this.resolve
       var atr = bd.querySelectorAll("article")
       if (1 < atr.length) {
           atr[0].setAttribute('animate', 'in')
           atr[1].setAttribute('animate', 'out')
           bd.setAttribute('incoming', '')
           setTimeout(function () {
               r()
               bd.removeAttribute('incoming')
               atr[0].removeAttribute('animate')
               atr=undefined;
           }, 500)
       }
   }
}

onhashchange = function () {
    var hash = location.hash.trim();
    if (!hash) {
        hash = '#'
    }
    app.map('contents', app.useTemplate(document.querySelector('[path="' + hash + '"]') || document.querySelector('[_404]')))
    app.map('name', hash.split("#")[hash.length - 1] || "home")
}

onhashchange()