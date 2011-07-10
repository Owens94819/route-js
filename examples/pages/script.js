/** @init RouteJs */
var app = new RouteJs('app', {
    name: 'RouteJs'
});

new RouteJs('lib', lib);
var duration = 500

var app_event = {
    onload() {
        /**Animation**/
        var r = this.resolve
        var atr = body.querySelectorAll("article")
        if (1 < atr.length) {
            var _duration = Math.min(Math.max((window.innerWidth / duration) * 500, 500), 700)
            body.style.animationDuration = _duration + 'ms'
            atr[0].setAttribute('animate', 'in')
            atr[1].setAttribute('animate', 'out')
            body.setAttribute('incoming', '')
            setTimeout(function () {
                r()
                body.removeAttribute('incoming')
                atr[0].removeAttribute('animate')
                atr = undefined;
            }, _duration)
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