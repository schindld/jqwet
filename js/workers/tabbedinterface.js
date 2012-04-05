/*
 * tabbedinterface plugin - port v1.2
 */
(function ($) {
    var _pe = window.pe || {
        fn: {}
    }; /* local reference */
    _pe.fn.tabbedinterface = {
        type: 'plugin',
        depends: ['resize', 'easytabs'],
        _exec: function (elm) {
            var $default_tab, $nav, $panels, $tabs, $this, $toggleButton, $toggleRow, cycle, opts, selectNext, selectPrev, start, stop, stopCycle, toggleCycle;
            $this = $(elm);
            opts = {
                panelActiveClass: "active",
                tabActiveClass: "active",
                defaultTab: (($this.find(".default").length) ? ".default" : "li:first-child"),
                autoHeight: ($this.hasClass("no-auto-height") ? false : true),
                cycle: ($this.hasClass("cycle-slow") ? 8000 : ($this.hasClass("cycle-fast") ? 2000 : 6000)),
                carousel: (/style-carousel/i.test($this.attr('class'))) ? true : false,
                autoPlay: ($this.hasClass("no-autoplay") ? false : true),
                animate: ($this.hasClass("animate") || $this.hasClass("animate-slow") || $this.hasClass("animate-fast") ? true : false),
                animationSpeed: ($this.hasClass("animate-slow") ? "slow" : ($this.hasClass("animate-fast") ? "fast" : "normal"))
            };
            $nav = $this.find(".tabs");
            $tabs = $nav.find("li > a");
            $panels = $this.find(".tabs-panel").children();
            $default_tab = ($nav.find(".default").length > 0 ? $nav.find(".default") : $nav.find("li:first-child"));
            $nav.attr("role", "tablist");
            $nav.find("li").each(function () {
                $(this).attr("role", "presentation");
                return $(this).children("a").each(function () {
                    return $(this).attr("role", "tab").attr("aria-selected", "false").attr("id", $(this).attr("href").substring(1) + "-link").bind("click", function (evt) {
                        $(this).parent().parent().children(".active").children("a").each(function () {
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
            $(this).bind("keydown", "ctrl+left ctrl+up", function (evt) {
                selectPrev($tabs, $panels, opts);
                if (evt.stopPropagation) {
                    return evt.stopImmediatePropagation();
                } else {
                    return evt.cancelBubble = true;
                }
            });
            $(this).bind("keydown", "ctrl+right ctrl+down", function (evt) {
                selectNext($tabs, $panels, opts);
                if (evt.stopPropagation) {
                    return evt.stopImmediatePropagation();
                } else {
                    return evt.cancelBubble = true;
                }
            });
            $nav.find("li a").bind("focus", function () {
                return $(this).click();
            });
            $nav.find("li a").bind("keydown", function (e) {
                var $current;
                if (e.keyCode === 13 || e.keyCode === 32) {
                    $current = $panels.filter(function () {
                        return $(this).is(".active");
                    });
                    $current.attr("tabindex", "0");
                    return setTimeout((function () {
                        return $current.focus();
                    }), 0);
                }
            });
            selectPrev = function ($tabs, $panels, opts, keepFocus) {
                var $current, $prev, cycleButton;
                $current = $tabs.filter(function () {
                    return $(this).is(".active");
                });
                $prev = $tabs.eq(($tabs.index($current) - 1) + $tabs.size() % $tabs.size());
                if (opts.animate) {
                    $panels.filter("." + opts.panelActiveClass).removeClass(opts.panelActiveClass).attr("aria-hidden", "true").fadeOut(opts.animationSpeed, function () {
                        return $panels.filter("#" + $next.attr("href").substr(1)).fadeIn(opts.animationSpeed, function () {
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
                var $current, $next, cycleButton;
                $current = $tabs.filter(function () {
                    return $(this).is(".active");
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
                    $toggleButton.removeClass(start["class"]).addClass(stop["class"]).html(stop["text"] + "<span class='cn-invisible'>" + stop["hidden-text"] + "</span>").attr("aria-pressed", true);
                    return $(".cn-invisible", $toggleButton).text(stop["hidden-text"]);
                } else {
                    if ($toggleRow.data("state") === "started") return stopCycle(opts);
                }
            };
            if (opts.autoHeight) {
                $panels.show();
                $(".tabs-panel", $this).equalHeights(true);
            }
            $this.easyTabs($.extend({}, opts, {
                cycle: false
            }));
            if (opts.cycle) {
                cycle = function ($tabs, $panels, opts) {
                    var $current, $pbar;
                    $current = $tabs.filter(function () {
                        return $(this).is(".active");
                    });
                    $pbar = $current.siblings(".tabs-roller");
                    $this.find(".tabs-toggle").data("state", "started");
                    return $pbar.show().animate({
                        width: $current.parent().width()
                    }, opts.cycle - 200, "linear", function () {
                        $(this).width(0).hide();
                        selectNext($tabs, $panels, opts, true);
                        return $this.data("interval", setTimeout(function () {
                            return cycle($tabs, $panels, opts);
                        }, 0));
                    });
                };
                stopCycle = function (opts) {
                    clearTimeout($this.data("interval"));
                    $this.find(".tabs-roller").width(0).hide().stop();
                    $this.find(".tabs-toggle").data("state", "stopped");
                    $toggleButton.removeClass(stop["class"]).addClass(start["class"]).html(start["text"] + "<span class='cn-invisible'>" + start["hidden-text"] + "</span>").attr("aria-pressed", false);
                    return $(".cn-invisible", $toggleButton).text(start["hidden-text"]);
                };
                // 
                // creates a play/pause, prev/next buttons, and lets the user toggle the state
                // if we are a carousel now lets add our buttons
                //Fade animation for tabs-content-pad
                var tabcontent = $this.find('.tabs-content-pad');
                //End animation
                //Create duplicate of Play/pause button to act as PREV button MB
                var $toggleRowPrev = $("<li class='tabs-toggle'>");
                var prev = {
                    "class": "tabs-prev",
                    "text": '',
                    "hidden-text": pe.dic.get('%previous')
                };
                var $toggleButtonPrev = $("<a class='" + prev["class"] + "' href='javascript:;' role='button' aria-pressed='true'>" + prev["text"] + "<span class='cn-invisible'>" + prev["hidden-text"] + "</span></a>");
                $nav.append($toggleRowPrev.append($toggleButtonPrev));
                // lets the user jump to the previous tab by clicking on the PREV button
                $toggleButtonPrev.click(function () {
                    selectPrev($tabs, $panels, opts)
                });
                //
                //End PREV button
                //Create duplicate of Play/pause button to act as NEXT button MB
                //      
                var $toggleRowNext = $("<li class='tabs-toggle'>");
                var next = {
                    "class": "tabs-next",
                    "text": '',
                    "hidden-text": pe.dic.get('%next')
                };
                var $toggleButtonNext = $("<a class='" + next["class"] + "' href='javascript:;' role='button' aria-pressed='true'>" + next["text"] + "<span class='cn-invisible'>" + next["hidden-text"] + "</span></a>");
                $nav.append($toggleRowNext.append($toggleButtonNext));
                // lets the user jump to the next tab by clicking on the NEXT button
                $toggleButtonNext.click(function () {
                    selectNext($tabs, $panels, opts)
                });
                $this.bind('mouseenter focus', function () {
                    tabcontent.stop().animate({
                        "opacity": "0.9"
                    }, "slow");
                });
                $this.bind('mouseleave blur', function () {
                    tabcontent.stop().animate({
                        "opacity": "0"
                    }, "slow");
                });
                $this.keydown(function (e) {
                    if (e.which === 37) {
                        selectPrev($tabs, $panels, opts);
                        e.preventDefault();
                    }
                    if (e.which === 39) {
                        selectNext($tabs, $panels, opts);
                        e.preventDefault();
                    }
                });
                //
                //End NEXT button
                //
                $toggleRow = $("<li class='tabs-toggle'>");
                stop = {
                    "class": "tabs-stop",
                    text: pe.dic.get('%stop'),
                    "hidden-text": pe.dic.get('%tab-rotation', 'disable')
                };
                start = {
                    "class": "tabs-start",
                    text: pe.dic.get('%play'),
                    "hidden-text": pe.dic.get('%tab-rotation', 'enable')
                };
                $toggleButton = $("<a class='" + stop["class"] + "' href='javascript:;' role='button' aria-pressed='true'>" + stop["text"] + "<span class='cn-invisible'>" + stop["hidden-text"] + "</span></a>");
                $nav.append($toggleRow.append($toggleButton));
                $toggleRow.click(toggleCycle).bind("keydown", function (e) {
                    if (e.keyCode === 32) {
                        toggleCycle();
                        return e.preventDefault();
                    }
                });
                $nav.find("li a").not($toggleRow.find("a")).click(function () {
                    return stopCycle(opts);
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
                if (!opts.autoPlay) stopCycle(opts);
            }
            $this.find("a[href^=\"#\"]").each(function () {
                var anchor, hash;
                hash = $(this).attr("href");
                if (hash.length > 1) {
                    anchor = $(hash, $panels);
                    if (anchor.length) {
                        console.log("anchor found:", anchor, ", for link:", $(this));
                        return $(this).click(function (e) {
                            var panel, panelId;
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
            return $this.attr("class", $this.attr("class").replace(/\bwidget-style-/, "style-"));
        } // end of exec
    };
    window.pe = _pe;
    return _pe;
})(jQuery);