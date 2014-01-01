var Helpers = {
	Environment: {
		isNativeApp: function() {
			// Check if Cordova declaration exists
			return typeof(window.cordova) != 'undefined';
		},
		log: function(message) {
			if (DEBUG && console && console.log) {
				console.log(message);
			}
		},
		showView: function (content, element) {
		    if (MobileDetector.isNativeApp() && MobileDetector.isWindows()) {
                // Adding HTML with scripts or data URI schemes is considered unsafe in Windows 8
		        MSApp.execUnsafeLocalFunction(function () {
		            element.html(content);
		        });
		    }
		    else {
		        element.html(content);
		    }
		}
	},
	Application: {
		setMenuActiveElement: function(element) {
			$menuElement = $(Constants.Application.MenuTabs);

			// Remove all active elements
			$menuElement.find('li').removeClass('current');

			// Find desired element and set it as active
			$targetElement = $menuElement.find(element);
			if ($targetElement.length > 0) {
				$targetElement.addClass('current');
			}
		},
		setActiveElements: function() {
			$(document.body).on('touchend', '.clickable', function(e) {
				var $self = $(this);

				$self.addClass('active');
				setTimeout(function(){
					$self.removeClass('active');
				}, 300);
			});
		}
	},
	Data: {
		stringToXml: function(xml) {
			var xmlDoc;

			if (window.DOMParser) {
				var parser = new DOMParser();
			  	xmlDoc = parser.parseFromString(xml,'text/xml');
			}
			else {
				xmlDoc = new ActiveXObject('Microsoft.XMLDOM');
				xmlDoc.async = false;
				xmlDoc.loadXML(xml);
			}

			return xmlDoc;
		},
		xmlToJson: function(xml) {
			// Create the return object as empty
			var obj = {};

			// Element
			if (xml.nodeType == 1) {
				// Do attributes
				if (xml.attributes.length > 0) {
				obj["@attributes"] = {};
					for (var j = 0; j < xml.attributes.length; j++) {
						var attribute = xml.attributes.item(j);
						obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
					}
				}
			}
			// Text or CDATA sections
			else if (xml.nodeType == 3 || xml.nodeType == 4) {
				obj = xml.nodeValue;
			}

			// Do the same for child nodes
			if (xml.hasChildNodes()) {
				for(var i = 0; i < xml.childNodes.length; i++) {
					var item = xml.childNodes.item(i);
					var nodeName = item.nodeName;
					if (typeof(obj[nodeName]) == "undefined") {
						obj[nodeName] = this.xmlToJson(item);
					} else {
						if (typeof(obj[nodeName].push) == "undefined") {
							var old = obj[nodeName];
							obj[nodeName] = [];
							obj[nodeName].push(old);
						}
						obj[nodeName].push(this.xmlToJson(item));
					}
				}
			}

			return obj;
		}
	}
};