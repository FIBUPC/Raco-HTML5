if (!String.prototype.endsWith) {
	String.prototype.endsWith = function(suffix) {
	    return this.indexOf(suffix, this.length - suffix.length) !== -1;
	};
}

if (!String.prototype.format) {
  	String.prototype.format = function(format) {
    	var args = Array.prototype.slice.call(arguments, 1);
    	return this.replace(/{(\d+)}/g, function(match, number) { 
      		return typeof args[number] != 'undefined' ? args[number] : match;
    	});
  	};
}

if (!String.prototype.contains) {
	String.prototype.contains = function(c, s) {
		return s.indexOf(c) !== -1;
	};
}