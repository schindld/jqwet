
(function($) {

    var _pe = window.pe || {fn: {} };
    
    _pe.fn.archived = {
        type: 'plugin',
        _exec: function(elm) {
            if (pe.mobile) return; // we do not want this on mobile devices
            // create the toolbar
            var notice = $('<div class="archived" role="toolbar"><a class="archived-top-page" href="#archived" role="link">' + pe.dic.get('%archived-page') + '</a></div>');
            // lets bind the scrolls
            $(window).on('scroll', function() {
                if ($(this).scrollTop() > 10) {
                        notice.fadeIn("normal").attr('aria-hidden', 'false');
                    } else {
                        notice.fadeOut("normal").attr('aria-hidden', 'true');
                    }
                });
                
                // now test to ensure that we have this correctly placed
            if ($(window).scrollTop() < 10 || $(window).scrollTop() === 'undefined') {
                notice.fadeOut("normal").attr('aria-hidden', 'true');
            } else {
                notice.fadeIn("normal").attr('aria-hidden', 'false');
                }
            // add to page
            pe.pagecontainer().append(notice);
        } // end of exec
    };
    window.pe = _pe;
    return _pe;
})(jQuery);


(function ($) {
    var _pe = window.pe || {
        fn: {}
    }; 
    _pe.fn.charts = {
        type: 'plugin',
        depends: ['excanvas', 'flot'],
        _exec: function (elm) {
            var $elm, cols, data, rows, _canvas, _table;
            $elm = $(elm);
            _canvas = $elm.find(".chart-canvas");
            if (!_canvas.hasClass("fixed-size")) {
                _canvas.height(Math.round(_canvas.width() / 1.61663));
            }
            _table = $(elm).find("table").eq(0);
            data = [];
            cols = rows = [];
            _table.find("thead td, thead th").each(function () {
                return cols.push($(this).text());
            });
            _table.find("tbody tr").each(function () {
                var _data;
                _data = {
                    label: "",
                    data: []
                };
                _data.label = $(this).find("th").eq(0).text();
                $(this).find("td").each(function (index) {
                    return _data.data.push([cols[index + 1], $(this).text()]);
                });
                return data.push(_data);
            });
            $.plot(_canvas, data, {
                xaxis: {
                    tickDecimals: 0
                }
            });
        } // end of exec
    };
    window.pe = _pe;
    return _pe;
})(jQuery);


(function ($) {
    var _pe = window.pe || {
        fn: {}
    }; 
    _pe.fn.mathlib = {
        type: 'plugin',
        support: (function () {
            var hasMathML = false;
            if (document.createElementNS) {
                var ns = "http://www.w3.org/1998/Math/MathML",
                    div = document.createElement("div");
                div.style.position = "absolute";
                div.style.color = "#fff";
                var mfrac = div.appendChild(document.createElementNS(ns, "math")).appendChild(document.createElementNS(ns, "mfrac"));
                mfrac.appendChild(document.createElementNS(ns, "mi")).appendChild(document.createTextNode("xx"));
                mfrac.appendChild(document.createElementNS(ns, "mi")).appendChild(document.createTextNode("yy"));
                document.body.appendChild(div);
                hasMathML = div.offsetHeight > div.offsetWidth;
                div.style.display = "none";
            }
            return hasMathML;
        })(),
        _exec: function (elm) {
            if (pe.mobile || pe.fn.mathlib.support ) return; // we do not want this on mobile devices or Mathml capable browsers
            pe.add._load('http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML');
        } // end of exec
    };
    window.pe = _pe;
    return _pe;
})(jQuery);


(function ($) {
	var _pe = window.pe || {
		fn : {}
	};
	
	_pe.fn.menubar = {
		type : 'plugin',
		depends : ['resize', 'equalheights', 'hoverintent', 'outside'],
		_exec : function (elm) {
			
			
			var $bcLinks,
				$menu,
				$menuBoundary,
				$results,
				$scope,
				$vbrumbs,
				correctheight,
				gotosubmenu,
				hideallsubmenus,
				hidesubmenu,
				i,
				match,
				showsubmenu;
			$scope = $(elm);
			
			showsubmenu = function (toplink) {
				var _node,
					_sm;
				_node = $(toplink).closest("li");
				_node.addClass("mb-active");
				hideallsubmenus();
				_sm = _node.find(".mb-sm");
				_sm.attr("aria-expanded", "true").attr("aria-hidden", "false").toggleClass("mb-sm mb-sm-open");
				if ((Math.floor(_sm.offset().left + _sm.width()) - Math.floor($menuBoundary.offset().left + $menuBoundary.width())) >= -1) {
					_sm.css("right", "0px");
				}
				return;
			};
			
			gotosubmenu = function (toplink) {
				var _node,
					_submenu;
				showsubmenu(toplink);
				_node = $(toplink);
				_submenu = _node.closest("li").find(".mb-sm-open");
				pe.focus(_submenu.find("a[href]:first"));
				return;
			};
			
			hidesubmenu = function (toplink) {
				var _node,
					_sm;
				_node = $(toplink);
				_sm = _node.closest("li").removeClass("mb-active").find(".mb-sm-open");
				_sm.attr("aria-expanded", "false").attr("aria-hidden", "true").toggleClass("mb-sm mb-sm-open").css("right", "auto");
				return;
			};
			
			hideallsubmenus = function () {
				$menu.find(".mb-sm-open").each(function () {
					var _menu;
					_menu = $(this).closest("li");
					return hidesubmenu(_menu);
				});
				return;
			};
			
			correctheight = function () {
				var newouterheight,
					_lastmenuli;
				_lastmenuli = $menu.children("li:last");
				newouterheight = (_lastmenuli.offset().top + _lastmenuli.outerHeight()) - $scope.offset().top;
				return $scope.css("min-height", newouterheight);
			};
			
			
			$menuBoundary = $scope.children("div");
			$menu = $menuBoundary.children("ul");
			
			$scope.attr("role", "application");
			$menu.attr("role", "menubar");
			
			if (pe.cssenabled) {
				$menu.find("a").attr("tabindex", "-1").attr("role", "menuitem");
				$menu.find("li:first a:first").removeAttr("tabindex");
			}
			pe.resize(correctheight);
			
			$scope.on("focusoutside", function () {
				return hideallsubmenus();
			});
			$(document).on("click", function () {
				$scope.trigger("focusoutside");
			});
			$scope.on("keydown focus section-next section-previous item-next item-previous close", "li", function (e) {
				var next,
					_elm,
					_id,
					level;
				_elm = $(e.target);
				_id = $.map(/\bknav-(\d+)-(\d+)-(\d+)/.exec(_elm.attr('class')), function (n) {
					return parseInt(n, 10);
				});
				if (e.type === "keydown") {
					if (!(e.ctrlKey || e.altKey || e.metaKey)) {
						switch (e.keyCode) {
						case 27: // escape key
							_elm.trigger('close');
							e.preventDefault();
							return false;
						case 37: // left arrow
							_elm.trigger('section-previous');
							e.preventDefault();
							return false;
						case 38: // up arrow
							_elm.trigger('item-previous');
							e.preventDefault();
							return false;
						case 39: // right arrow
							_elm.trigger('section-next');
							e.preventDefault();
							return false;
						case 40: // down arrow
							_elm.trigger('item-next');
							e.preventDefault();
							return false;
						}
					}
				}
				if (e.type === "close") {
					pe.focus($scope.find(".knav-" + _id[1] + "-0-0"));
					//if (!_id[2] && !_id[3]) {
					setTimeout(function () {
						return hideallsubmenus();
					}, 5);
					//}
				}
				if (e.type === "section-previous") {
					level = !!_id[2] << 1 | !!_id[3];
					switch (level) {
					case 0: // top-level menu link has focus
					case 1: // 3rd level menu link has focus, but the popup menu doesn't have sub-sections
						next = $scope.find(".knav-" + (_id[1] - 1) + "-0-0");
						if (next.length > 0) {
							pe.focus(next);
						} else {
							pe.focus($scope.find('ul.mb-menu > li:last').find('a:eq(0)')); // wrap around at the top level
						}
						break;
					case 2: // sub-section link has focus
					case 3: // 3rd level link (child of a sub-section) has focus
						next = $scope.find(".knav-" + (_id[1]) + "-" + (_id[2] - 1) + "-0");
						if (next.length > 0 && _id[2] > 1) {
							pe.focus(next);
						} else {
							next = $scope.find(".knav-" + (_id[1] - 1) + "-0-0"); // wrap around at the sub-section level
							if (next.length > 0) {
								pe.focus(next);
							} else {
								pe.focus($scope.find('ul.mb-menu > li:last').find('a:eq(0)')); // wrap around at the top level
							}
						}
						break;
					}
				}
				if (e.type === "section-next") {
					level = !!_id[2] << 1 | !!_id[3];
					switch (level) {
					case 0: // top-level menu link has focus
					case 1: // 3rd level menu link has focus, but the popup menu doesn't have sub-sections
						next = $scope.find(".knav-" + (_id[1] + 1) + "-0-0");
						if (next.length > 0) {
							pe.focus(next);
						} else {
							pe.focus($scope.find(".knav-0-0-0")); // wrap around at the top level
						}
						break;
					case 2: // sub-section link has focus
					case 3: // 3rd level link (child of a sub-section) has focus
						next = $scope.find(".knav-" + (_id[1]) + "-" + (_id[2] + 1) + "-0");
						if (next.length > 0) {
							pe.focus(next);
						} else {
							next = $scope.find(".knav-" + (_id[1] + 1) + "-0-0"); // wrap around at the sub-section level
							if (next.length > 0) {
								pe.focus(next);
							} else {
								pe.focus($scope.find(".knav-0-0-0")); // wrap around at the top level
							}
						}
						break;
					}
				}
				if (e.type === "item-next") {
					next = $scope.find(".knav-" + _id[1] + "-" + (_id[2]) + "-" + (_id[3] + 1)); // move to 3rd level
					if (next.length > 0) {
						pe.focus(next);
					} else {
						next = $scope.find(".knav-" + _id[1] + "-" + (_id[2] + 1) + "-0"); // move to 2nd level
						if (next.length > 0) {
							pe.focus(next);
						} else {
							pe.focus($scope.find(".knav-" + _id[1] + "-0-0")); // move to 1st level
						}
					}
				}
				if (e.type === "item-previous") {
					next = $scope.find(".knav-" + _id[1] + "-" + (_id[2]) + "-" + (_id[3] - 1)); // move to 3rd level
					if (next.length > 0) {
						pe.focus(next);
					} else {
						next = $scope.find(".knav-" + _id[1] + "-" + (_id[2] - 1) + "-0"); // move to 2nd level
						if (next.length > 0) {
							pe.focus(next);
						} else {
							pe.focus($scope.find(".knav-" + _id[1] + "-0-0")); // move to 1st level
						}
					}
				}
				if (e.type === "focusin" && _id[2] === 0 && _id[3] === 0) {
					hideallsubmenus();
					if (_elm.find('.expandicon').length > 0) {
						showsubmenu(e.target);
					}
					return;
				}
			});
			
			$scope.find('ul.mb-menu > li').find('a:eq(0)').each(function (index, value) {
				var $childmenu,
					$elm;
				$elm = $(value);
				$elm.addClass("knav-" + index + "-0-0");
				$childmenu = $elm.closest("li").find(".mb-sm");
				if ($childmenu.size() > 0) {
					$elm.attr("aria-haspopup", "true").addClass("mb-has-sm").wrapInner("<span class=\"expandicon\"><span class=\"sublink\"></span></span>");
					$childmenu.attr("role", "menu").attr("aria-expanded", "false").attr("aria-hidden", "true").find(":has(:header) ul").attr("role", "menu");
					$elm.append("<span class=\"cn-invisible\">" + (pe.dic.get('%sub-menu-help')) + "</span>");
					$elm.closest("li").hoverIntent(function () {
						return showsubmenu(this);
					}, function () {
						return hidesubmenu(this);
					});
					
					$childmenu.find("h4 a").each(function (i) {
						$(this).addClass("knav-" + index + "-" + (i + 1) + "-0");
						$(this).parent().next("ul").find("a").each(function (j) {
							$(this).addClass("knav-" + index + "-" + (i + 1) + "-" + (j + 1));
							return;
						});
						return;
					});
					$childmenu.find("ul").not(function () {
						return ($(this).prev("h4").length ? true : false);
					}).find("a").each(function (i) {
						$(this).addClass("knav-" + index + "-0-" + (i + 1));
					});
				}
			});
			
			$vbrumbs = $("#cn-bc, #cn-bcrumb");
			if ($vbrumbs.size() > 0 && !$scope.hasClass("page-match-off")) {
				$results = $menu.children("li").find("a[href=\"" + window.location.pathname + "\"]");
				if ($results.size() > 0) {
					$results.eq(0).addClass("nav-current");
				} else {
					match = false;
					$bcLinks = $vbrumbs.find("li a:not([href^=\"#\"])");
					if ($bcLinks.size() > 0) {
						i = 0;
						while (i <= $bcLinks.size()) {
							$results = $menu.children("li").find("a[href=\"" + $bcLinks.eq(i).attr("href") + "\"]");
							if ($results.size() > 0) {
								$results.eq(0).addClass("nav-current");
								match = true;
								break;
							}
							i++;
						}
					}
					if (!match) {
						$results = $menu.children("li").find("a:contains(\"" + $vbrumbs.find("li:last-child").text() + "\")");
						if ($results.size() > 0) {
							$results.eq(0).addClass("nav-current");
						}
					}
				}
			}
			correctheight();
			return $scope;
		} // end of exec
	};
	window.pe = _pe;
	return _pe;
}
	(jQuery));


(function ($) {
	var _pe = window.pe || {
		fn: {}
	};
	
	_pe.fn.pluginName = {
		type: 'plugin',
		// This is an example from tabbed interface, to show how to call required libraries
		depends: ['easytabs', 'equalheights'],
		// Don't include a mobile function if your plugin shouldn't run in mobile mode.
		mobile: function (elm) {
			// If applicaple, convert html elements and attributes into the format that jQuery mobile expects.
			return elm;
		},
		_exec: function (elm) {
			// Don't include this if statement if your plugin shouldn't run in mobile mode.
			if (pe.mobile) {
				return _pe.fn.pluginName.mobile(elm);
			}
			var opts, aVariable, anotherVariable;
			opts = {
				// This is an example from tabbedinterface, to show how to pass configuration parameters from the html element to the plugin.
				// There are some simple examples here, along with some more complicated ones.
				defaultElm: ((elm.find(".default").length) ? ".default" : "li:first-child"),
				autoHeight: (elm.hasClass("auto-height-none") ? false : true),
				cycle: (elm.hasClass("cycle-slow") ? 8000 : (elm.hasClass("cycle-fast") ? 2000 : (elm.hasClass("cycle") ? 6000 : false))),
				carousel: (/style-carousel/i.test(elm.attr('class'))) ? true : false,
				autoPlay: (elm.hasClass("auto-play") ? true : false),
				animate: (elm.hasClass("animate") || elm.hasClass("animate-slow") || elm.hasClass("animate-fast") ? true : false),
				animationSpeed: (elm.hasClass("animate-slow") ? "slow" : (elm.hasClass("animate-fast") ? "fast" : "normal"))
			};
			// Do plugin stuff here...
			return elm;
		} // end of exec
	};
	window.pe = _pe;
	return _pe;
}(jQuery));


(function ($) {
    var _pe = window.pe || {
        fn: {}
    }; 
    _pe.fn.searchtermhighlight = {
        type: 'plugin',
        _exec: function (elm) {
            var $this = $(elm),
            settings = {
                 termlength : pe.parameter('minlength',$this) || 3,
                 passed: pe.url(document.location).param || ""
                };
            //console.log('minlength :: ' + pe.parameter('minlength',$this));
            // console.log('limit :: ' + pe.parameter('limit',$this));
            //  console.log('unknown :: ' + pe.parameter('unknown',$this));
            //var dictionary = {
            //    label: (PE.language == "eng") ? 'Search for term(s):' : 'Recherche de terme(s):',
            //    noMatch: (PE.language == "eng") ? 'No match found' : 'Aucune correspondance trouvée',
            //    oneMatch: (PE.language == "eng") ? '1 match found' : '1 correspondance trouvée',
            //    multiMatch: (PE.language == "eng") ? ' matches found' : ' correspondances trouvées'
            //}
            var terms = (typeof passed === "string" ) ? settings.passed : settings.passed.terms ;
            form = $('<form class="wet-boew-termSearch"><label for="term">' + pe.dic.get('%search-for-terms') + '</label> <input type="text" id="term" name="term" value="' + terms + '" role="textbox" aria-multiline="false" />&#160;<span class="matches-found" role="status" aria-live="polite" aria-relevant="additions text"></span></form>');
            $elm.before(form);
            // Event handling
            form.on("change keypress click", "input", function (event) {
                setTimeout(function () {
                    var terms = $(event.delegateTarget).find("input[type=text]").attr("value");
                    var target = $(event.delegateTarget).next();
                    if (terms.length >= settings.minLength) {
                        clearHighlightedTerms(target);
                        highlightTerms(terms, target, settings);
                    } else {
                        clearHighlightedTerms(target);
                    }
                }, 50);
            })
            //Prevents the form from submitting
            form.submit(function () {
                return false;
            });
            $elm.bind("searchComplete", function (event, matchesCount) {
                var message;
                if (matchesCount < 1) {
                    message = dictionary.noMatch
                } else if (matchesCount === 1) {
                    message = dictionary.oneMatch
                } else {
                    message = matchesCount + dictionary.multiMatch
                }
                $(event.target).prev().find(".matches-found").text(message);
            });
            //Initialize with query parameter
            if (terms.length >= settings.minLength) highlightTerms(terms, $(this), settings);


            function highlightTerms(searchTerms, target, settings) {
                var matches = 0;
                var searchTerms = searchTerms.replace(/^\s+|\s+$/g, '');
                searchTerms = searchTerms.replace(/\|+/g, ''); // don't let them use the | symbol
                // --------------------------------------------------------------------------------------------
                // Split the data into an array so that we can exclude anything smaller than the minimum length
                var arrTerms = searchTerms.split(' ');
                if (arrTerms.length > 0) {
                    var searchTerms = '';
                    for (i = 0; i < arrTerms.length; i++) {
                        if (arrTerms[i].length >= settings.minLength) {
                            searchTerms += arrTerms[i] + " ";
                        }
                    }
                    searchTerms = searchTerms.replace(/^\s+|\s+$|\"|\(|\)/g, '');
                }
                searchTerms = searchTerms.replace(/\s+/g, '|'); // OR each value
                searchTerms = "(?=([^>]*<))([\\s'])?(" + searchTerms + ")(?!>)"; // Make sure that we're not checking for terms within a tag; only the text outside of tags.
                // --------------------------------------------------------------------------------------------
                var newText = target.html().replace(new RegExp(searchTerms, "gi"), function (match, grp1, grp2, grp3) {
                    matches++;
                    return grp2 + '<span class="wet-boew-highlight-term">' + grp3 + '</span>';
                });
                target.trigger("searchComplete", [matches])
                target.html(newText);
                return null;
            }; // end of highlightTerms


            function clearHighlightedTerms(target) {
                target.find('span.wet-boew-highlight-term').each(function () {
                    var text = $(this).text();
                    $(this).replaceWith(text);
                });
                target.prev().find(".matches-found").text("");
            }; // end of clearHighlightedTerms
            return this;
        } // end of exec
    };
    window.pe = _pe;
    return _pe;
})(jQuery);


(function ($) {
	var _pe = window.pe || {
		fn : {}
	};
	
	_pe.fn.tabbedinterface = {
		type : 'plugin',
		depends : ['easytabs', 'equalheights'],
		mobile : function (elm) {
			var $tabs,
				$panels,
				$accordion,
				i,
				$collapsible;
			// Convert html elements and attributes into the format the jQuery mobile accordian plugin expects.
			// Get the content out of the html structure tabbedinterface usually expects.
			$tabs = elm.find(".tabs li > a");
			$panels = elm.find(".tabs-panel").children();
			// Create the accordion structure to move the content to.
			$accordion = $('<div data-role="collapsible-set"/>');
			for (i = 0; i < $tabs.length; i++) {
				$collapsible = $('<div data-role="collapsible" data-theme="b" data-content-theme="b"/>');
				$collapsible.append('<h1>' + $tabs.eq(i).text() + '</h1>');
				$collapsible.append($panels.eq(i).html());
				if ($tabs.eq(i).parent().hasClass('default')) {
					$collapsible.attr('data-collapsed', 'false');
				}
				$accordion.append($collapsible);
			}
			elm.replaceWith($accordion);
			return elm;
		},
		_exec : function (elm) {
			if (pe.mobile) {
				return _pe.fn.tabbedinterface.mobile(elm);
			}
			var $default_tab,
				$nav,
				$panels,
				$tabs,
				$toggleButton,
				$toggleRow,
				cycle,
				opts,
				selectNext,
				selectPrev,
				start,
				stop,
				stopCycle,
				toggleCycle,
				$toggleRowPrev,
				$toggleRowNext,
				$toggleButtonPrev,
				$toggleButtonNext,
				prev,
				next;
			opts = {
				panelActiveClass : "active",
				tabActiveClass : "active",
				defaultTab : ((elm.find(".default").length) ? ".default" : "li:first-child"),
				autoHeight : (elm.hasClass("auto-height-none") ? false : true),
				cycle : (elm.hasClass("cycle-slow") ? 8000 : (elm.hasClass("cycle-fast") ? 2000 : (elm.hasClass("cycle") ? 6000 : false))),
				carousel : (/style-carousel/i.test(elm.attr('class'))) ? true : false,
				autoPlay : (elm.hasClass("auto-play") ? true : false),
				animate : (elm.hasClass("animate") || elm.hasClass("animate-slow") || elm.hasClass("animate-fast") ? true : false),
				animationSpeed : (elm.hasClass("animate-slow") ? "slow" : (elm.hasClass("animate-fast") ? "fast" : "normal"))
			};
			$nav = elm.find(".tabs");
			$tabs = $nav.find("li > a");
			$panels = elm.find(".tabs-panel").children();
			$default_tab = ($nav.find(".default").length > 0 ? $nav.find(".default") : $nav.find("li:first-child"));
			$nav.attr("role", "tablist");
			$nav.find("li").each(function () {
				$(this).attr("role", "presentation");
				return $(this).children("a").each(function () {
					return $(this).attr("role", "tab").attr("aria-selected", "false").attr("id", $(this).attr("href").substring(1) + "-link").bind("click", function () {
						$(this).parent().parent().children("." + opts.tabActiveClass).children("a").each(function () {
							$(this).attr("aria-selected", "false");
							return $("#" + $(this).attr("href").substring(1)).attr("aria-hidden", "true");
						});
						$(this).attr("aria-selected", "true");
						return $("#" + $(this).attr("href").substring(1)).attr("aria-hidden", "false");
					});
				});
			});
			$panels.each(function () {
				return $(this).attr("role", "tabpanel").attr("aria-hidden", "true").attr("aria-labelledby", $("a[href*=\"#" + $(this).attr("id") + "\"]").attr("id"));
			});
			$default_tab.children("a").each(function () {
				$(this).attr("aria-selected", "true");
				return $("#" + $(this).attr("href").substring(1)).attr("aria-hidden", "false");
			});
			$nav.find("li a").bind("focus", function () {
				return $(this).click();
			});
			$nav.find("li a").keyup(function (e) {
				if (e.keyCode === 13 || e.keyCode === 32) {
					var $current = $panels.filter(function () {
							return $(this).is("." + opts.tabActiveClass);
						});
					$current.attr("tabindex", "0");
					if (e.stopPropagation) {
						e.stopImmediatePropagation();
					} else {
						e.cancelBubble = true;
					}
					return setTimeout(function () {
						return $current.focus();
					}, 0);
				}
			});
			selectPrev = function ($tabs, $panels, opts, keepFocus) {
				var $current,
					$prev,
					cycleButton;
				$current = $tabs.filter(function () {
					return $(this).is("." + opts.tabActiveClass);
				});
				$prev = $tabs.eq(($tabs.index($current) - 1) + $tabs.size() % $tabs.size());
				if (opts.animate) {
					$panels.filter("." + opts.panelActiveClass).removeClass(opts.panelActiveClass).attr("aria-hidden", "true").fadeOut(opts.animationSpeed, function () {
						return $panels.filter("#" + $prev.attr("href").substr(1)).fadeIn(opts.animationSpeed, function () {
							return $(this).addClass(opts.panelActiveClass).attr("aria-hidden", "false");
						});
					});
				} else {
					$panels.removeClass(opts.panelActiveClass).attr("aria-hidden", "true").hide();
					$panels.filter("#" + $prev.attr("href").substr(1)).show().addClass(opts.panelActiveClass).attr("aria-hidden", "false");
				}
				$tabs.parent().removeClass(opts.tabActiveClass).children().removeClass(opts.tabActiveClass).filter("a").attr("aria-selected", "false");
				$prev.parent().addClass(opts.tabActiveClass).children().addClass(opts.tabActiveClass).filter("a").attr("aria-selected", "true");
				cycleButton = $current.parent().siblings(".tabs-toggle");
				if (!keepFocus && (cycleButton.length === 0 || cycleButton.data("state") === "stopped")) {
					return $prev.focus();
				}
			};
			selectNext = function ($tabs, $panels, opts, keepFocus) {
				var $current,
					$next,
					cycleButton;
				$current = $tabs.filter(function () {
					return $(this).is("." + opts.tabActiveClass);
				});
				$next = $tabs.eq(($tabs.index($current) + 1) % $tabs.size());
				if (opts.animate) {
					$panels.filter("." + opts.panelActiveClass).removeClass(opts.panelActiveClass).attr("aria-hidden", "true").fadeOut(opts.animationSpeed, function () {
						return $panels.filter("#" + $next.attr("href").substr(1)).fadeIn(opts.animationSpeed, function () {
							return $(this).addClass(opts.panelActiveClass).attr("aria-hidden", "false");
						});
					});
				} else {
					$panels.removeClass(opts.panelActiveClass).attr("aria-hidden", "true").hide();
					$panels.filter("#" + $next.attr("href").substr(1)).show().addClass(opts.panelActiveClass).attr("aria-hidden", "false");
				}
				$tabs.parent().removeClass(opts.tabActiveClass).children().removeClass(opts.tabActiveClass).filter("a").attr("aria-selected", "false");
				$next.parent().addClass(opts.tabActiveClass).children().addClass(opts.tabActiveClass).filter("a").attr("aria-selected", "true");
				cycleButton = $current.parent().siblings(".tabs-toggle");
				if (!keepFocus && (cycleButton.length === 0 || cycleButton.data("state") === "stopped")) {
					return $next.focus();
				}
			};
			toggleCycle = function () {
				if ($toggleRow.data("state") === "stopped") {
					selectNext($tabs, $panels, opts, true);
					cycle($tabs, $panels, opts);
					$toggleButton.removeClass(start["class"]).addClass(stop["class"]).html(stop.text + "<span class='cn-invisible'>" + stop["hidden-text"] + "</span>").attr("aria-pressed", true);
					return $(".cn-invisible", $toggleButton).text(stop["hidden-text"]);
				} else {
					if ($toggleRow.data("state") === "started") {
						return stopCycle();
					}
				}
			};
			if (opts.autoHeight) {
				$panels.show();
				$(".tabs-panel", elm).equalHeights(true);
			}
			elm.easytabs($.extend({}, opts, {
				cycle : false
			}));
			if (opts.cycle) {
				cycle = function ($tabs, $panels, opts) {
					var $current,
						$pbar;
					$current = $tabs.filter(function () {
						return $(this).is("." + opts.tabActiveClass);
					});
					$pbar = $current.siblings(".tabs-roller");
					elm.find(".tabs-toggle").data("state", "started");
					return $pbar.show().animate({
						width : $current.parent().width()
					}, opts.cycle - 200, "linear", function () {
						$(this).width(0).hide();
						selectNext($tabs, $panels, opts, true);
						return elm.data("interval", setTimeout(function () {
							return cycle($tabs, $panels, opts);
						}, 0));
					});
				};
				stopCycle = function () {
					clearTimeout(elm.data("interval"));
					elm.find(".tabs-roller").width(0).hide().stop();
					elm.find(".tabs-toggle").data("state", "stopped");
					$toggleButton.removeClass(stop["class"]).addClass(start["class"]).html(start.text + "<span class='cn-invisible'>" + start["hidden-text"] + "</span>").attr("aria-pressed", false);
					return $(".cn-invisible", $toggleButton).text(start["hidden-text"]);
				};
				//
				// creates a play/pause, prev/next buttons, and lets the user toggle the stateact as PREV button MB
				$toggleRowPrev = $("<li class='tabs-toggle'>");
				prev = {
					"class" : "tabs-prev",
					"text" : '&nbsp;&nbsp;&nbsp;',
					"hidden-text" : pe.dic.get('%previous')
				};
				$toggleButtonPrev = $("<a class='" + prev["class"] + "' href='javascript:;' role='button' aria-pressed='true'>" + prev.text + "<span class='cn-invisible'>" + prev["hidden-text"] + "</span></a>");
				$nav.append($toggleRowPrev.append($toggleButtonPrev));
				// lets the user jump to the previous tab by clicking on the PREV button
				$toggleButtonPrev.click(function () {
					selectPrev($tabs, $panels, opts);
				});
				//
				//End PREV button
				//Create duplicate of Play/pause button to act as NEXT button MB
				//
				$toggleRowNext = $("<li class='tabs-toggle'>");
				next = {
					"class" : "tabs-next",
					"text" : '&nbsp;&nbsp;&nbsp;',
					"hidden-text" : pe.dic.get('%next')
				};
				$toggleButtonNext = $("<a class='" + next["class"] + "' href='javascript:;' role='button' aria-pressed='true'>" + next.text + "<span class='cn-invisible'>" + next["hidden-text"] + "</span></a>");
				$nav.append($toggleRowNext.append($toggleButtonNext));
				// lets the user jump to the next tab by clicking on the NEXT button
				$toggleButtonNext.click(function () {
					selectNext($tabs, $panels, opts);
				});
				//End animation
				elm.keydown(function (e) {
					if (e.which === 37 || e.which === 39) {
						selectPrev($tabs, $panels, opts);
						e.preventDefault();
					}
				});
				//
				//End NEXT button
				//
				$toggleRow = $("<li class='tabs-toggle'>");
				stop = {
					"class" : "tabs-stop",
					text : pe.dic.get('%stop'),
					"hidden-text" : pe.dic.get('%tab-rotation', 'disable')
				};
				start = {
					"class" : "tabs-start",
					text : pe.dic.get('%play'),
					"hidden-text" : pe.dic.get('%tab-rotation', 'enable')
				};
				$toggleButton = $("<a class='" + stop["class"] + "' href='javascript:;' role='button' aria-pressed='true'>" + stop.text + "<span class='cn-invisible'>" + stop["hidden-text"] + "</span></a>");
				$nav.append($toggleRow.append($toggleButton));
				$toggleRow.click(toggleCycle).bind("keydown", function (e) {
					if (e.keyCode === 32) {
						toggleCycle();
						return e.preventDefault();
					}
				});
				$nav.find("li a").not($toggleRow.find("a")).click(function () {
					return stopCycle();
				});
				$tabs.each(function () {
					var $pbar;
					$pbar = $("<div class=\"tabs-roller\">").hide().click(function () {
						return $(this).siblings("a").click();
					}).hover(function () {
						return $(this).css("cursor", "text");
					});
					if ($.browser.msie && $.browser.version < 8) {
						$(".tabs-style-2 .tabs, .tabs-style-2 .tabs li").css("filter", "");
					}
					return $(this).parent().append($pbar);
				});
				cycle($tabs, $panels, opts);
				if (!opts.autoPlay) {
					stopCycle();
				}
			}
			elm.find("a[href^=\"#\"]").each(function () {
				var anchor,
					hash;
				hash = $(this).attr("href");
				if (hash.length > 1) {
					anchor = $(hash, $panels);
					if (anchor.length) {
						//console.log("anchor found:", anchor, ", for link:", $(this));
						return $(this).click(function (e) {
							var panel,
								panelId;
							panel = anchor.parents("[role=\"tabpanel\"]:hidden");
							if (panel) {
								e.preventDefault();
								panelId = panel.attr("id");
								panel.parent().siblings(".tabs").find("a[href=\"#" + panelId + "\"]").click();
								return anchor.get(0).scrollIntoView(true);
							}
						});
					}
				}
			});
			return elm.attr("class", elm.attr("class").replace(/\bwidget-style-/, "style-"));
		} // end of exec
	};
	window.pe = _pe;
	return _pe;
}
	(jQuery));


(function ($) {
    var _pe = window.pe || {
        fn: {}
    }; 
    _pe.fn.toolbar = {
        scope: 'plugin',
        _exec: function (elm) {
            // cache a variable pointer for performance benefits since we are binding to a window event
            var tb = $('<div class="wet-boew-toolbar" role="toolbar"><ul><li class="toolbar-top-page"> <a href="#cn-tphp" role="link">' + pe.dic.get('%top-of-page') + '</a> </li></ul></div>');
            // discover which element we need, with a fallback to body tag
            $('#cn-body-inner-3col, #cn-body-inner-2col, #cn-body-inner-1col').add('body').first().append(tb);
            tb.hide();
            // bind methods to the window
            $(window).bind('scroll', function () {
                if ($(this).scrollTop() > 10) {
                    tb.fadeIn("normal").attr('aria-hidden', 'false');
                } else {
                    tb.fadeOut("normal").attr('aria-hidden', 'true');
                }
            });
            // now test to ensure that we have this correctly placed
            if ($(window).scrollTop() < 10 || $(window).scrollTop() === 'undefined') {
                tb.fadeOut("normal").attr('aria-hidden', 'true');
            } else {
                tb.fadeIn("normal").attr('aria-hidden', 'false');
            }
        }
    };
    window.pe = $.extend(true, window.pe, _pe);
    return window.pe;
})(jQuery);


(function($) {

    var _pe = window.pe || {fn: {} };
    
    _pe.fn.webwidget = {
        type: 'plugin',
        twitter: {
          _parse_entries: function(entries, limit, elm) {
            var cap, i, result, sorted;
            cap = (limit > 0 && limit < entries.length ? limit : entries.length);
            sorted = entries.sort(function(a, b) {
              return pe.date.compare(b.created_at.replace("+0000 ", "") + " GMT", a.created_at.replace("+0000 ", "") + " GMT");
            });
            result = "<ul class=\"widget-content\">";
            i = 0;
            while (i < cap) {
              result += "<li><a class=\"float-left\" href=\"http://www.twitter.com/";
              result += sorted[i].user.name + "/status/" + sorted[i].user.id + "\">" + "<img class=\"widget-avatar\" src=\"" + sorted[i].user.profile_image_url + "\" /></a> ";
              result += pe.string.ify.clean(sorted[i].text);
              result += " <span class=\"widget-datestamp-accent\">" + pe.dic.ago(sorted[i].created_at) + "</span></li>";
              i++;
            }
            result += "</ul>";
            return elm.replaceWith(result);
          },
          _json_request: function(url) {
            if (url.toLowerCase().indexOf("!/search/") > -1) {
              return url.replace("http://", "https://").replace(/https:\/\/twitter.com\/#!\/search\/(.+$)/, function(str, p1, offset, s) {
                return "http://search.twitter.com/search.json?q=" + encodeURI(decodeURI(p1));
              });
            }
            return url.replace("http://", "https://").replace(/https:\/\/twitter.com\/#!\/(.+$)/i, function(str, p1, offset, s) {
              return "http://twitter.com/status/user_timeline/" + encodeURI(decodeURI(p1)) + ".json?callback=?";
            });
          },
          exec: function(urls, limit, elm) {
            var entries, i, last, parse_entries, _results;
            last = urls.length - 1;
            entries = [];
            parse_entries = this._parse_entries;
            i = urls.length - 1;
            _results = [];
            while (i >= 0) {
              $.getJSON(this._json_request(urls[i]), function(data) {
                var k;
                k = 0;
                while (k < data.length) {
                  entries.push(data[k]);
                  k++;
                }
                if (!last) parse_entries(entries, limit, elm);
                return last--;
              });
              _results.push(i--);
            }
            return _results;
          }
        },
        weather: {
          _parse_entries: function(entries, limit, elm) {
            var result;
            result = "<ul class=\"widget-content\">";
            result += "<li><a href=\"" + entries[1].link + "\">" + entries[1].title + "</a><span class=\"widget-datestamp\">[" + pe.date.to_iso_format(entries[1].publishedDate, true) + "]</span></li>";
            result += "</ul>";
            return elm.replaceWith(result);
          },
          exec: function(urls, limit, elm) {
            var entries, i, last, parse_entries, _results;
            last = urls.length - 1;
            entries = [];
            parse_entries = this._parse_entries;
            i = urls.length - 1;
            _results = [];
            while (i >= 0) {
              $.getJSON(this._json_request(urls[i]), function(data) {
                var k;
                k = 0;
                while (k < data.responseData.feed.entries.length) {
                  entries.push(data.responseData.feed.entries[k]);
                  k++;
                }
                if (!last) parse_entries(entries, limit, elm);
                return last--;
              });
              _results.push(i--);
            }
            return _results;
          },
          _json_request: function(url, limit) {
            var rl;
            url = url.replace(/^.*?\.gc\.ca\/([a-z]+).+\/(.*?)_[a-z]+_([ef])\.html/i, "http://www.weatheroffice.gc.ca/rss/$1/$2_$3.xml");
            rl = "http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&callback=?&q=" + encodeURI(decodeURI(url));
            if (limit > 0) rl += "&num=" + limit;
            return rl;
          }
        },
        rss: {
          _parse_entries: function(entries, limit, elm) {
            var cap, i, result, sorted;
            cap = (limit > 0 && limit < entries.length ? limit : entries.length);
            sorted = entries.sort(function(a, b) {
              return pe.date.compare(b.publishedDate, a.publishedDate);
            });
            result = "<ul class=\"widget-content\">";
            i = 0;
            while (i < cap) {
              result += "<li><a href=\"" + sorted[i].link + "\">" + sorted[i].title + "</a><span class=\"widget-datestamp\">[" + pe.date.to_iso_format(sorted[i].publishedDate, true) + "]</span></li>";
              i++;
            }
            result += "</ul>";
            return elm.replaceWith(result);
          },
          exec: function(urls, limit, elm) {
            var entries, i, last, parse_entries, _results;
            last = urls.length - 1;
            entries = [];
            parse_entries = this._parse_entries;
            i = urls.length - 1;
            _results = [];
            while (i >= 0) {
              $.getJSON(this._json_request(urls[i]), function(data) {
                var k;
                k = 0;
                while (k < data.responseData.feed.entries.length) {
                  entries.push(data.responseData.feed.entries[k]);
                  k++;
                }
                if (!last) parse_entries(entries, limit, elm);
                return last--;
              });
              _results.push(i--);
            }
            return _results;
          },
          _json_request: function(url, limit) {
            var rl;
            rl = "http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&callback=?&q=" + encodeURI(decodeURI(url));
            if (limit > 0) rl += "&num=" + limit;
            return rl;
          }
        },
        _exec: function(elm, type) {
          var $elm, $response, feeds, limit;
          $elm = $(elm);
          limit = pe.limit($elm);
          feeds = $elm.find("a").map(function() {
            var a;
            a = $(this).attr("href");
            if (!type && /twitter.com/i.test(a)) type = "twitter";
            if (!type && /weatheroffice.gc.ca/i.test(a)) type = "weather";
            if (!type) type = "rss";
            return $(this).attr("href");
          });
          $response = $("<ul class=\"widget-content\"><li class=\"widget-state-loading\"><img src=\"" + pe.add.liblocation + "/images/ajax-loader.gif" + "\" /><span class=\"cn-invisible\">" + pe.dic.get('%loading') + "</span></li></ul>");
          $elm.find(".widget-content").replaceWith($response);
          $.extend({}, _pe.fn.webwidget[type]).exec(feeds, limit, $response);
          return;
        } // end of exec
    };
    window.pe = _pe;
    return window.pe;
})(jQuery);
 

(function ($) {
	var _pe = window.pe || {
		fn : {}
	};
	
	_pe.fn.zebra = {
		type : 'plugin',
		_exec : function (elm) {
			var $trs,
				$lis,
				parity;
			if (elm.is('table')) {
				$trs = (elm.children('tr').add(elm.children('tbody').children('tr'))).filter(function () {
					return $(this).children('th').length === 0;
				});
				// note: even/odd's indices start at 0
				$trs.filter(':odd').addClass('table-even');
				$trs.filter(':even').addClass('table-odd');
				$trs.on('td', 'hover focusin focusout', function (e) {
					e.stopPropagation();
					$(this).closest('tr').toggleClass('table-hover');
				});
			} else {
				$lis = elm.children('li');
				parity = (elm.parents('li').length + 1) % 2;
				$lis.filter(':odd').addClass(parity === 0 ? 'list-odd' : 'list-even');
				$lis.filter(':even').addClass(parity === 1 ? 'list-odd' : 'list-even');
				$lis.on('mouseover mouseout focusin focusout', function (e) {
					e.stopPropagation();
					$(this).toggleClass('list-hover');
				});
			}
		} // end of exec
	};
	window.pe = _pe;
	return _pe;
}(jQuery));
