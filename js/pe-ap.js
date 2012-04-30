/*!
 * Web Experience Toolkit (WET) / Boîte à outils de l'expérience Web (BOEW)
 * www.tbs.gc.ca/ws-nw/wet-boew/terms / www.sct.gc.ca/ws-nw/wet-boew/conditions
 */
/*
 * Dependencies for pe
 * - desktop will more than likely be more intensive in terms of capabilities
 * - mobile will be thinner
 */
/*
 * pe, a progressive javascript library agnostic framework
 */
(function ($) {
	var pe, _pe;
	/**
	 * pe object
	 * @namespace pe
	 * @version 1.3
	 */
    pe = (typeof window.pe !== "undefined" && window.pe !== null) ? window.pe : {
        fn: {}
    };
    _pe = { /** Global object init properties */
		/**
		 * @memberof pe
         * @type {string} Page language, defaults to fra if not available
         */
        language: ($("html").attr("lang") ? ($("html").attr("lang").indexOf("en") === 0 ? "eng" : "fra") : $("meta[name='dc.language'], meta[name='dcterms.language']").attr("content")),
		/**
		 * Detects the doctype of the document (loosely)
         * @function
		 * @memberof pe
         * @returns {boolean} 
         */
        html5: (function () {
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
        }()),
		/**
         * @memberof pe
         * @type {number} - IE major number if browser is IE, 0 otherwise
         */
        ie: $.browser.msie ? $.browser.version : 0,
		/**
		 * A private function for initializing for pe.
         * @function
		 * @memberof pe
         * @returns {void}
         */
        _init: function () {
            // get the localization files
            pe.add.language(pe.language);
            // add polyfills if nessecary;
            pe.polyfills();
            // mobile test
            if (pe.mobilecheck()) {
				pe.mobile = true;
				var mb_dialogue, sub, search_elm, s_dialogue, _list;
                // lets init some variables for use in various transformations
                // raw variable running on the dom
                // @TODO: optimize the dom manipulation routines - there is alot of DOM additions that should be keep as a document frag and replaced with .innerHTML as the end. // jsperf - 342% increase
                // lets transform the menu to a dialog box
                mb_dialogue = '<div data-role="page" id="jqmobile-wet-boew-menubar"><div data-role="header">';
                mb_dialogue += "<h2>" + $('#cn-psnb > :header').html() + '</h2></div>';
                //mb_dialogue.append($('<div data-role="header"></div>').append($('#cn-psnb > :header').clone()));
                mb_dialogue += '<div data-role="content" data-inset="true">';
                mb_dialogue += '<p id="jqm-mb-location-text"></p>';
                if ($('#cn-left-col').length > 0) {
                    // we have a submenu
                    sub = $('#cn-left-col .cn-left-col-default').html().replace(/<section>/gi, "").replace(/<\/section>/gi, "");
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
                }
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
                search_elm = $('#cn-search-box');
                s_dialogue = $('<div data-role="page" id="jqmobile-wet-boew-search"></div>');
                s_dialogue.append($('<div data-role="header"></div>').append(search_elm.find(':header').clone())).append($('<div data-role="content"></div>').append(search_elm.find('form').clone()));
                pe.pagecontainer().append(s_dialogue);
                search_elm.find('form').remove();
                search_elm.find(':header').wrapInner('<a href="#jqmobile-wet-boew-search" data-rel="dialog"></a>');
                // lets see if we can change these to navbars
                _list = $('<ul></ul>').hide().append('<li><a data-rel="dialog" data-theme="b" data-icon="search" href="' + search_elm.find(':header a').attr('href') + '">' + search_elm.find(':header a').text() + "</a></li>").append('<li><a data-rel="dialog" data-theme="b"  data-icon="grid" href="' + $('#cn-psnb > :header').find('a').attr('href') + '">' + $('#cn-psnb > :header').find('a').text() + "</a></li>");
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
            pe.add.css(pe.add.liblocation + 'javascript.css');
        },
        /**
		 * @namespace pe.depends
		 */
        depends: {
            /**
			 * Internal list for tracking dependencies.
			 * @memberof pe.depends
			 * @type {string[]}
			 */
			_ind: [],
			/**
			 * Checks if a dependency exists in the depends object.
			 * @memberof pe.depends
			 * @function
			 * @param {string} name The name of the dependency
			 * @return {number} The index of given dependency in the depends object. -1 if not found.
			 */
            is: function (name) {
                return -1 !== $.inArray(name, pe.depends._ind);
            },
			/**
			 * Adds a dependency to the depends object.
			 * @memberof pe.depends
			 * @function
			 * @param {string} drone The name of the dependency
			 * @return {void}
			 */
            put: function (drone) {
                pe.depends._ind[pe.depends._ind.length] = drone;
            },
			/**
			 * Binds a listener for the wet-boew-dependecy-loaded event.
			 * @memberof pe.depends
			 * @function
			 * @return {Array} An empty array.
			 */
            on: (function () {
                // lets bind a scan function to the drones property
                $(document).on('wet-boew-dependency-loaded', function () {
                    var i, d;
                    for (i = 0, d = pe.depends.on.length; i < d; i++) {
                        pe.depends.on[i](i);
                    }
                });
                return []; // overwrite property to become a simple array
            }())
        },
		/**
		 * Mobile identification
		 * @memberof pe
		 * @type {boolean} true if browser is not IE < 9 and browser window size is less than 767px wide.
		 */
		mobile: false,
		mobilecheck: function () {
            return (document.documentElement.clientWidth < 767 && !($.browser.msie && $.browser.version < 9)) ? true : false;
        },
		/**
		 * The pe aware page query to append items to
		 * @memberof pe
		 * @function
		 * @return {jQuery object}
		 */
		pagecontainer: function () {
            return $('#cn-body-inner-3col,#cn-body-inner-2col,#cn-body-inner-1col').add('body').eq(0);
        },
        /**
		 * Internal function that discovers parameters for the element against which a plugin will run.
		 * @memberof pe
		 * @function
		 * @param {string} key The parameter to look for.
		 * @param {jQuery object} jqElm The element to look for the parameter on.
		 * @return {string} The value of the parameter asked for.
		 */
		parameter: function (key, jqElm) {
            return (pe.html5) ? jqElm.data(key) : jqElm.attr('class').replace('/.*' + key + '-([a-z0-9_]+).*/i', "$1");
        },
        /**
		 * Initializes the Resize dependency, and attaches a given function to various resize events.
		 * @memberof pe
		 * @function
		 * @param {function} fn The function to run when a resize event fires.
		 * @return {void}
		 */
		resize: function (fn) {
            ResizeEvents.initialise(); // ensure resize function initialized
            ResizeEvents.eventElement.bind("x-text-resize x-zoom-resize x-window-resize", function () {
                fn();
            });
            return;
        },
        /**
		 * URL swiss-army knife helper function for developers.
		 * @memberof pe
		 * @see pe.url
		 * @function pe.url(1)
		 * @param {string} uri A relative or absolute URL to manipulate.
		 */
		url: function (uri) {
            var a;
            a = document.createElement('a');
            a.href = uri;
            return {
				/**
				 * @namespace pe.url
				 */
				/**
				 * The original URL converted to an absolute URL.
				 * @memberof pe.url
				 * @type {string}
				 */
				source: uri,
                /**
				 * The protocol of the URL. eg. http or https
				 * @memberof pe.url
				 * @type {string}
				 */
				protocol: a.protocol.replace(':', ''),
                /**
				 * The full host name of the URL.
				 * @memberof pe.url
				 * @type {string}
				 * @example
				 * pe.url('http://www.canada.ca/index.html').host
				 *    returns "www.canada.ca"
				 */
				host: a.hostname,
                /**
				 * The port of the URL.
				 * @memberof pe.url
				 * @type {string} If no port is specified, this will return "80".
				 */
				port: a.port === '0' ? '80' : a.port,
                /**
				 * The query string part of the URL.
				 * @memberof pe.url
				 * @type {string}
				 * @see #params
				 * @example
				 * pe.url('http://www.canada.ca?a=1&b=2').query
				 *    returns "?a=1&b=2"
				 */
				query: a.search,
                /**
				 * A collection of the parameters of the query string part of the URL.
				 * @memberof pe.url
				 * @type {object (key/value map of strings)}
				 * @see #query
				 * @example
				 * pe.url('http://www.canada.ca?a=1&b=2').params
				 *    returns
				 *       {
				 *          a: "1",
				 *          b: "2"
				 *       }
				 */
				params: (function () {
                    var key, ret, s, seg, _i, _len;
                    ret = {};
                    seg = a.search.replace(/^\?/, '').split('&');
                    for (_i = 0, _len = seg.length; _i < _len; _i++) {
                        key = seg[_i];
                        if (key) {
							s = key.split('=');
							ret[s[0]] = s[1];
						}
                    }
                    return ret;
                }()),
                /**
				 * The file name, if any, of the URL.
				 * @memberof pe.url
				 * @type {string}
				 * @example
				 *    pe.url('http://www.canada.gc.ca/aboutcanada-ausujetcanada/hist/menu-eng.html').file
				 *       returns "menu-eng.html"
				 */
				file: a.pathname.match(/\/([^\/?#]+)$/i) ? a.pathname.match(/\/([^\/?#]+)$/i)[1] : '',
                /**
				 * The anchor of the URL.
				 * @memberof pe.url
				 * @type {string}
				 * @example
				 *    pe.url('http://www.canada.ca#cn-centre-col-inner').hash
				 *       returns "cn-centre-col-inner"
				 */
				hash: a.hash.replace('#', ''),
                /**
				 * The path of the URL.
				 * @memberof pe.url
				 * @type {string}
				 * @example
				 *    pe.url('http://www.canada.gc.ca/aboutcanada-ausujetcanada/hist/menu-eng.html').path
				 *       returns "/aboutcanada-ausujetcanada/hist/menu-eng.html"
				 */
				path: a.pathname.replace(/^([^\/])/, '/$1'),
                /**
				 * The relative path of the URL.
				 * @memberof pe.url
				 * @type {string}
				 * @example
				 *    pe.url('http://www.canada.gc.ca/aboutcanada-ausujetcanada/hist/menu-eng.html').relative
				 *       returns "/aboutcanada-ausujetcanada/hist/menu-eng.html"
				 */
				relative: a.href.match(/tps?:\/\/[^\/]+(.+)/) ? a.href.match(/tps?:\/\/[^\/]+(.+)/)[1] : '',
                /**
				 * The path of the URL broken up into an array.
				 * @memberof pe.url
				 * @type {string[]}
				 * @example
				 *    pe.url('http://www.canada.gc.ca/aboutcanada-ausujetcanada/hist/menu-eng.html').segments
				 *       returns ["aboutcanada-ausujetcanada", "hist", "menu-eng.html"]
				 */
				segments: a.pathname.replace(/^\//, '').split('/'),
                /**
				 * The URL minus the anchor.
				 * @memberof pe.url
				 * @type {string}
				 * @function
				 * @example
				 *    pe.url('http://www.canada.gc.ca/aboutcanada-ausujetcanada/hist/menu-eng.html#cn-centre-col-inner').removehash()
				 *       returns "http://www.canada.gc.ca/aboutcanada-ausujetcanada/hist/menu-eng.html"
				 *    pe.url( pe.url('http://www.canada.gc.ca/aboutcanada-ausujetcanada/hist/menu-eng.html#cn-centre-col-inner').removehash() ).relative
				 *       returns "/aboutcanada-ausujetcanada/hist/menu-eng.html"
				 */
				removehash: function () {
                    return this.source.replace(/#([A-Za-z0-9-_]+)/, "");
                }
            };
        },
        /**
		 * Internal method to bind a plugin to a code block
		 * @memberof pe
		 * @function
		 * @param {function} fn_obj The plugin to run the _exec method of.
		 * @param {jQuery object} elm The jQuery object(s) to run the plugin against.
		 * @return {void}
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
		/**
		 * @memberof pe
         * @function
         * @return {boolean}
         */
        cssenabled: function () {
            return $('link').get(0).disabled;
        },
        /**
		 * Returns a class-based set limit on plugin instances
		 * @memberof pe
		 * @function
		 * @param {DOM object} elm The element to search for a class of the form blimit-5
		 * @return {number} 0 if none found, which means the plugin default
		 */
		limit: function (elm) {
            var count;
            count = $(elm).attr("class").match(/\blimit-\d+/);
            if (!count) {
				return 0;
			}
            return Number(count[0].replace(/limit-/i, ""));
        },
        /**
		 * A generic function to focus elements in the DOM in a screen reader compatible way / selector or object.
		 * @memberof pe
		 * @function
		 * @param {jQuery object | DOM object} elm The element to recieve focus.
		 * @return {jQuery object | DOM object} elm For chainability.
		 */
		focus: function (elm) {
            setTimeout(function () {
                return (typeof elm.jquery !== undefined ? elm.focus() : $(elm).focus());
            }, 0);
            return elm;
        },
        /**
		 * @namespace pe.string
		 */
        string: {
			/*
			@returns : modified text with htmlified text into a HTML links ( mailto, anchors, etc )
			@credits : Dustin Diaz | http://www.dustindiaz.com/basement/ify.html
			@license : public BSD
			*/
            ify: (function () {
                return {
                    "link": function (t) {
						return t.replace(/[a-z]+:\/\/[a-z0-9-_]+\.[a-z0-9-_@:~%&\?\+#\/.=]+[^:\.,\)\s*$]/ig, function (m) {
							return '<a href="' + m + '">' + ((m.length > 25) ? m.substr(0, 24) + '...' : m) + '</a>';
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
                    /**
					 * Formats tweets for display on a webpage. Adds markup for links in the tweet. Adds markup for user names (@). Adds markup for topics (#).
					 * @memberof pe.string
					 * @function ify.clean
					 * @param {string} tweet The tweet to format.
					 * @return {string}
					 * @example
					 * pe.string.ify.clean('@ded the cdn url is http://cdn.enderjs.com')
					 *    returns '@&lt;a href="http://twitter.com/ded"&gt;ded&lt;/a&gt; the cdn url is &lt;a href="http://cdn.enderjs.com"&gt;http://cdn.enderjs.com&lt;/a&gt;'
					 *        ie. '@<a href="http://twitter.com/ded">ded</a> the cdn url is <a href="http://cdn.enderjs.com">http://cdn.enderjs.com</a>'
					 */
					"clean": function (tweet) {
						return this.hash(this.at(this.link(tweet)));
					}
                };
            }()),
			/**
			 * Left-pads a number with zeros.
			 * @memberof pe.string
			 * @function
			 * @param {number} number The original number to pad.
			 * @param {number} length The width of the resulting padded number, not the number of zeros to add to the front of the string.
			 * @return {string} The padded string
			 */
            pad: function (number, length) {
                var str;
                str = String(number);
                while (str.length < length) {
                    str = "0" + str;
                }
                return str;
            }
        },
        /**
		 * A suite of date related functions for easier parsing of dates
		 * @namespace pe.date
		 */
		date: {
            /**
			 * Converts the date to a date-object. The input can be: 
			 * <ul>	
			 * <li>a Date object:	returned without modification.</li>
			 * <li>an array:		Interpreted as [year,month,day]. NOTE: month is 0-11.</li>
			 * <li>a number:		Interpreted as number of milliseconds since 1 Jan 1970 (a timestamp).</li>
			 * <li>a string:		Any format supported by the javascript engine, like "YYYY/MM/DD", "MM/DD/YYYY", "Jan 31 2009" etc.</li>
			 * <li>an object:		Interpreted as an object with year, month and date attributes. **NOTE** month is 0-11.</li>
			 * </ul>
			 * @memberof pe.date
			 * @function
			 * @param {Date | number[] | number | string | object} d
			 * @return {Date | NaN}
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
            /**
			 * Compares two dates (input can be any type supported by the convert function). NOTE: This function uses pe.date.isFinite, and the code inside isFinite does an assignment (=).
			 * @memberof pe.date
			 * @function
			 * @param {Date | number[] | number | string | object} a
			 * @param {Date | number[] | number | string | object} b
			 * @return {number | NaN}
			 * @example returns
			 * -1 if a < b
			 * 0 if a = b
			 * 1 if a > b
			 * NaN if a or b is an illegal date
			 */
			compare: function (a, b) {
                if (isFinite(a = this.convert(a).valueOf()) && isFinite(b = this.convert(b).valueOf())) {
                    return (a > b) - (a < b);
                } else {
                    return NaN;
                }
            },
            /**
			 * Checks if date in d is between dates in start and end. NOTE: This function uses pe.date.isFinite, and the code inside isFinite does an assignment (=).
			 * @memberof pe.date
			 * @function
			 * @param {Date | number[] | number | string | object} d
			 * @param {Date | number[] | number | string | object} start
			 * @param {Date | number[] | number | string | object} end
			 * @return {boolean | NaN}
			 */
			in_range: function (d, start, end) {
                if (isFinite(d = this.convert(d).valueOf()) && isFinite(start = this.convert(start).valueOf()) && isFinite(end = this.convert(end).valueOf())) {
                    return start <= d && d <= end;
                } else {
                    return NaN;
                }
            },
			/**
             * Cross-browser safe way of translating a date to iso format
			 * @memberof pe.date
			 * @function
			 * @param {Date | number[] | number | string | object} d
			 * @param {boolean} timepresent Optional. Whether to include the time in the result, or just the date. False if blank.
			 * @return {string}
			 * @example
			 * pe.date.to_iso_format(new Date())
			 *    returns "2012-04-27"
			 * pe.date.to_iso_format(new Date(), true)
			 *    returns "2012-04-27 13:46"
             */
            to_iso_format: function (d, timepresent) {
                var date;
                date = this.convert(d);
                if (timepresent) {
                    return date.getFullYear() + "-" + pe.string.pad(date.getMonth() + 1, 2, "0") + "-" + pe.string.pad(date.getDate(), 2, "0") + " " + pe.string.pad(date.getHours(), 2, "0") + ":" + pe.string.pad(date.getMinutes(), 2, "0");
                } else {
                    return date.getFullYear() + "-" + pe.string.pad(date.getMonth() + 1, 2, "0") + "-" + pe.string.pad(date.getDate(), 2, "0");
                }
            }
        },
        /**
		 * A function to load required polyfills, @TODO: set up a single loader method to streamline
		 * @memberof pe
		 * @function
		 * @return {void}
		 */
		polyfills: function () {
            var lib = pe.add.liblocation,
				// modernizer test for detailsummary support
				detail = (function (doc) {
					var el = doc.createElement('details'),
						fake,
						root,
						diff;
					if (!(el.hasOwnProperty('open'))) {
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
					diff = diff !== el.offsetHeight;
					root.removeChild(el);
					if (fake) {
						root.parentNode.removeChild(root);
					}
					return diff;
				}(document));
            // localstorage
            if (!window.localStorage) {
				pe.add._load(lib + 'polyfills/localstorage.js');
			}
            // process
            if (!(document.createElement('progress').hasOwnProperty('position'))) {
				pe.add._load(lib + 'polyfills/progress.js');
			}
            // detail + summary
            if (!detail) {
				pe.add._load(lib + 'polyfills/detailsummary.js');
			}
        },
        /**
		 * A series of chainable methods to add elements to the head ( async )
		 * @namespace pe.add
		 */
		add: (function () {
            return {
                /**
				 * A reference to the document's head element.
				 * @memberof pe.add
				 * @type {DOM object}
				 */
				head: document.head || document.getElementsByTagName("head"),
                /**
				 * The path to the root folder of the javascript files (same folder as pe-ap.js).
				 * @memberof pe.add
				 * @type {string}
				 */
				liblocation: document.getElementById('progressive').src.replace(/pe-ap.(dev.)?js.*$/i, ""),
                staged : [],
                /**
				 * A loading algorthim borrowed from labjs. Thank you!
				 * @memberof pe.add
				 * @function
				 * @param {string} js Path and filename of the javascript file to asynchronously load.
				 * @return {object} A reference to pe.add
				 */
				_load: function (js) {
                    var head = pe.add.head;
                    // - lets prevent double loading of dependencies
                    if ($.inArray(js, this.staged) > -1) {
						return this;
					}
                    // - now lets bind the events
                    setTimeout(function () {
                        if (head.hasOwnProperty("item")) { // check if ref is still a live node list
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
                        //head.insertBefore(scriptElem, head.firstChild);
                        if (pe.ie > 0 && pe.ie < 9) { $(scriptElem).appendTo($(head)); } else { head.insertBefore(scriptElem, head.firstChild); } // bug in IE7 and IE8 head append http://www.fraggednation.com/blog/IE7-IE8-Strikes-again-JQuery-append-workaround-494
                    }, 0);
                    this.staged[this.staged.length] = js;
                    return this;
                },
                /**
				 * Sets element attributes
				 * @memberof pe.add
				 * @function
				 * @param {DOM object} elm The element to modify.
				 * @param {string} name The name of the attribute to add or change.
				 * @param {string} value The value of the attribute.
				 * @return {object} A reference to pe.add
				 */
				set: function (elm, name, value) {
                    elm.setAttribute(name, value);
                    return this;
                },
                /**
				 * Adds a stylesheet link to the head.
				 * @memberof pe.add
				 * @function
				 * @param {string} css The path and filename of the stylesheet to add to the page.
				 * @return {object} A reference to pe.add
				 */
				css: function (css) {
                    var styleElement;
                    styleElement = document.createElement('link');
                    pe.add.set(styleElement, 'type', 'text/css').set(styleElement, 'rel', 'stylesheet').set(styleElement, 'href', css);
                    pe.add.head.appendChild(styleElement);
                    return this;
                },
                /**
				 * A completed library array.
				 * @memberof pe.add
				 * @function
				 * @param {string | string[]} d The path and filename of the dependency OR just the name (minus the path and extension).
				 * @return {string[]} NOTE: If d is a string, this returns a string array with 8 copies of the transformed string. If d is a string array, this returns a string array with just one entry; the transformed string.
				 */
				depends: function (d) {
                    var lib = pe.add.liblocation,
						c_d = $.map(d, function (a) {
							return (/^http(s)?/i.test(a)) ? a : lib + 'dependencies/' + a + '.js';
						});
                    return c_d;
                },
                /**
				 * Adds a javascript link for i18n to the head. It picks the file in pe.add.liblocation + "i18n/" whose prefix matches the page language.
				 * @memberof pe.add
				 * @function
				 * @param {string} lang The two (iso 639-1) or three (iso 639-2) letter language code of the page.
				 * @return {void}
				 */
				language: function (lang) {
                    var url = pe.add.liblocation + "i18n/" + lang.substring(0, 2) + ".js";
                    pe.add._load(url);
                },
                /**
				 * Adds a javascript link to the head.
				 * @memberof pe.add
				 * @function
				 * @param {string} js The path and filename of the javascript file OR just the name (minus the path and extension).
				 * @param {function} fn A callback to execute after the script is loaded.
				 * @return {object} A reference to pe.add
				 */
				js: function (js, fn) {
					var i;
                    js = pe.add.depends(js); // lets translate this to an array
                    for (i = 0; i < js.length; i++) {
                        if (!pe.depends.is(js[i])) {
							pe.add._load(js[i]);
						}
                    }
                    // now create the binding for dependencies
                    pe.depends.on[pe.depends.on.length] = function (index) {
                        var execute = true;
                        for (i = 0; i < js.length; i++) {
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
                /**
				 * Adds a metadata element (with given name and content attributes) to the head of the document. NOTE: Use this in conjuntion with pe.add.set if you need other attributes set.
				 * @memberof pe.add
				 * @function
				 * @param {string} name The value of the name attribute of the meta tag being created.
				 * @param {string} content The value of the content attribute of the meta tag being created.
				 * @return {object} A reference to pe.add
				 */
				meta: function (name, content) {
                    var styleElement;
                    styleElement = document.createElement('meta');
                    pe.add.set(styleElement, 'name', name).set(styleElement, 'content', content);
                    pe.add.head.appendChild(styleElement);
                    return this;
                }
            };
        }()),
        /**
		 * Follows the _init function and i18n initialization.
		 * @memberof pe
		 * @function
		 * @return {void}
		 * @todo pass an element as the context for the recursion.
		 */
		dance: function () {
            // global plugins
            var i,
				settings = (typeof wet_boew_properties !== 'undefined' && wet_boew_properties !== null) ? wet_boew_properties : false;
            // page specific plugins
            if (pe.mobile) {
                //$('#jqm-mb-location-text').text(($('#cn-bc ol li a[href]').length > 0) ? pe.dic.get('%you-are-in') + $('#cn-bc ol li').last().prev('li').text() : pe.dic.get('%welcome-to'));
                $('#jqm-mb-location-text').html($('#cn-bc').html());
            }
            $('[class^="wet-boew-"]').each(function () {
                var _fcall, _node;
                _node = $(this);
                _fcall = _node.attr("class").replace(/^wet-boew-(\S*).*/i, "$1".toLowerCase());
                if (pe.fn.hasOwnProperty(_fcall)) {
					pe._execute(pe.fn[_fcall], _node);
				}
                // lets safeguard the execution to only functions we have
            });
            // globals
            if (settings) {
                // loop throught globals adding functions
                for (i = 0; i < settings.globals.length; i++) {
                    pe._execute(pe.fn[settings.globals[i]], document);
                }
            }
            $('html').removeClass('no-js').addClass('gcwu');
			if (pe.mobile) {
				pe.add._load([pe.add.liblocation + '../jquery.mobile/jquery.mobile.min.js']);
			}
			window.onresize = function () { // TODO: find a better way to switch back and forth between mobile and desktop modes.
				if (pe.mobile !== pe.mobilecheck()) {
					window.location.href = window.location.href;
				}
            };
        }
    }; /* window binding */
    window.pe = $.extend(true, pe, _pe);
    return window.pe;
}(jQuery))._init();