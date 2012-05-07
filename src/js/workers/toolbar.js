/*!
 * Web Experience Toolkit (WET) / Boîte à outils de l'expérience Web (BOEW)
 * www.tbs.gc.ca/ws-nw/wet-boew/terms / www.sct.gc.ca/ws-nw/wet-boew/conditions
 */
/*
 * Zebra stripping functionality for block level elements
 */
(function ($) {
    var _pe = window.pe || {
        fn: {}
    }; /* local reference */
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