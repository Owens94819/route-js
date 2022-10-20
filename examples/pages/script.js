
/** @init RouteJs */
var app = new RouteJs('app', {
    name: 'RouteJs'
});

new RouteJs('lib',lib);

 onhashchange = function(){
    var hash=location.hash.trim();
    if (!hash) {
        hash='#'
    }
    app.map('contents',app.useTemplate(document.querySelector('[path="'+hash+'"]')||document.querySelector('[_404]')))
    hash=hash.split("#")
    hash=hash[hash.length-1]||"home"
    app.map('name',hash)
}

onhashchange()