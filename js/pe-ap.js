/*
 * Dependencies for pe
 * - desktop will more than likely be more intensive in terms of capabilities
 * - mobile will be thinner
 */
/*
 * pe, a progressive javascript library agnostic framework
 */
(function ($) { /** pe object **/
    var pe = (typeof window.pe !== "undefined" && window.pe !== null) ? window.pe : {
        fn: {}
    };
    var _pe = { /* global object init properties */
/*
        @property - pe.language
        @returns - page language, defaults to fra is not available
        */
        language: ($("html").attr("lang") ? ($("html").attr("lang").indexOf("en") === 0 ? "eng" : "fra") : $("meta[name='dc.language'], meta[name='dcterms.language']").attr("content")),
/*
        @property - pe.doctype
        @returns - detect the doctype of the document (loosely)
        */
        html5: function () {
            var res = false,
                re = /\s+(X?HTML)\s+([\d\.]+)\s*([^\/]+)*\//gi;
            /*********************************************
             Just check for internet explorer.
             **********************************************/
            if (typeof document.namespaces !== "undefined") {
                res = (document.all[0].nodeType === 8) ? re.test(document.all[0].nodeValue) : false;
            } else {
                res = (document.doctype !== null) ? re.test(document.doctype.publicId) : false;
            }
            return (res) ? false : true;
        }(),
        
/*
        @property - pe.ie
        @returns - ie major number if browser is IE, 0 if not
        */
        ie: $.browser.msie ? $.browser.version : 0,
/*
        @function - pe._init, a private function to preprocessing for pe.
        @returns - void
        */
        _init: function () {
            // get the localization files
            pe.add.language(pe.language);
            // add polyfills if nessecary;
            pe.polyfills();
            // mobile test
            if (pe.mobile) {
                pe.add._load(['http://code.jquery.com/mobile/1.1.0-rc.1/jquery.mobile-1.1.0-rc.1.min.js']);
                // lets init some variables for use in various transformations
                // raw variable running on the dom
                // @TODO: optimize the dom manipulation routines - there is alot of DOM additions that should be keep as a document frag and replaced with .innerHTML as the end. // jsperf - 342% increase
                // lets transform the menu to a dialog box
                var mb_dialogue = '<div data-role="page" id="jqmobile-wet-boew-menubar"><div data-role="header">';
                mb_dialogue += "<h2>" + $('#cn-psnb > :header').html() + '</h2></div>';
                //mb_dialogue.append($('<div data-role="header"></div>').append($('#cn-psnb > :header').clone()));
                mb_dialogue += '<div data-role="content" data-inset="true">';
                mb_dialogue += '<p id="jqm-mb-location-text"></p>';
                if ($('#cn-left-col').length > 0) {
                    // we have a submenu
                    var sub = $('#cn-left-col .cn-left-col-default').html().replace(/<section>/gi, "").replace(/<\/section>/gi, "");
                    // lets work on the menu shift
                    /** sub = sub.replace(/<ul\b[^>]*"sub-nav"[^>]*>([\s\S]*?)<\/ul>/gmi, function(m, child){
                     var _internal = child;
                     _internal = _internal.replace(/<li.*?>/gmi,"").replace(/<\/li>/gmi,'').replace(/<a/gi,"<a class=\"ui-link\"  data-icon=\"arrow-r\"");
                     return "<div data-role=\"navbar\">" + _internal + "</div>";
                     });
                     **/
                    sub = sub.replace(/<ul(.*?)>/gi, "<ul data-role=\"listview\"$1>"); //.replace(/<\/ul>/gi,"");
                    sub = sub.replace(/<h(.*?)>\s*<a/gmi, "<div data-role=\"navbar\"><h$1 data-role=\"listview\"><a class=\"ui-link\" data-icon=\"arrow-r\"  data-theme=\"b\"").replace(/<\/h(\d)>/gi, "</h$1></div>");
                    //sub = sub.replace(/<\/a>\s+<ul(.*?)>(.*?)<\/ul>/gmi, "</a><div data-role=\"navbar\">$2</div>");
                    //console.log(sub);
                    mb_dialogue += sub;
                };
                mb_dialogue += '<h2>' + $('#cn-psnb').find(':header').eq(0).html() + '</h2>';
                mb_dialogue += '<ul data-role="listview" data-inset="true" data-theme=\"a\">';
                // top menu this is more than likely going to happen
                $('#cn-psnb ul.mb-menu > li').each(function () {
                    var _elm = $(this).find('a').eq(0);
                    mb_dialogue += '<li><a  href="' + _elm.attr('href') + '">' + _elm.text() + '</a></li>';
                    //list.append(item);
                });
                mb_dialogue += '</ul>';
                mb_dialogue += '</div></div>';
                pe.pagecontainer().append(mb_dialogue);
                $('#cn-psnb-inner').remove();
                $('#cn-psnb :header').wrapInner('<a href="#jqmobile-wet-boew-menubar" data-rel="dialog"></a>');
                // :: Search box transform lets transform the search box to a dialogue box
                var search_elm = $('#cn-search-box');
                var s_dialogue = $('<div data-role="page" id="jqmobile-wet-boew-search"></div>');
                s_dialogue.append($('<div data-role="header"></div>').append(search_elm.find(':header').clone())).append($('<div data-role="content"></div>').append(search_elm.find('form').clone()));
                pe.pagecontainer().append(s_dialogue);
                search_elm.find('form').remove();
                search_elm.find(':header').wrapInner('<a href="#jqmobile-wet-boew-search" data-rel="dialog"></a>');
                // lets see if we can change these to navbars
                var _list = $('<ul></ul>').hide().append('<li><a data-rel="dialog" data-theme="b" data-icon="search" href="' + search_elm.find(':header a').attr('href') + '">' + search_elm.find(':header a').text() + "</a></li>").append('<li><a data-rel="dialog" data-theme="b"  data-icon="grid" href="' + $('#cn-psnb > :header').find('a').attr('href') + '">' + $('#cn-psnb > :header').find('a').text() + "</a></li>");
                $('#cn-site-title').after($('<div data-role="navbar" data-iconpos="right"></div>').append(_list));
                // jquery mobile has loaded
                $(document).on("mobileinit", function () {
                    //$.mobile.loadingMessage = false;
                    $.mobile.ajaxEnabled = false;
                    $.mobile.pushStateEnabled = false;
                    search_elm.remove();
                    $('#cn-psnb :header').remove();
                    _list.show();
                });
                // preprocessing before mobile page is enhanced
                $(document).on("pageinit", function () {
                    // add some language
                    /**  $('.ui-page #cn-cols a[href*="#"]').each(function () {
                     var _elm = $(this);
                     if (_elm.attr('href').indexOf('#') > 0) {
                     // this is a external anchor
                     _elm.unbind('click').unbind('vclick').on('click vclick', function (e) {
                     e.stopPropagation();
                     e.preventDefault();
                     $.mobile.changePage(pe.url(_elm.attr('href')).removehash());
                     });
                     // _elm.attr('href', pe.url(_elm.attr('href')).hashtoparam());
                     } else {
                     // this is inpage anchor
                     _elm.unbind('click').unbind('vclick').on('click vclick', function (e) {
                     e.stopPropagation();
                     e.preventDefault();
                     var $target = $(this).parents('.ui-page').find($(this).attr('href')).eq(0);
                     if ($target.length == 1) $.mobile.silentScroll($target.offset().top);
                     });
                     }
                     }); **/
                });
            }
            // add the css
            pe.add.css('' + pe.add.liblocation + 'javascript.css');
        },
        /* properties */
        depends: {
            _ind: [],
            is: function (index) {
                return -1 != $.inArray(index, pe.depends._ind);
            },
            put: function (drone) {
                pe.depends._ind[pe.depends._ind.length] = drone;
            },
            on: function () {
                // lets bind a scan function to the drones property
                $(document).on('wet-boew-dependency-loaded', function () {
                    
                    
                    for (var i = 0; i < pe.depends.on.length; i++) {
                        pe.depends.on[i](i);
                    }
                });
                return []; // overwrite property to become a simple array
            }()
        },
/*
        @property: mobile
        @returns : regex fu mobile identification -> returns true/false per type or any
        */
        mobile: function () {
            return (document.documentElement.clientWidth < 767 && !($.browser.msie && $.browser.version < 10)) ? true : false;
        }(),
/*
        @property: pagecontainer
        @returns : the pe aware page query to append items to
        */
        pagecontainer: function () {
            return $('#cn-body-inner-3col,#cn-body-inner-2col,#cn-body-inner-1col').add('body').eq(0);
        },
/*
        @property: parameter
        @returns : discovers parameters via a few methods for the node
        */
        parameter: function (key, jqElm) {
            return (pe.html5) ? jqElm.data(key) : jqElm.attr('class').replace('/.*' + key + '-([a-z0-9_]+).*/i', "$1");
        },
/*
        @function to bind a function to a resize event
        */
        resize: function (fn) {
            ResizeEvents.initialise(); // ensure resize function initialized
            ResizeEvents.eventElement.bind("x-text-resize x-zoom-resize x-window-resize", function () {
                fn();
            });
            return;
        },
/*
        @property - pe.url
        @returns - pe.properties helper function for developers
        */
        url: function (uri) {
            var a;
            a = document.createElement('a');
            a.href = uri;
            return {
                source: uri,
                protocol: a.protocol.replace(':', ''),
                host: a.hostname,
                port: a.port,
                query: a.search,
                params: (function () {
                    var key, ret, s, seg, _i, _len;
                    ret = {};
                    seg = a.search.replace(/^\?/, '').split('&');
                    for (_i = 0, _len = seg.length; _i < _len; _i++) {
                        key = seg[_i];
                        if (!key) continue;
                        s = key.split('=');
                        ret[s[0]] = s[1];
                    }
                    return ret;
                })(),
                file: a.pathname.match(/\/([^\/?#]+)$/i) ? a.pathname.match(/\/([^\/?#]+)$/i)[1] : '',
                hash: a.hash.replace('#', ''),
                path: a.pathname.replace(/^([^\/])/, '/$1'),
                relative: a.href.match(/tps?:\/\/[^\/]+(.+)/) ? a.href.match(/tps?:\/\/[^\/]+(.+)/)[1] : '',
                segments: a.pathname.replace(/^\//, '').split('/'),
                removehash: function () {
                    return a.replace(/#([A-Za-z0-9-_]+)/, "");
                }
            };
        },
/*
        @function : _execute -> internal method to bind a plugin to a code block
        @returns : void
        */
        _execute: function (fn_obj, elm) {
            var exec = (fn_obj.hasOwnProperty('_exec')) ? fn_obj._exec : fn_obj.exec;
            if (fn_obj.hasOwnProperty('depends')) {
                pe.add.js(fn_obj.depends, function () {
                    exec(elm);
                });
                delete fn_obj.depends;
            } else {
                // execute function since it has no depends and we can safely execute
                exec(elm);
            }
            return;
        },
/*
        @function: pe.cssenabled
        @returns: returns true false
        */
        cssenabled: function () {
            return $('link').get(0).disabled;
        },
/*
        @function: pe.limit
        @returns: returns a class-based set limit count on plugins (0 if none found which means the plugin default )
        */
        limit: function (elm) {
            var count;
            count = $(elm).attr("class").match(/\blimit-\d+/);
            if (!count) return 0;
            return count[0].replace(/limit-/i, "");
        },
/*
        @function: pe.focus -  a generic function to focus elements in the DOM in a screen reader compatible way / selector or object
        @returns: the jQuery reference for the element
        */
        focus: function (elm) {
            setTimeout(function () {
                return elm.focus();
            }, 0);
            return elm;
        },
/*
    @property : string handler
    @returns : a set of string specific helper functions
    */
        string: {
/*
      @function : pe.string.ify.clean(text)
      @returns : modified text with htmlified text into a HTML links ( mailto, anchors, etc )
      @credits : Dustin Diaz | http://www.dustindiaz.com/basement/ify.html
      @license : public BSD
      */
            ify: (function () {
                return {
                    "link": function (t) {
                        return t.replace(/[a-z]+:\/\/[a-z0-9-_]+\.[a-z0-9-_@:~%&\?\+#\/.=]+[^:\.,\)\s*$]/ig, function (m) {
                            var _ref;
                            return '<a href="' + m + '">' + ((_ref = m.length > 25) != null ? _ref : m.substr(0, 24) + {
                                '...': m
                            }) + '</a>';
                        });
                    },
                    "at": function (t) {
                        return t.replace(/(^|[^\w]+)\@([a-zA-Z0-9_]{1,15}(\/[a-zA-Z0-9-_]+)*)/g, function (m, m1, m2) {
                            return m1 + '@<a href="http://twitter.com/' + m2 + '">' + m2 + '</a>';
                        });
                    },
                    "hash": function (t) {
                        return t.replace(/(^|[^&\w'"]+)\#([a-zA-Z0-9_]+)/g, function (m, m1, m2) {
                            return m1 + '#<a href="http://search.twitter.com/search?q=%23' + m2 + '">' + m2 + '</a>';
                        });
                    },
                    "clean": function (tweet) {
                        return this.hash(this.at(this.link(tweet)));
                    }
                };
            })(),
/*
      @function : pe.string.pad(i, l, s)
      @params : i - original string, l - leading padding required, s - padding character
      @returns : pads numeric string with appropiate leading characters
      */
            pad: function (number, length) {
                var str;
                str = "" + number;
                while (str.length < length) {
                    str = "0" + str;
                }
                return str;
            }
        },
/*
    @property : date
    @function : a suite of date related functions for easier parsing of dates
    */
        date: {
/*
      Converts the date in d to a date-object. The input can be:
      a date object: returned without modification
      an array      : Interpreted as [year,month,day]. NOTE: month is 0-11.
      a number     : Interpreted as number of milliseconds
                   since 1 Jan 1970 (a timestamp)
      a string     : Any format supported by the javascript engine, like
                   "YYYY/MM/DD", "MM/DD/YYYY", "Jan 31 2009" etc.
      an object     : Interpreted as an object with year, month and date
                  attributes.  **NOTE** month is 0-11.
      */
            convert: function (d) {
                if (d.constructor === Date) {
                    return d;
                } else {
                    if (d.constructor === Array) {
                        return new Date(d[0], d[1], d[2]);
                    } else {
                        if (d.constructor === Number) {
                            return new Date(d);
                        } else {
                            if (d.constructor === String) {
                                return new Date(d);
                            } else {
                                if (typeof d === "object") {
                                    return new Date(d.year, d.month, d.date);
                                } else {
                                    return NaN;
                                }
                            }
                        }
                    }
                }
            },
/*
      Compare two dates (could be of any type supported by the convert function above) and returns:
       -1 : if a < b
       0 : if a = b
       1 : if a > b
       NaN : if a or b is an illegal date
       NOTE: The code inside isFinite does an assignment (=).
      */
            compare: function (a, b) {
                if (isFinite(a = this.convert(a).valueOf()) && isFinite(b = this.convert(b).valueOf())) {
                    return (a > b) - (a < b);
                } else {
                    return NaN;
                }
            },
/*
      Checks if date in d is between dates in start and end.
       Returns a boolean or NaN:
        true  : if d is between start and end (inclusive)
        false : if d is before start or after end
        NaN   : if one or more of the dates is illegal.
      NOTE: The code inside isFinite does an assignment (=).
      */
            in_range: function (d, start, end) {
                if (isFinite(d = this.convert(d).valueOf()) && isFinite(start = this.convert(start).valueOf()) && isFinite(end = this.convert(end).valueOf())) {
                    return start <= d && d <= end;
                } else {
                    return NaN;
                }
            },
/*
            Cross browser safe way of translating a date to iso format

            */
            to_iso_format: function (d, timepresent) {
                var date;
                date = this.convert(d);
                if (timepresent) {
                    return date.getFullYear() + "-" + pe.string.pad(date.getMonth() + 1, 2, "0") + "-" + pe.string.pad(date.getDate() + 1, 2, "0") + " " + pe.string.pad(date.getHours(), 2, "0") + ":" + pe.string.pad(date.getMinutes(), 2, "0");
                } else {
                    return date.getFullYear() + "-" + pe.string.pad(date.getMonth() + 1, 2, "0") + "-" + pe.string.pad(date.getDate() + 1, 2, "0");
                }
            }
        },
        /*
                @function : pe.polyfills
                @params : a init function to load required polyfills, @TODO: set up a single loader method to streamline
                */
        polyfills: function () {
            var lib = pe.add.liblocation;
            // modernizer test for detailsummary support
            var detail = (function (doc) { var el = doc.createElement('details'), fake, root, diff;
                if (!('open' in el)) {
                    return false;
                }
                root = doc.body || (function () {
                    var de = doc.documentElement;
                    fake = true;
                    return de.insertBefore(doc.createElement('body'), de.firstElementChild || de.firstChild);
                }());
                el.innerHTML = '<summary>a</summary>b';
                el.style.display = 'block';
                root.appendChild(el);
                diff = el.offsetHeight;
                el.open = true;
                diff = diff != el.offsetHeight;
                root.removeChild(el);
                if (fake) {
                    root.parentNode.removeChild(root);
                }
                return diff;
            }(document));
                        
            // localstorage
            if (!window.localStorage) pe.add._load(lib + 'polyfills/localstorage.js');
            // process
            if (!('position' in document.createElement('progress'))) pe.add._load(lib + 'polyfills/progress.js');
            // detail + summary
            if (!detail) pe.add._load(lib + 'polyfills/detailsummary.js');
        },
/*
        @function : pe.add
        @params : a series of chainable methods to add elements to the head ( async )
        */
        add: (function () {
            return {
                head: document.getElementsByTagName('head'),
                liblocation: document.getElementById('progressive').src.replace(/pe-ap.(dev.)?js.*$/i, ""),
                staged : [],
/*
                 @function: load - a loading algorthim borrowed from labjs. Thank you!
                 */
                _load: function (js) {
                    var head = pe.add.head;
                    // - lets prevent double loading of dependencies
                    if ($.inArray(js,this.staged) > -1 ) return this;
                    // - now lets bind the events
                    setTimeout(function () {
                        if ("item" in head) { // check if ref is still a live node list
                            if (!head[0]) { // append_to node not yet ready
                                setTimeout(arguments.callee, 25);
                                return;
                            }
                            head = head[0]; // reassign from live node list ref to pure node ref -- avoids nasty IE bug where changes to DOM invalidate live node lists
                        }
                        var scriptElem = document.createElement("script"),
                            scriptdone = false;
                        pe.add.set(scriptElem, 'async', true);
                        scriptElem.onload = scriptElem.onreadystatechange = function () {
                            if ((scriptElem.readyState && scriptElem.readyState !== "complete" && scriptElem.readyState !== "loaded") || scriptdone) {
                                return false;
                            }
                            scriptElem.onload = scriptElem.onreadystatechange = null;
                            scriptdone = true;
                            // now add to dependency lis
                            pe.depends.put(js);
                            $(document).trigger('wet-boew-dependency-loaded');
                        };
                        scriptElem.src = js;
                        head.insertBefore(scriptElem, head.firstChild);
                    }, 0);
                    this.staged[this.staged.length] = js;
                    return this;
                },
/*
        @function : pe.add.set
        @params : [ name, content ] -> sets element properties
        */
                set: function (elm, name, value) {
                    elm.setAttribute(name, value);
                    return this;
                },
/*
        @function : pe.add.css
        @params : [ url] -> add a stylesheet link to the head
        */
                css: function (css) {
                    var styleElement;
                    styleElement = document.createElement('link');
                    pe.add.set(styleElement, 'type', 'text/css').set(styleElement, 'rel', 'stylesheet').set(styleElement, 'href', css);
                    pe.add.head[0].appendChild(styleElement);
                    return this;
                },
/*
        @function : pe.add.drones
        @params : [ libraries] -> a completed library array
        */
                depends: function (d) {
                    var lib = pe.add.liblocation;
                    var c_d = $.map(d, function (a) {
                        return (/^http(s)?/i.test(a)) ? a : lib + 'dependencies/' + a + '.js';
                    });
                    return c_d;
                },
/*
        @function : pe.add.language
        @params : [ url] -> add a javascript link to the head
        */
                language: function (lang) {
                    var url = "" + pe.add.liblocation + "i18n/" + lang.substring(0, 2) + ".js";
                    // console.log('language load :: ' + url);
                    pe.add._load(url);
                },
/*
        @function : pe.add.js
        @params : [ url] -> add a javascript link to the head
        */
                js: function (js, fn) {
                    js = pe.add.depends(js); // lets translate this to an array
                    for (var i = 0; i < js.length; i++) {
                        
                        if (!pe.depends.is(js[i])) pe.add._load(js[i]);
                    }
                    // now create the binding for dependencies
                    pe.depends.on[pe.depends.on.length] = function (index) {
                        var execute = true;
                        for (var i = 0; i < js.length; i++) {
                           // console.log('{pe.depends.on call} need ' +js[i] + ' loaded : ' + pe.depends.is(js[i]));
                            if (!pe.depends.is(js[i])) {
                                
                                execute = false;
                            }
                        }
                        if (execute) {
                            pe.depends.on[index] = function () {};
                            fn();
                        }
                    };
                    // now trigger an update event to ensure plugins are filtered
                    $(document).trigger('wet-boew-dependency-loaded');
                    return this;
                },
/*
        @function : pe.add.meta
        @params : [ name, content ] -> add a metadata element to the head of the document
        */
                meta: function (name, content) {
                    var styleElement;
                    styleElement = document.createElement('meta');
                    pe.add.set(styleElement, 'name', name).set(styleElement, 'content', content);
                    pe.add.head[0].appendChild(styleElement);
                    return this;
                }
            };
        })(),
/*
        @function : the main dance function
        @todo: pass an element as the context for the recursion
        */
        dance: function () {
            //console.log(pe.html5);
            // global plugins
            var settings = (typeof wet_boew_properties !== 'undefined' && wet_boew_properties !== null) ? wet_boew_properties : false;
            // page specific plugins
            if (pe.mobile) {
                //$('#jqm-mb-location-text').text(($('#cn-bc ol li a[href]').length > 0) ? pe.dic.get('%you-are-in') + $('#cn-bc ol li').last().prev('li').text() : pe.dic.get('%welcome-to'));
                $('#jqm-mb-location-text').html($('#cn-bc').html());
            }
            $('[class^="wet-boew-"]').each(function () {
                var _fcall, _node;
                _node = $(this);
                _fcall = _node.attr("class").replace(/^wet-boew-(\S*).*/i, "$1".toLowerCase());
                if (pe.fn.hasOwnProperty(_fcall)) pe._execute(pe.fn[_fcall], _node);
                // lets safeguard the execution to only functions we have
            });
            // globals
            if (settings) {
                // loop throught globals adding functions
                for (var i = 0; i < settings.globals.length; i++) {
                    pe._execute(pe.fn[settings.globals[i]], document);
                }
            }
            $('html').removeClass('no-js').addClass('gcwu');
            // console.log("[pe properties] mobile -> " + this.mobile);
        }
    }; /* window binding */
    window.pe = $.extend(true, pe, _pe);
    return window.pe;
})(jQuery)._init();