/*!
 * Web Experience Toolkit (WET) / Boîte à outils de l'expérience Web (BOEW)
 * www.tbs.gc.ca/ws-nw/wet-boew/terms / www.sct.gc.ca/ws-nw/wet-boew/conditions
 */
 /*
  * Menu bar plugin
  */
/*global jQuery: false, pe:false */
(function ($) {
	var _pe = window.pe || {
		fn : {}
	};
	/* local reference */
	_pe.fn.menubar = {
		type : 'plugin',
		depends : ['resize', 'equalheights', 'hoverintent', 'outside'],
		_exec : function (elm) {
			/*
			@notes: the mega menu will use custom events to better manage its events.
			.: Events :.
			- close : this will close open menu
			- reset : this will clear all the menu's to closed state
			- open : this will open the child menu item
			 */
			/* bind plugin scope element
			 */
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
			/* functions that would be nessecary for helpers
			 */
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
			/* action function to go to menu
			 */
			gotosubmenu = function (toplink) {
				var _node,
					_submenu;
				showsubmenu(toplink);
				_node = $(toplink);
				_submenu = _node.closest("li").find(".mb-sm-open");
				pe.focus(_submenu.find("a[href]:first"));
				return;
			};
			/* hidemenu worker function
			 */
			hidesubmenu = function (toplink) {
				var _node,
					_sm;
				_node = $(toplink);
				_sm = _node.closest("li").removeClass("mb-active").find(".mb-sm-open");
				_sm.attr("aria-expanded", "false").attr("aria-hidden", "true").toggleClass("mb-sm mb-sm-open").css("right", "auto");
				return;
			};
			/* hide all the submenus
			 */
			hideallsubmenus = function () {
				$menu.find(".mb-sm-open").each(function () {
					var _menu;
					_menu = $(this).closest("li");
					return hidesubmenu(_menu);
				});
				return;
			};
			/* function to correct the hieght of the menu on resize
			 */
			correctheight = function () {
				var newouterheight,
					_lastmenuli;
				_lastmenuli = $menu.children("li:last");
				newouterheight = (_lastmenuli.offset().top + _lastmenuli.outerHeight()) - $scope.offset().top;
				return $scope.css("min-height", newouterheight);
			};
			/*
			/// End of Functions ///
			 */
			/* establish bounderies
			 */
			$menuBoundary = $scope.children("div");
			$menu = $menuBoundary.children("ul");
			/* ARIA additions
			 */
			$scope.attr("role", "application");
			$menu.attr("role", "menubar");
			/* if CSS is enabled we want to ensure a correct tabbing response
			 */
			if (pe.cssenabled) {
				$menu.find("a").attr("tabindex", "-1").attr("role", "menuitem");
				$menu.find("li:first a:first").removeAttr("tabindex");
			}
			pe.resize(correctheight);
			/* bind all custom events and triggers to menu
			 */
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
			/* [Main] parse mega menu and establish all ARIA and Navigation classes
			 */
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
					/* now recurse all focusable to be able to navigate
					 */
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
			/*
			Breadcrumb indexer
			 */
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
							i += 1;
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
