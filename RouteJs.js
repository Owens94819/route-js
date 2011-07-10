/**
 * @problem fixed
 * @todo fixe map stack overflow
 * @properties <\> @observer @entries @observer_callback
 */

/**
 * @problem fixed
 * @todo use elements for mapping
 * @properties <\> @observer @entries @observer_callback
 */

/**
 * @problem fixed
 * @todo use bottom to top loop for handler remover
 * @properties <\> @re_entries @observer_callback
 */

/**
 * @problem pending
 * @todo handle HTMLCollection and Array just like NodeList
 * @properties <\> @entries
 */

/**
 * @problem pending
 * @todo prevent node re-occurrence (same repaint)
 * @properties <\> @observer_callback @on
 */

/**
 * @feature Animations
 * @todo add a transitional animation at before entries and before re_entries
 */


(function () {
    /**
     * @Legacy
     */
    if (!window.Promise) {
        window.Promise = new Function()
        Node.prototype.remove = function () {
            if (this.parentNode) {
                this.parentNode.removeChild(this)
            }
        }
        String.prototype.includes = function () {
            return this.match(arguments[0]) ? true : false;
        }

        var DOMOBserver = window.document.createEvent("Event");
        DOMOBserver.initEvent("DOMNodeInserted", true, true)
        document.documentElement.dispatchEvent(DOMOBserver)
        setInterval(function () {
            document.documentElement.dispatchEvent(DOMOBserver)
        }, 500)
    }


    var properties = {
            use_attributes: true,
            max_map_stack: 7,
            max_map_rendering: 7,
            nameSpace: {
                attribute: 'route',
                offline: 'still_offline',
                element_flag: 'element'
            },
            APPPromise: function () {
                this.data = arguments[0]
                this.placeholder = arguments[1]
            },
            APPConstant: function () {
                this.data = arguments[0]
                if (arguments[1] instanceof Number) {
                    this.pending = arguments[1]
                } else {
                    this.pending = 1
                }
            },
            APPStaticTemplate: function () {
                this.content = arguments[0]
            },
            APPExtendedObject: function () {
                if (this instanceof properties.APPExtendedObject) {
                    if (arguments[0] instanceof Object) {
                        this.content = arguments[0]
                    }
                } else {
                    return new properties.APPExtendedObject(arguments[0])
                }
            },
            APPTemplate: function () {
                properties.console.warn('you\'re using an experimenter feature.\n useTemplate(,<Boolean>)');
                if (arguments.length >= 2) {
                    this.clone = arguments[1]
                } else {
                    this.clone = false
                }

                arguments[0] = arguments[0].cloneNode(true);
                // for (var i = 0; i < arguments[0].childNodes.length; i++) {
                // properties.observer_interactor(arguments[0].childNodes[i])
                // }
                // arguments[0].childNodes.forEach(function() {
                //     // console.log(arguments[0]);
                // properties.observer_interactor(arguments[0])
                // });
                var d = document.createElement('route:template')
                d.appendChild(arguments[0])
                properties.observer_interactor(d)
                this.content = d
                d = arguments[0] = undefined
            },
            $: function () {
                // arguments = arguments[0]
                if ((arguments[0] instanceof Object) === false && "string" !== typeof arguments[0]) {
                    return
                }
                for (var i = 1; i < arguments.length; i++) {
                    if ("number" === typeof arguments[i]) {
                        arguments[i] = String(arguments[i])
                    }
                    if ("string" === typeof arguments[i]) {
                        if (arguments[i] === "") {
                            continue;
                        }
                        if ("string" === typeof arguments[i + 1]) {
                            if (arguments[i + 1].trim() === "=") {
                                return arguments[0][arguments[i]] = arguments[i + 2]
                            } else if (arguments[i + 1].trim() === "+=") {
                                return arguments[0][arguments[i]] += arguments[i + 2]
                            } else {
                                arguments[0] = arguments[0][arguments[i]]
                            }
                        } else if (arguments[i + 1] instanceof Array) {
                            if ("function" === typeof arguments[0][arguments[i]]) {
                                var s = "";
                                for (var _i = 0; _i < arguments[i + 1].length; _i++) {
                                    s += 'arguments[i+1][' + _i + ']'
                                    if (arguments[i + 1].length > _i + 1) {
                                        s += ','
                                    }
                                }
                                arguments[0] = eval('arguments[0][arguments[i]](' + s + ')')
                            } else {
                                return
                            }
                            i = i + 1
                        } else {
                            arguments[0] = arguments[0][arguments[i]]
                        }
                    } else if (arguments[i] instanceof Array) {
                        if ("function" === typeof arguments[0]) {
                            var s = "";
                            for (var _i = 0; _i < arguments[i].length; _i++) {
                                s += 'arguments[i][' + _i + ']'
                                if (arguments[i].length > _i + 1) {
                                    s += ','
                                }
                            }
                            var _p = arguments[0]
                            arguments[0] = eval('_p(' + s + ')')
                            _p = null
                        } else {
                            return
                        }
                    }
                    if (arguments[0] === null || arguments[0] === undefined) {
                        break;
                    }
                }
                return arguments[0]
            },
            Event: function (type, data) {
                if (type instanceof Array === false) {
                    type = [String(type)]
                }

                var store = {}
                for (var i = 1; i < type.length; i++) {
                    store = store[type[i]] || {}
                }

                if (!(data instanceof Object)) {
                    data = null
                }

                store.data = store.data || data || {};
                store.events = store.events || {};
                if (!store.eventhandler) {
                    store.eventhandler = {}
                }
                i = i - 1
                return store.eventhandler[type[i]] = store.eventhandler[type[i]] || {
                    name: [String(type), type],
                    emit: function (name, data) {
                        if (arguments.length > 1) {
                            store.data[name] = data
                        }
                        if (store.events.hasOwnProperty(name)) {
                            for (var i = 0; i < store.events[name].length; i++) {
                                store.events[name][i](store.data[name])
                            }
                        }
                        data = undefined
                    },
                    on: function (name, foo) {
                        if (store.events[name] instanceof Array) {
                            store.events[name].push(foo)
                        } else {
                            store.events[name] = [foo]
                        }
                        if (store.data.hasOwnProperty(name)) {
                            foo(store.data[name])
                        }
                        foo = undefined
                    },
                    get: function (name) {
                        if (store.data.hasOwnProperty(name)) {
                            return store.data[name]
                        }
                        return null
                    },
                    has: function (name) {
                        return store.data.hasOwnProperty(name)
                    },
                    appendChildEvent: function (_type, data) {
                        return this.childEvents[this.childEvents.push(makeEvent(type.push(_type) ? type : type, data)) - 1]
                    },
                    childEvents: [],
                    NEST_SIZE: i
                };
            },
            _observer: (window.MutationObserver ? function (foo, elm) {
                new window.MutationObserver(function (e) {
                    for (var i = 0; i < e.length; i++) {
                        for (var _i = 0; _i < e[i].addedNodes.length; _i++) {
                            foo(e[i].addedNodes[_i]);
                        }
                    }
                    e = undefined
                }).observe(elm || document, {
                    childList: true,
                    characterData: true,
                    subtree: true,
                })
                elm = undefined
            } : function (foo, elm) {
                elm.addEventListener('DOMNodeInserted', function (e) {
                    foo(e.target);
                    e = undefined
                })
                elm = undefined
            }),
            observer: function () {
                properties._observer(properties.observer_interactor, document)
            },
            observer_treeWalker: function (e) {
                if (e.childNodes.length < 1) {
                    return
                }
                var val = document.createTreeWalker(e, NodeFilter.SHOW_COMMENT, function () {
                        d.push(arguments[0])
                    }, false),
                    d = [];
                val.nextNode()
                // while (true) {
                //     d = val.nextNode()
                //     if (!d) {
                //         break;
                //     }
                //     d.push
                //     if (d.data[0] + d.data[d.data.length - 1] === '??' && d.parentNode) {
                //         properties.observer_callback(d)
                //     }
                // }
                for (var i = 0; i < d.length; i++) {
                    properties.observer_interactor(d[i])
                }
                // var val = document.createTreeWalker(e, NodeFilter.SHOW_COMMENT, function(){

                // }, false),
                //     d;
                //     console.log(val);
                // while (true) {
                //     d = val.nextNode()
                //     if (!d) {
                //         break;
                //     }
                //     if (d.data[0] + d.data[d.data.length - 1] === '??' && d.parentNode) {
                //         properties.observer_callback(d)
                //     }
                // }
                e = val = d = undefined;
            },
            observer_interactor: function (e) {
                if (e instanceof Comment && e.parentNode && e.data[0] + e.data[e.data.length - 1] === '??') {
                    properties.observer_callback(e)
                } else if (e instanceof Element) {
                    if (properties.use_attributes) {
                        if (e.hasAttribute(properties.nameSpace.attribute)) {
                            properties.observer_callback(e, properties.nameSpace.element_flag)
                        } else {
                            var _e = e.querySelectorAll('[' + properties.nameSpace.attribute + ']')
                            for (var i = 0; i < _e.length; i++) {
                                properties.observer_callback(_e[i], properties.nameSpace.element_flag)
                            }
                            _e = undefined;
                            properties.observer_treeWalker(e);
                        }
                    } else {
                        properties.observer_treeWalker(e);
                    }
                }
                e = undefined
            },
            re_entries: function (node) {
                if (!node) {
                    return
                }
                for (var i = node.__children__.length - 1; i >= 0; i--) {
                    if (node.__children__[i].__children__) {
                        properties.re_entries(node.__children__[i])
                    } else {
                        if (node.__children__[i]._points_to) {
                            properties.re_entries(node.__children__[i]._points_to)
                        } else {
                            node.__children__[i].remove()
                        }
                    }
                }
                node = undefined
            },
            type_entries: function (node, data, i) {
                if (data instanceof NodeList || data instanceof Array) {

                    for (var i = 0; i < data.length; i++) {
                        properties.type_entries(node, data[i], i)
                    }
                    return
                }

                if (!(data instanceof Node)) {
                    data = document.createTextNode(data)
                }


                if (node.hasAttribute(properties.nameSpace.attribute + '-target')) {
                    node.__target = node.getAttribute(properties.nameSpace.attribute + '-target')
                    node.__target = node.__target.split(',')
                }

                if (node.__target) {
                    if (i) {
                        for (var i = 0; i < node.__target.length; i++) {
                            node[node.__target[i].trim()] += data.textContent
                        }
                    } else {
                        for (var i = 0; i < node.__target.length; i++) {
                            node[node.__target[i].trim()] = data.textContent
                        }
                    }
                } else {
                    if (!i) {
                        node.innerHTML = ''
                        node.value = ''
                    }
                    if (node instanceof HTMLTitleElement) {
                        node.innerText += data.textContent
                    } else if (node instanceof HTMLInputElement) {
                        node.value += data.textContent
                    } else if (node.hasOwnProperty('src')) {
                        node.src = data.textContent
                    } else if (node instanceof HTMLLinkElement) {
                        node.href = data.textContent
                    } else {
                        node.appendChild(data)
                    }
                }
                node = data = undefined
            },
            entries: function (node, data, ch, cloned, x_data) {
                if (data instanceof Object && data['[[man-formed]]']) {
                    properties.console.warn('unstable handler for type Promise', data)
                    data = '';
                } else if (data instanceof this.APPTemplate) {
                    properties.entries(node, data.content, ch, !data.clone, x_data)
                    x_data = node = data = undefined
                    return
                } else if (data instanceof DocumentFragment) {
                    if (cloned) {
                        properties.entries(node, data.childNodes, ch, true)
                    } else {
                        properties.entries(node, data.cloneNode(true).childNodes, ch, true)
                    }
                    x_data = node = data = undefined
                    return
                } else if (data instanceof NodeList && node instanceof CharacterData) {
                    if (cloned) {
                        for (var i = 0; data.length > 0; i++) {
                            if (data[0] instanceof Element) {
                                properties.observer_treeWalker(data[0]);
                            }
                            properties.entries(node, data[0], i, cloned, x_data)
                        }
                    } else {
                        for (var i = 0; i < data.length; i++) {
                            if (data[i] instanceof Element) {
                                properties.observer_treeWalker(data[i]);
                            }
                            properties.entries(node, data[i], i, cloned, x_data)
                        }
                    }
                    x_data = node = data = undefined
                    return
                } else if (data instanceof Node && !cloned) {
                    data = data.cloneNode(true)
                } else if (typeof data === 'function') {
                    data = data();
                } else if (data instanceof Promise) {
                    var ev = properties.store[node.__data__[0]]
                    if (ev) {
                        node.pending = 1
                        data.then(function () {
                            node.pending = 0
                            ev.emit(node.__data__[1], arguments[0])
                            ev = node = x_data = data = undefined
                        });
                    }
                    return
                } else if (data instanceof properties.APPPromise) {
                    var ev = properties.store[node.__data__[0]]
                    if (ev) {
                        ev.emit(node.__data__[1], ch = new properties.APPConstant(data.placeholder))
                        data.data.then(function () {
                            ch.data = arguments[0]
                            ch.pending = 0
                            ev.emit(node.__data__[1], ch)
                            ch = ev = node = x_data = data = undefined
                        });
                    }
                    return
                }

                if (!data && typeof data !== 'string') {
                    properties.console.warn('unknow value of "' + data + '"', data)
                    data = document.createTextNode('');
                }

                if (data instanceof Comment) {
                    data.parent_data = node.__data__.join(':')
                }

                if (node instanceof Element) {
                    properties.type_entries(node, data, ch)
                    return
                }

                if (!(data instanceof Node)) {
                    data = document.createTextNode(data)
                }

                if (!ch && !x_data && node.__children__) {

                    if (node.__events instanceof Object) {
                        var ev;

                        var n = {
                            __children__: node.__children__
                        }
                        node.__children__ = []

                        // switch (true) {
                        //     case (typeof node.__events.onloadstart === "function"):
                        //         node.__events.onloadstart.prototype.resolve = function () {
                        //             properties.re_entries(n)
                        //             n = undefined
                        //         }
                        //         new node.__events.onloadstart()
                        //     case (typeof node.__events.onloadend === "function"):
                        //         node.__events.onloadend.prototype.resolve = function () {
                        //             properties.re_entries(n)
                        //             n = undefined
                        //         }
                        //     default:
                        //         properties.re_entries(n)
                        //         n = undefined
                        //         break;
                        // }

                        if (typeof node.__events.onloadend === "function") {
                            node.__events.onloadend.prototype.resolve = function () {
                                properties.re_entries(n)
                                n = undefined
                            }
                            ev = 1
                        }

                        if (typeof node.__events.onload === "function") {
                            node.__events.onload.prototype.resolve = function () {
                                properties.re_entries(n)
                                n = undefined
                            }
                            ev = 1
                        }

                        if (typeof node.__events.onloadstart === "function") {
                            node.__events.onloadstart.prototype.resolve = function () {
                                properties.re_entries(n)
                                n = undefined
                            }
                            new node.__events.onloadstart()
                            ev = 1
                        }

                        if (!ev) {
                            properties.re_entries(n)
                        }

                    } else {
                        properties.re_entries(node)
                        node.__children__ = []
                    }
                }

                if (x_data) {
                    node.target_child = x_data;
                    x_data.parentElement.insertBefore(data, x_data)
                    x_data = undefined;
                } else {
                    if (node.target_child.nextSibling) {
                        node.parentElement.insertBefore(data, node.target_child.nextSibling)
                    } else {
                        node.parentElement.appendChild(data)
                    }
                }
                if (!node.__children__) {
                    node.__children__ = [node.target_child = data]
                } else {
                    node.__children__.push(node.target_child = data)
                }
                ev = data = node = undefined
            },
            stringtolist: function (e) {
                var elm = arguments.callee.elm.cloneNode()
                elm.innerHTML = e;
                return elm.childNodes
            },
            exacute_data: function (e) {

            },
            observer_callback: function (e, type) {
                var node,
                    data;

                if (type === properties.nameSpace.element_flag) {
                    if (!e.getAttribute) {
                        return
                    }
                    if (e.hasAttribute(properties.nameSpace.attribute + '-target')) {
                        e.__target = e.getAttribute(properties.nameSpace.attribute + '-target')
                        e.__target = e.__target.split(',')
                        e.removeAttribute(properties.nameSpace.attribute + '-target')
                    }
                    e.pending = 0
                    e.data = e.getAttribute(properties.nameSpace.attribute)
                    e.removeAttribute(properties.nameSpace.attribute)
                    if (!e.data) {
                        return
                    }
                    node = e
                    data = e.data;
                } else {
                    if (type instanceof Node) {
                        node = type
                    } else {
                        node = document.createTextNode('')
                        node.pending = 0
                    }

                    if (type !== properties.nameSpace.offline) {
                        e._points_to = node
                        e.parentElement.replaceChild(node, e)
                    }

                    type = undefined
                    // node.__children__ = []
                    data = e.data.substring(1, e.data.length - 1)
                }

                data = data.trim().split(/^([^\s\n]+)/)
                node.__data__ = data[1].trim().toLowerCase()

                if (node.__data__ === e.parent_data) {
                    return properties.console.error('map stack limit reached.', node.__data__)
                }

                node.__data__ = node.__data__.split(':')
                data = data[2]
                if (data && (data[1] + data[data.length - 1]).match(/^(\{\}|\(\))$/)) {
                    try {
                        node.__events = new Function('"use strict";return ' + data)();
                    } catch (error) {
                        properties.console.error(error)
                    }
                    // console.log(node.__events,properties.$(node.__events,'onchange',[9]));
                } else if (data && !type) {
                    data = data.trim()
                    if ('#'.includes(data[0])) {
                        data = document.querySelector(data);
                        if (data) {
                            if (data.content) {
                                data = data.content
                                data = data.cloneNode(true)
                            } else {
                                data = data.childNodes
                            }
                        } else {
                            data = document.createTextNode('')
                        }
                    } else {
                        data = properties.stringtolist(data)
                        data.exeception = true
                    }
                    if (!((e = properties.store[node.__data__[0]]) && (e = e.has(node.__data__[1])))) {
                        node.target_child = node;
                        if (data instanceof NodeList && !data.exeception) {
                            properties.entries(node, data, 0)
                        } else {
                            properties.entries(node, data, 0, true)
                        }
                    }
                }

                data = e = undefined;

                properties.events.on(node.__data__[0], function () {
                    arguments[0].on(node.__data__[1], function () {
                        if (arguments[0] instanceof properties.APPConstant) {
                            node.pending = arguments[0].pending
                            arguments[0] = arguments[0].data
                        } else {
                            if (node.pending) {
                                arguments[0] = undefined
                                return
                            }
                        }

                        // if (!arguments[0] && typeof arguments[0] !== 'string') {
                        //     arguments[0] = ''
                        // }
                        // var ev = properties.$(node.__events,'onchange',[node.__children__,data])

                        if (type === properties.nameSpace.element_flag) {
                            // properties.type_entries(node, arguments[0])
                            properties.entries(node, arguments[0])
                        } else {
                            node.target_child = node;
                            properties.entries(node, arguments[0])
                            if (node.__events instanceof Object && typeof node.__events.onloadend === "function") {
                                new node.__events.onloadend(node.__children__, arguments[0])
                            }
                            if (node.__events instanceof Object && typeof node.__events.onload === "function") {
                                new node.__events.onload(node.__children__, arguments[0])
                            }
                        }
                        arguments[0] = undefined
                    })
                    arguments[0] = undefined
                })
            },
            console: console,
            store: {}
        },
        RouteJsCore = function () {
            this.map = function (name, data) {
                if (typeof name !== "string") {
                    return properties.console.error('invalid argument @map', name, data)
                }
                name = name.toLowerCase().trim()
                if (properties.store.hasOwnProperty(this.name)) {
                    if (arguments.length > 1) {
                        properties.store[this.name].emit(name, data)
                    } else {
                        properties.store[this.name].emit(name)
                    }
                }
                name = data = undefined
            }
            this.mapAll = function (object) {
                if (typeof object === 'object') {
                    for (var key in object) {
                        this.map(key, object[key])
                    }
                    object = undefined
                } else {
                    return properties.console.error('invalid argument @mapAll', object)
                }
                object = undefined
            }
            this.createNodeList = function (string) {
                return properties.stringtolist(arguments[0])
            }
            // this.createPromise = function (promise, placeholder) {
            //     return {
            //         data: arguments[0],
            //         placeholder: arguments[1],
            //         "[[man-formed]]": true
            //     }
            // }
            this.nonStaticTemplate = function (HTMLTemplate) {
                if (!window.HTMLTemplateElement) {
                    if (arguments[0] instanceof Element) {
                        return new properties.APPTemplate(arguments[0])
                    }
                    return arguments[0]
                }
                if (arguments[0] instanceof HTMLTemplateElement) {
                    return new properties.APPTemplate(arguments[0].content)
                } else {
                    return null
                }
            }

            this.useTemplate = function (HTMLTemplate) {
                if (typeof arguments[0] === "string") {
                    arguments[0] = document.querySelector(arguments[0]);
                }
                if (arguments[1] === true) {
                    /**@fixed remove*/
                    return this.nonStaticTemplate(arguments[0]);
                }
                if (!window.HTMLTemplateElement) {
                    if (arguments[0] instanceof Element) {
                        return arguments[0].cloneNode(true).childNodes
                    }
                    return arguments[0]
                }
                if (arguments[0] instanceof HTMLTemplateElement) {
                    return arguments[0].content.cloneNode(true).childNodes
                } else {
                    return null
                }
            }

            this.usePromise = function (promise) {
                return new properties.APPPromise(arguments[0], arguments[1])
            }
        }

    properties.stringtolist.elm = document.createElement('x');
    properties.events = properties.Event('router', {})
    properties.observer();

    window.RouteJs = function (name, object) {
        if (!(this instanceof RouteJs)) {
            return new RouteJs(name, object)
        }
        if (typeof name !== "string") {
            return properties.console.error('string expected, but ' + typeof name + ' provided', name, object)
        }

        name = name.toLowerCase().trim()
        this.name = name

        if (properties.store.hasOwnProperty(name)) {
            return;
        }
        var store = (properties.store[name] = properties.Event(name, object instanceof properties.APPExtendedObject ? object.content : {}));

        Object.freeze(this)
        this.mapAll(object)
        object = undefined
        properties.events.emit(this.name, store)
    }

    properties.APPExtendedObject.prototype.content = {}
    RouteJs.prototype = new RouteJsCore()
    RouteJs.extend = function () {
        return new properties.APPExtendedObject(arguments[0])
    }

    /**
     * @COMING_SOON </> RouteJs.initExtension(Function, String);
     */
    RouteJs.initExtension = function () {}
})();

// RouteJs.initExtension('mapplus',function(properties){
//     properties.entries()
// },`

// APPTemplate,
// entries

// `)