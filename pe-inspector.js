(function inspect(parent, depth) {
	var console = this.console ? this.console : {
			log: function() {}
		},
		indent = "",
		prop,
		result;
	if (depth === 0) {
		console.log("pe");
	}
	for (var d = 0; d < depth; d++) {
		indent += "\u250a  ";
	}
	for (property in parent) {
		if (parent.hasOwnProperty(property)) {
			prop = parent[property];
			switch (typeof prop) {
			case 'object':
				if (Object.prototype.toString.apply(prop) === '[object Array]') {
					console.log(indent + " \u2937." + property + " :: Array");
				} else if (typeof prop.nodeName === 'string') {
					console.log(indent + " \u2937." + property + " :: DOM object");
				} else if (depth < 3) {
					console.log(indent + " \u2937." + property + " :: object");
					inspect(prop, depth + 1);
				}
				break;
			case 'function':
				if (prop.length === 0) {
					result = prop();
					switch (typeof result) {
					case 'undefined':
						console.log(indent + " \u2937." + property + " :: function, returns void");
						break;
					default:
						if (typeof result.jquery === 'string') {
							console.log(indent + " \u2937." + property + " :: function, returns jQuery object");
						} else if (typeof result.nodeName === 'string') {
							console.log(indent + " \u2937." + property + " :: function, returns DOM object");
						} else {
							console.log(indent + " \u2937." + property + " :: function, returns " + typeof result);
						}
					}
				} else {
					console.log(indent + " \u2937." + property + " :: function, returns ?");
				}
				break;
			default:
				console.log(indent + " \u2937." + property + " :: " + typeof prop);
			}
		}
	}
	return true;
}(pe, 0));
