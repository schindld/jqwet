/*!
 * Web Experience Toolkit (WET) / Boîte à outils de l'expérience Web (BOEW)
 * www.tbs.gc.ca/ws-nw/wet-boew/terms / www.sct.gc.ca/ws-nw/wet-boew/conditions
 */
/*
----- Dictionary (il8n) ---
 */
(function ($) {
	var _pe = window.pe || {
		fn : {}
	};
	_pe.dic = {
		get : function (key, state, mixin) {
			var truthiness = (typeof key === "string" && key !== "") | // eg. 000 or 001 ie. 0 or 1
				(typeof state === "string" && state !== "") << 1 | // eg. 000 or 010 ie. 0 or 2
				(typeof mixin === "string" && mixin !== "") << 2; // eg. 000 or 100 ie. 0 or 4
			switch (truthiness) {
			case 1: // only key was provided.
				return this.ind[key];
			case 3: // key and state were provided.
				return this.ind[key][state];
			case 7: // key, state, and mixin were provided.
				return this.ind[key][state].replace('[MIXIN]', mixin);
			default:
				return "";
			}
		},
		/*
		@dictionary function : pe.dic.ago()
		@returns: a human readable time difference text
		 */
		ago : function (time_value) {
			var delta,
				parsed_date,
				r,
				relative_to;
			parsed_date = pe.date.convert(time_value);
			relative_to = (arguments.length > 1 ? arguments[1] : new Date());
			delta = parseInt((relative_to.getTime() - parsed_date) / 1000, 10);
			delta = delta + (relative_to.getTimezoneOffset() * 60);
			r = "";
			if (delta < 60) {
				r = this.get("%minute-ago");
			} else if (delta < 120) {
				r = this.get("%couple-of-minutes");
			} else if (delta < (45 * 60)) {
				r = this.get("%minutes-ago", "mixin", (parseInt(delta / 60, 10)).toString());
			} else if (delta < (90 * 60)) {
				r = this.get("%hour-ago");
			} else if (delta < (24 * 60 * 60)) {
				r = this.get("%hours-ago", "mixin", (parseInt(delta / 3600, 10)).toString());
			} else if (delta < (48 * 60 * 60)) {
				r = this.get("%yesterday");
			} else {
				r = this.get("%days-ago", "mixin", (parseInt(delta / 86400, 10)).toString());
			}
			return r;
		},
		ind : {
			"%top-of-page" : "Top of Page",
			"%you-are-in" : "You are in: ",
			"%welcome-to" : "Welcome to: " + $('#cn-site-title').text(),
			"%loading" : "loading...",
			"%archived-page" : "This Web page has been archived on the Web.",
			"%sub-menu-help" : "(open the submenu with the down arrow key)",
			"%tab-rotation" : {
				"disable" : "Stop tab rotation",
				"enable" : "Start tab rotation"
			},
			"%search" : "Search",
			"%search-for-terms" : "Search for term(s):",
			"%no-match-found" : "No match found",
			"%matches-found" : {
				"mixin" : "[MIXIN] match(es) found"
			},
			"%menu" : "Menu",
			"%play" : "Play",
			"%stop" : "Pause",
			"%close" : "Close",
			"%rewind" : "Rewind ",
			"%next" : "Next",
			"%previous" : "Previous",
			"%fast-forward" : "Fast forward ",
			"%mute" : {
				"enable" : "Mute",
				"disable" : "Unmute"
			},
			"%closed-caption" : {
				"disable" : "Hide Closed captioning",
				"enable" : "Show Closed captioning"
			},
			"%audio-description" : {
				"enable" : "Enable Audio Description",
				"disable" : "Disable Audio Description"
			},
			"%progress-bar" : "use LEFT ARROW and RIGHT ARROW keys to advance and rewind the media's progress",
			"%no-video" : "Your browser does not appear to have the capabilities to play this video, please download the video below",
			"%position" : "Current Position: ",
			"%duration" : "Total Time: ",
			"%buffered" : "Buffered: ",
			"%minute-ago" : "a minute ago",
			"%couple-of-minutes" : "couple of minutes ago",
			"%minutes-ago" : {
				"mixin" : "[MIXIN] minutes ago"
			},
			"%hour-ago" : "an hour ago",
			"%hours-ago" : {
				"mixin" : "[MIXIN] hours ago"
			},
			"%days-ago" : {
				"mixin" : "[MIXIN] days ago"
			},
			"%yesterday" : "yesterday"
		}
	};
	window.pe = _pe;
	_pe.dance();
	return _pe;
}(jQuery));
