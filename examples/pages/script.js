/** @init RouteJs */
var app = new RouteJs('app', {
    name: 'RouteJs'
});

new RouteJs('lib', lib);

onhashchange = function () {
    var hash = location.hash.trim();
    if (!hash) {
        hash = '#'
    }

    app.map('contents', app.useTemplate(document.querySelector('[path="' + hash + '"]') || document.querySelector('[_404]')))
    app.map('name', hash.split("#")[hash.length - 1] || "home")
}

onhashchange()