/*!
 * Web Experience Toolkit (WET) / Boîte à outils de l'expérience Web (BOEW)
 * www.tbs.gc.ca/ws-nw/wet-boew/terms / www.sct.gc.ca/ws-nw/wet-boew/conditions
 */
/*
 * Zebra stripping functionality for block level elements
 */
(function($) {

    var _pe = window.pe || {fn: {} };
    /* local reference */
    _pe.fn.zebra = {
        type: 'plugin',
        _exec: function(elm) {
            var $this = $(elm);
            if ($this.is('table')) {
                var $trs = ($this.children('tr').add($this.children('tbody').children('tr'))).filter(function() {
                    return $(this).children('th').length === 0;
                });
                // note: even/odd's indices start at 0
                $trs.filter(':odd').addClass('table-even');
                $trs.filter(':even').addClass('table-odd');
                $trs.on('td', 'hover focusin focusout', function(e) {
                    e.stopPropagation();
                    $(this).closest('tr').toggleClass('table-hover');
                });
            }
            else {
                var $lis = $this.children('li');
                var parity = ($this.parents('li').length + 1) % 2;
                $lis.filter(':odd').addClass(parity === 0 ? 'list-odd' : 'list-even');
                $lis.filter(':even').addClass(parity === 1 ? 'list-odd' : 'list-even');
                $lis.on('mouseover mouseout focusin focusout', function(e) {
                    e.stopPropagation();
                    $(this).toggleClass('list-hover');
                });
            }
        } // end of exec
    };
    window.pe = _pe;
    return _pe;
})(jQuery);