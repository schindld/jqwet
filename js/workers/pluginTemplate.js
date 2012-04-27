/*
 * Template for WET-BOEW v1.3.x plugins
 */
(function ($) {
    var _pe = window.pe || {
        fn: {}
    };
	/* local reference */
    _pe.fn.pluginName = {
        type: 'plugin',
        depends: ['easytabs', 'equalheights'],
		// Don't include a mobile function if your plugin shouldn't run in mobile mode.
		mobile: function (elm) {
			var $this;
			$this = elm;
			// If applicaple, convert html elements and attributes into the format that jQuery mobile expects.
			
			return $this;
		},
        _exec: function (elm) {
			// Don't include this if statement if your plugin shouldn't run in mobile mode.
			if (pe.mobile) {
				return _pe.fn.pluginName.mobile(elm);
			}
			var $this, opts, aVariable, anotherVariable;
			$this = elm;
			opts = {
				// This is an example from tabbedinterface, to show how to pass configuration parameters from the html element to the plugin.
				// There are some simple examples here, along with some more complicated ones.
				defaultElm: (($this.find(".default").length) ? ".default" : "li:first-child"),
				autoHeight: ($this.hasClass("auto-height-none") ? false : true),
				cycle: ($this.hasClass("cycle-slow") ? 8000 : ($this.hasClass("cycle-fast") ? 2000 : ($this.hasClass("cycle") ? 6000 : false))),
				carousel: (/style-carousel/i.test($this.attr('class'))) ? true : false,
				autoPlay: ($this.hasClass("auto-play") ? true : false),
				animate: ($this.hasClass("animate") || $this.hasClass("animate-slow") || $this.hasClass("animate-fast") ? true : false),
				animationSpeed: ($this.hasClass("animate-slow") ? "slow" : ($this.hasClass("animate-fast") ? "fast" : "normal"))
			};
			// Do plugin stuff here...
			
			return $this;
        } // end of exec
    };
    window.pe = _pe;
    return _pe;
}(jQuery));