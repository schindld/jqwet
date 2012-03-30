/*
 * Zebra stripping functionality for block level elements
 */
(function ($) {
    
    var _pe = window.pe || {fn: {} };
    
    /* local reference */
    _pe.fn.menubar = {
        type: 'plugin',
        depends: ['resize', 'equalheights', 'hoverintent', 'outside'],
        _exec: function (elm) {
            
/*
          @notes: the mega menu will use custom events to better manage its events.
          .: Events :.
          - close : this will close open menu
          - reset : this will clear all the menu's to closed state
          - open : this will open the child menu item
          */
/* bind plugin scope element
          */
            var $bcLinks, $menu, $menuBoundary, $results, $scope, $vbrumbs, correctheight, gotosubmenu, hideallsubmenus, hidesubmenu, i, match, showsubmenu, type;
            $scope = $(elm);
/* functions that would be nessecary for helpers
          */
            showsubmenu = function (toplink) {
                var _node, _sm;
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
                var _node, _submenu;
                showsubmenu(toplink);
                _node = $(toplink);
                _submenu = _node.closest("li").find(".mb-sm-open");
                pe.focus(_subMenu.find("a[href]:first"));
                return;
            };
/* hidemenu worker function
          */
            hidesubmenu = function (toplink) {
                var _node, _sm;
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
                var newouterheight, _lastmenuli;
                _lastmenuli = $menu.children("li:last");
                newouterheight = (_lastmenuli.offset().top + _lastmenuli.outerHeight()) - $scope.offset().top;
                return $scope.css("min-height", newouterheight);
            };
          /*
           /// End of Functions ///
          */
         /* define the menu type
          */
            type = {
                megamenu: $scope.hasClass("mb-megamenu"),
                hsubmenu: $scope.hasClass("mb-hsubmenu")
            };
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
            $scope.on("keydown focus section-next section-previous item-next item-previous close", "li", function (e) {
                var next, _elm, _id;
                _elm = $(e.target);
                _id = $.map(/\bknav-(\d+)-(\d+)/.exec(_elm.attr('class')), function (n, i) {
                    return parseInt(n);
                });
                if (e.type === "keydown") {
                    if (!(e.ctrlKey || e.altKey || e.metaKey)) {
                        switch (e.keyCode) {
                        case 27:
                            _elm.trigger('close');
                            break;
                        case 37:
                            _elm.trigger('section-previous');
                            false;
                            break;
                        case 38:
                            _elm.trigger('item-previous');
                            false;
                            break;
                        case 39:
                            _elm.trigger('section-next');
                            false;
                            break;
                        case 40:
                            _elm.trigger('item-next');
                            false;
                        }
                    }
                }
                if (e.type === "close") {
                    pe.focus($scope.find(".knav-" + _id[1] + "-0"));
                    hideallsubmenus();
                }
                if (e.type === "section-previous") {
                    next = $scope.find(".knav-" + (_id[1] - 1) + "-0");
                    if (next.length > 0) {
                        pe.focus(next);
                    } else {
                        pe.focus($scope.find('ul.mb-menu > li:last').find('a:eq(0)'));
                    }
                }
                if (e.type === "section-next") {
                    next = $scope.find(".knav-" + (_id[1] + 1) + "-0");
                    if (next.length > 0) {
                        pe.focus(next);
                    } else {
                        pe.focus($scope.find(".knav-0-0"));
                    }
                }
                if (e.type === "item-next") {
                    next = $scope.find(".knav-" + _id[1] + "-" + (_id[2] + 1));
                    if (next.length > 0) {
                        pe.focus(next);
                    } else {
                        pe.focus($scope.find(".knav-" + _id[1] + "-1"));
                    }
                }
                if (e.type === "item-previous") {
                    next = $scope.find(".knav-" + _id[1] + "-" + (_id[2] - 1));
                    if (next.length > 0) {
                        pe.focus(next);
                    } else {
                        pe.focus($scope.find(".knav-" + _id[1] + "-0"));
                    }
                }
                if (e.type === "focusin" && _id[2] === 0) {
                    hideallsubmenus();
                    if (_elm.find('.expandicon').length > 0) showsubmenu(e.target);
                    return;
                }
            });
/* [Main] parse mega menu and establish all ARIA and Navigation classes
          */
            $scope.find('ul.mb-menu > li').find('a:eq(0)').each(function (index, value) {
                var $childmenu, $elm;
                $elm = $(value);
                $elm.addClass("knav-" + index + "-0");
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
                    $childmenu.find("a").each(function (i, v) {
                        $(this).addClass("knav-" + index + "-" + (i + 1));
                        return;
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
                            i++;
                        }
                    }
                    if (!match) {
                        $results = $menu.children("li").find("a:contains(\"" + $vbrumbs.find("li:last-child").text() + "\")");
                        if ($results.size() > 0) $results.eq(0).addClass("nav-current");
                    }
                }
            }
            correctheight();
            return $scope;
        } // end of exec
    };
    window.pe = _pe;
    return _pe;
})(jQuery);