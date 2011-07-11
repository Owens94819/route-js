/** @init RouteJs */
var title=location.pathname.split('/')
title=title[title.length-1]||"home.html"
var app = new RouteJs('app', {
    name: title
});
var pages={}
var duration = 800

var app_event = function (resolve, NEWSibling, OLDSibling) {
    /**Animation**/
    var atr = body.querySelectorAll("article")
    if (atr.length > 1) {
        var _duration = Math.min(Math.max((window.innerWidth / duration) * duration, duration), duration + 200)
        body.style.animationDuration = _duration + 'ms'

        atr[0].setAttribute('animate', 'in')
        atr[1].setAttribute('animate', 'out')
        body.setAttribute('incoming', '')

        setTimeout(function () {
            resolve();
            body.removeAttribute('incoming')
            atr[0].removeAttribute('animate')
            atr = undefined;
        }, _duration+15)
    }
}


onpopstate=function(){
    title=location.pathname.split('/')
    title=title[title.length-1]||"home.html"
    if (pages[location.href]) {
        loadContent(pages[location.href])
    } else {
        RouteJs.fetch(location.href).onload=function(){
            var elm=this.response.querySelector('article')
            if (elm) {
                loadContent(pages[location.href]={title:title,content:elm})
            } else {
            history._pushState(location.origin+"/examples/pages/404.html")
            }
        }
    }
}

function loadContent(elm){
                app.map("content",elm.content)
            app.map("name",elm.title)
}

history._replaceState=function(url){
    this.replaceState(null,null,url)
    onpopstate()
}

history._pushState=function(url){
    this.pushState(null,null,url)
    onpopstate()
}
// d = RouteJs.fetch('../../imgs/about.svg', true);

// d.then(function (e) {
//     console.log(e);
// });