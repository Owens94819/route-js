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


void(function () {
    if (!window.Promise) {
        /**
         * @Legacy
         */
        window.Promise = new Function();
        Node.prototype.remove = function () {
            if (this.parentNode) {
                void this.parentNode.removeChild(this);
            }
        }
        String.prototype.includes = function () {
            return this.match(arguments[0]) ? true : false;
        }

        var DOMOBserver = window.document.createEvent("Event");
        void DOMOBserver.initEvent("DOMNodeInserted", true, true);
        void document.documentElement.dispatchEvent(DOMOBserver);
        void setInterval(function () {
            void document.documentElement.dispatchEvent(DOMOBserver);
        }, 500);
    }


    var properties = {
            use_attributes: true,
            max_map_stack: 7,
            max_map_rendering: 7,
            nameSpace: {
                attribute: 'route',
                offline: 'still_offline',
                element_flag: 'element',
                Program_public_name: 'RouteJs'
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
                void properties.console.warn('you\'re using an experimenter feature.\n useTemplate(,<Boolean>)');
                if (arguments.length >= 2) {
                    this.clone = arguments[1]
                } else {
                    this.clone = false
                }

                arguments[0] = arguments[0].cloneNode(true);
                var d = document.createElement('route:template')
                void d.appendChild(arguments[0])
                void properties.observer_interactor(d)
                this.content = d
                d = arguments[0] = undefined
            },
            Constructor: function (obj, str) {
                if (obj[str].prototype) {
                    return void 0
                }
                var d = obj[str]
                d = d.toString()
                if (d.substring(0, d.indexOf('(')).includes("async")) {
                    d = d.substring(d.indexOf('('))
                    d = 'return (function F' + d + ')'
                } else {
                    d = 'return  (function F' + d + ')'
                }
                obj[str] = new Function("\"use strict\";" + d)();
                return d = void 0
            },
            $: function () {
                if ((arguments[0] instanceof Object) === false && "string" !== typeof arguments[0]) {
                    return void 0
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
                                s = _i = void 0;
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
                            _p = s = _i = void 0;
                        } else {
                            return void 0
                        }
                    }
                    if (arguments[0] === null || arguments[0] === undefined) {
                        break;
                    }
                }
                i = void 0;
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
                i = i - 1
                return {
                    name: [String(type), type],
                    emit: function (name, data) {
                        if (arguments.length > 1) {
                            store.data[name] = data
                        }
                        if (store.events.hasOwnProperty(name)) {
                            for (var i = 0; i < store.events[name].length; i++) {
                                void store.events[name][i](store.data[name])
                            }
                        }
                        return data = name = i = void 0
                    },
                    on: function (name, foo) {
                        if (store.events[name] instanceof Array) {
                            store.events[name].push(foo)
                        } else {
                            store.events[name] = [foo]
                        }
                        if (store.data.hasOwnProperty(name)) {
                            void foo(store.data[name])
                        }
                        return foo = name = void 0
                    },
                    get: function (name) {
                        if (store.data.hasOwnProperty(name)) {
                            return store.data[name]
                        }
                        return name = void 0
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
                void new window.MutationObserver(function (e) {
                    for (var i = 0; i < e.length; i++) {
                        for (var _i = 0; _i < e[i].addedNodes.length; _i++) {
                            void foo(e[i].addedNodes[_i]);
                        }
                    }
                    return e = i = void 0;
                }).observe(elm || document, {
                    childList: true,
                    characterData: true,
                    subtree: true,
                });
                return elm = void 0;
            } : function (foo, elm) {
                elm.addEventListener('DOMNodeInserted', function (e) {
                    foo(e.target);
                    e = void 0;
                })
                return elm = void 0;
            }),
            observer: function () {
                void properties._observer(properties.observer_interactor, document)
            },
            observer_treeWalker: function (e) {
                if (e.childNodes.length < 1) {
                    return void 0;
                }
                var val = document.createTreeWalker(e, NodeFilter.SHOW_COMMENT, function () {
                        void d.push(arguments[0]);
                    }, false),
                    d = [];
                void val.nextNode();
                for (var i = 0; i < d.length; i++) {
                    void properties.observer_interactor(d[i]);
                }
                return e = val = d = void 0;
            },
            observer_interactor: function (e) {
                if (e instanceof Comment && e.parentNode && e.data[0] + e.data[e.data.length - 1] === '??') {
                    void properties.observer_callback(e)
                } else if (e instanceof Element) {
                    if (properties.use_attributes) {
                        if (e.hasAttribute(properties.nameSpace.attribute)) {
                            void properties.observer_callback(e, properties.nameSpace.element_flag)
                        } else {
                            var _e = e.querySelectorAll('[' + properties.nameSpace.attribute + ']')
                            for (var i = 0; i < _e.length; i++) {
                                void properties.observer_callback(_e[i], properties.nameSpace.element_flag)
                            }
                            _e = i = void 0;
                            void properties.observer_treeWalker(e);
                        }
                    } else {
                        void properties.observer_treeWalker(e);
                    }
                }
                return e = void 0;
            },
            re_entries: function (node) {
                if (!node) {
                    return node = void 0
                }

                if (!(node instanceof NodeList)) {
                    node = node.__children__
                }

                for (var i = node.length - 1; i >= 0; i--) {
                    if (node[i].__children__) {
                        void properties.re_entries(node[i])
                    } else {
                        if (node[i]._points_to) {
                            void properties.re_entries(node[i]._points_to)
                        } else {
                            void node[i].remove()
                        }
                    }
                }
                return node = i = void 0
            },
            type_entries: function (node, data, ch) {

                if (!(data instanceof Node)) {
                    data = document.createTextNode(data)
                }

                if (node.hasAttribute(properties.nameSpace.attribute + '-target')) {
                    node.__target = node.getAttribute(properties.nameSpace.attribute + '-target')
                    node.__target = node.__target.split(',')
                }

                if (void(0) && node.__target) {
                    /** depreciating this part for now */
                    if (ch) {
                        for (var i = 0; i < node.__target.length; i++) {
                            node[node.__target[i].trim()] += data.textContent
                        }
                    } else {
                        for (var i = 0; i < node.__target.length; i++) {
                            node[node.__target[i].trim()] = data.textContent
                        }
                    }
                } else {
                    if (node.__events.hasEventProperty === "true" && !ch) {
                        if (!node.previousNode) {
                            node.previousNode = {
                                __children__: []
                            }
                        }
                        for (var i = 0; i < node.childNodes.length; i++) {
                            void node.previousNode.__children__.push(node.childNodes[i])
                        }
                    } else if (!ch) {
                        void properties.re_entries(node.childNodes);
                    }

                    if (node.firstElementChild) {
                        void node.insertBefore(data, node.firstElementChild);
                    } else {
                        void node.appendChild(data);
                    }
                }
                return node = data = i = void 0;
            },
            entries: function (node, data, ch, cloned, x_data) {
                if (data instanceof Object && data['[[man-formed]]']) {
                    void properties.console.warn('unstable handler for type Promise', data)
                    data = '';
                } else if (data instanceof this.APPTemplate) {
                    void properties.entries(node, data.content, ch, !data.clone, x_data)
                    return x_data = node = data = void 0
                } else if (data instanceof DocumentFragment) {
                    if (cloned) {
                        void properties.entries(node, data.childNodes, ch, true)
                    } else {
                        void properties.entries(node, data.cloneNode(true).childNodes, ch, true)
                    }
                    return x_data = node = data = void 0
                } else if (data instanceof NodeList) {
                    if (cloned) {
                        for (var i = 0; data.length > 0; i++) {
                            if (data[0] instanceof Element) {
                                void properties.observer_treeWalker(data[0]);
                            }
                            void properties.entries(node, data[0], i, cloned, x_data)
                        }
                    } else {
                        for (var i = 0; i < data.length; i++) {
                            if (data[i] instanceof Element) {
                                void properties.observer_treeWalker(data[i]);
                            }
                            void properties.entries(node, data[i], i, cloned, x_data)
                        }
                    }
                    return x_data = node = data = i = void 0
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
                            ev = node = x_data = data = void 0
                        });
                    }
                    return void 0
                } else if (data instanceof properties.APPPromise) {
                    var ev = properties.store[node.__data__[0]]
                    if (ev) {
                        ev.emit(node.__data__[1], ch = new properties.APPConstant(data.placeholder))
                        data.data.then(function () {
                            ch.data = arguments[0]
                            ch.pending = 0
                            ev.emit(node.__data__[1], ch)
                            ch = ev = node = x_data = data = void 0
                        });
                    }
                    return void 0
                }
                if (!data && typeof data !== 'string') {
                    void properties.console.warn('unknow value of "' + data + '"', data)
                    data = document.createTextNode('');
                }

                if (data instanceof Comment) {
                    data.parent_data = node.__data__.join(':')
                }

                if (node instanceof Element) {
                    return void properties.type_entries(node, data, ch)
                }

                if (!(data instanceof Node)) {
                    data = document.createTextNode(data)
                }

                if (!ch && !x_data) {
                    if (node.__events.hasEventProperty) {
                        node.previousNode = {
                            __children__: node.__children__ || []
                        }
                        node.__children__ = []
                        if (node.__events.hasEventProperty === "false") {
                            void node.__events.resolve()
                        }
                    } else if (node.__children__) {
                        void properties.re_entries(node)
                        node.__children__ = []
                    }
                }

                if (x_data) {
                    node.target_child = x_data;
                    void x_data.parentElement.insertBefore(data, x_data)
                    x_data = void 0;
                } else {
                    if (node.target_child.nextSibling) {
                        void node.parentElement.insertBefore(data, node.target_child.nextSibling)
                    } else {
                        void node.parentElement.appendChild(data)
                    }
                }
                if (!node.__children__) {
                    node.__children__ = [node.target_child = data]
                } else {
                    void node.__children__.push(node.target_child = data)
                }
                return ev = data = node = void 0;
            },
            stringtolist: function (e) {
                var elm = arguments.callee.elm.cloneNode()
                elm.innerHTML = e;
                e = void 0
                return elm.childNodes
            },
            observer_callback: function (e, type) {
                var node,
                    data;

                if (type === properties.nameSpace.element_flag) {
                    if (!e.getAttribute) {
                        return void 0
                    }
                    if (e.hasAttribute(properties.nameSpace.attribute + '-target')) {
                        e.__target = e.getAttribute(properties.nameSpace.attribute + '-target')
                        e.__target = e.__target.split(',')
                        void e.removeAttribute(properties.nameSpace.attribute + '-target')
                    }
                    e.pending = 0
                    e.data = e.getAttribute(properties.nameSpace.attribute)
                    void e.removeAttribute(properties.nameSpace.attribute)
                    if (!e.data) {
                        return void 0
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
                        void e.parentElement.replaceChild(node, e)
                    }

                    type = void 0;
                    data = e.data.substring(1, e.data.length - 1)
                }

                data = data.trim().split(/^([^\s\n]+)/)
                node.__data__ = data[1].trim().toLowerCase()

                if (node.__data__ === e.parent_data) {
                    return properties.console.error('map stack limit reached.', node.__data__)
                }

                node.__data__ = node.__data__.split(':')
                data = data[2]
                node.__events = {};
                if (data && (data[1] + data[data.length - 1]).match(/^(\{\}|\(\))$/)) {
                    try {
                        node.__events = new Function('"use strict";return ' + data)();
                        if (typeof node.__events === "object") {
                            node.__events = Object.create(node.__events);
                        } else if (typeof node.__events === "function") {
                            node.__events = Object.create({
                                onload: node.__events
                            });
                        } else {
                            node.__events = {}
                        }
                        node.__events.resolve = function () {
                            properties.re_entries(node.previousNode), node.previousNode = void 0;
                        };
                        if (typeof node.__events.placeholder === "function") {
                            data = node.__events.placeholder()
                        } else {
                            data = node.__events.placeholder
                        }
                        if (
                            typeof node.__events.onload === "function" ||
                            typeof node.__events.onloadend === "function" ||
                            typeof node.__events.onloadstart === "function") {
                            node.__events.hasEventProperty = "true"
                        } else {
                            node.__events.hasEventProperty = "false"
                        }
                    } catch (error) {
                        data = void 0;
                        void properties.console.error(error)
                        error = void 0;
                    }
                }

                if (data && !type) {
                    if (!((e = properties.store[node.__data__[0]]) && (e = e.has(node.__data__[1])))) {
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
                        node.target_child = node;
                        if (data instanceof NodeList && !data.exeception) {
                            void properties.entries(node, data, 0)
                        } else {
                            void properties.entries(node, data, 0, true)
                        }
                    }
                }

                data = e = void 0;

                return void properties.events.on(node.__data__[0], function () {
                    return void arguments[0].on(node.__data__[1], function () {
                            if (arguments[0] instanceof properties.APPConstant) {
                                node.pending = arguments[0].pending
                                arguments[0] = arguments[0].data
                            } else {
                                if (node.pending) {
                                    return arguments[0] = void 0;
                                }
                            }

                            if (typeof node.__events.onloadstart === "function") {
                                void node.__events.onloadstart(node.__events.resolve, null, null)
                            }

                            if (type === properties.nameSpace.element_flag) {
                                void properties.entries(node, arguments[0])
                            } else {
                                node.target_child = node;
                                void properties.entries(node, arguments[0])
                            }

                            if (node.__events instanceof Object && typeof node.__events.onloadend === "function") {
                                void node.__events.onloadend(node.__events.resolve, null /**NEWSibling*/ , null /**OLDSibling*/ )
                            }
                            if (node.__events instanceof Object && typeof node.__events.onload === "function") {
                                void node.__events.onload(node.__events.resolve, null, null)
                            }
                            return arguments[0] = void 0
                        }),
                        arguments[0] = void 0;
                });
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
                        void this.map(key, object[key])
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
        };

    properties.stringtolist.elm = document.createElement('x');
    properties.events = properties.Event('router', {});
    void properties.observer();

    this.RouteJs = function (name, object) {
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

        void Object.freeze(this)
        void this.mapAll(object)
        object = name = void 0
        void properties.events.emit(this.name, store)
    }

    properties.APPExtendedObject.prototype.content = {};
    RouteJs.prototype = new RouteJsCore();
    RouteJsCore = void 0;

    RouteJs.extend = function () {
        return new properties.APPExtendedObject(arguments[0])
    };

    RouteJs.fetch = function (url, returnPromise) {
        "use strict";
        var request = new XMLHttpRequest();
        var prom = new Promise(function (rs, rj) {
            void request.addEventListener('load', function () {
                if (request.response && request.response.body) {
                    void rs(request.response.body.childNodes);
                } else {
                    void rs(request.response);
                }
                request = void 0;
                rs = void 0;
            });
            void request.addEventListener('error', function () {
                void rj(request);
                request = void 0;
                rj = void 0;
            });
        });

        request.then = function (a) {
            void prom.then(a)
            a = void 0;
            prom = void 0;
            return this;
        }

        request.catch = function (a) {
            void prom.catch(a)
            a = void 0;
            prom = void 0;
            return this;
        }

        request.responseType = 'document'
        request.open('GET', url)
        request.send()
        if (returnPromise) {
            return prom
        }
        return request
    };
    /**
     * @COMING_SOON </> RouteJs.initExtension(Function, String);
     */
    RouteJs.initExtension = function () {};
})();

// RouteJs.initExtension('mapplus',function(properties){
//     properties.entries()
// },`

// APPTemplate,
// entries

// `)