/*jslint browser: true, devel: true, evil: true, nomen: true, plusplus: true, bitwise: true, regexp: true, sloppy: true, indent: 4, maxerr: 50 */
(function () {
	var jsdoc, source, setSource, analyseSource, log, sourceAvailable, treeAvailable, tree, node;
	//$.get( "file:///D:/Programming/wet-boew/schindld.jqwet/js/workers/tabbedinterface.js", parse, "text" );
	
	/**
	 * The jsdoc function prepares the given script for analysis. It should be called first.
	 * It accepts two parameters - the path to the script, and an array of paths to dependencies. E.G. jQeury.
	 * @param {string} url The path (absolute or relative) to the js file to analysed.
	 * @param {Array} deps An array of strings containing paths to other js files that need to be loaded before the file to be analysed.
	 * @return {void}
	 */
	jsdoc = window.jsdoc = function (url, deps) {
		var toWrite,
			i,
			idoc,
			iframe = document.createElement("iframe"); // create an <iframe> to use as a sandbox for scripts.
		iframe.style.display = "none";
		document.body.appendChild(iframe);
		toWrite = '<script>var MSIE/*@cc_on =1@*/; parent.sandbox=MSIE?this:{eval: function(s){return eval(s)} }</script>';
		for (i = 0; i < deps.length; i++) {
			toWrite += '<script src="' + deps[i] + '"></script>';
		}
		toWrite += '<script src="' + url + '"' + (url.match(/pe-ap.js/) ? ' id="progressive"' : '') + '></script>';
		iframe = frames[frames.length - 1];
		idoc = iframe.document || iframe.contentDocument || iframe.contentWindow;
		// without content, we can't modify the iframe's html element's lang attribute (at least in Firefox).
		idoc.write('.');
		// set the document's lang attribute in case we're loading pe-ap.js
		idoc.getElementsByTagName('html')[0].setAttribute('lang', 'en');
		// write scripts into the <iframe></iframe> and create the sandbox
		idoc.write(toWrite);
		idoc.close();
		// sandbox.eval() is now setup and callable!
		// Get the plain text source code for further analysis - stored in 'source' variable
		$.get(url, setSource, "text");
		// Bind listeners for custom source load events, which will be triggered later.
		$(document).bind('source-available', analyse);
		$(document).bind('tree-available', analyse);
	};
	/**
	 * Callback for ajax request for text content of the file to be analysed.
	 * Sets the variable 'source' to the text content.
	 * @private
	 * @param {string} data The text content of the fetched file.
	 * @return {void}
	 */
	setSource = function (data) {
		source = data;
		$(document).trigger('source-available');
	};
	/**
	 * Callback to handle source-available and tree-available events.
	 * Carries on processing once both source and source tree are available.
	 * @private
	 * @param {Object} e The jQuery event that was triggered.
	 * @return {void}
	 */
	analyse = function (e) {
		sourceAvailable = e.type === 'source-available' ? true : sourceAvailable;
		treeAvailable = e.type === 'tree-available' ? true : treeAvailable;
		if (!sourceAvailable || !treeAvailable) {
			return;
		}
		//console.log(source);
	};
	/**
	 * @private
	 * @return {object} Returns a new tree object
	 * @constructor
	 */
	tree = function () {
		/**
		 * @property {Array} List of child nodes.
		 */
		this.children = [];
		/**
		 * @property {function} Inserts a node into the list of children (at the end of the array).
		 */
		this.push = function (obj) {
			if (obj instanceof node) {
				this.children.push(obj);
			}
		};
	};
	/**
	 * @private
	 * @param {string} name The name of the property.
	 * @param {string} qualifiedName The fully qualified name of the property.
	 * @param {string} type The property type. Eg. Array, function, string, number, etc.
	 * @param {number} level The global object is level 0 (usually window). Globals are level 1.
	 * @param {object} parent The node's parent node or tree.
	 * @param {number} line The line number the property starts on in the source file.
	 * @param {string} comment The unparsed comment, if any, as found in the source file.
	 * @return {object} Returns a new node object.
	 * @constructor
	 */
	node = function (name, qualifiedName, type, level, parent, line, comment) {
		this.name = name;
		this.qualifiedName = qualifiedName;
		this.type = type;
		this.level = level;
		this.line = line;
		this.comment = comment;
		/**
		 * @property {Array} List of child nodes.
		 */
		this.children = [];
		/**
		 * @property {function} Inserts a node into the list of children (at the end of the array).
		 */
		this.push = function (obj) {
			if (obj instanceof node) {
				this.children.push(obj);
			}
		};
	};
	/**
	 * @private
	 * @param {string} obj The name of the object to analyse.
	 * @return {void}
	 */
	log = function (obj) {
		(function inspect(parent, depth) {
			var console = this.console || {
					log: function () {}
				},
				indent = "",
				prop,
				result,
				d,
				property;
			if (depth === 0) {
				console.log(obj);
			}
			for (d = 0; d < depth; d++) {
				indent += "\u250a  ";
			}
			for (property in parent) {
				try {
					if (parent.hasOwnProperty(property)) {
						prop = parent[property];
						switch (typeof prop) {
						case 'object':
							if (Object.prototype.toString.apply(prop) === '[object Array]') {
								console.log(indent + " \u2937." + property + " :: Array");
							} else if (typeof prop.nodeName === 'string') {
								console.log(indent + " \u2937." + property + " :: DOM object");
							} else if (property === 'window') {
								console.log(indent + " \u2937." + property + " :: " + typeof prop);
							} else if (depth < 6) {
								console.log(indent + " \u2937." + property + " :: object");
								inspect(prop, depth + 1);
							}
							break;
						case 'function':
							console.log(indent + " \u2937." + property + " :: function, returns ?");
							break;
						default:
							console.log(indent + " \u2937." + property + " :: " + typeof prop);
						}
					}
				} catch (e) {
					console.log(indent + " \u2937." + property + " :: " + typeof prop + " ERROR");
				}
			}
		}(sandbox.eval(obj), 0));
		$(document).trigger('tree-available');
	};
	/**
	 * Logs the given object's structure to console.log, if available.
	 * @param {string} obj The name of the object to analyse.
	 * @return {void}
	 */
	jsdoc.log = function (obj) {
		setTimeout(function () { log(obj); }, 2000); // delay analysis in case the script loads in dependencies.
	};
}());