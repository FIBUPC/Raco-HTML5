/* 
    (c)2014 Barcelona School of Informatics. All rights reserved.

    @author: Cristian Ortega;
    @publisher: inLabFIB;
*/

var Helpers = {
	Environment: {
		/**
		 * Gets whether the application is currently being executed within a native package
		 **/
		isNativeApp: function() {
			// Check if Cordova declaration exists
			return typeof(window.cordova) !== 'undefined';
		},
		/**
		 * Logs a message (debug mode only)
		 **/
		log: function(message) {
			if (DEBUG && console && console.log) {
				console.log(message);
			}
		},
		/**
		 * Renders the view contents
		 **/
		showView: function (content, element) {
		    if (MobileDetector.isNativeApp() && MobileDetector.isWindows()) {
                // Adding HTML with scripts or data URI schemes is considered unsafe in Windows 8
                // Use execUnsafeLocalFunction instead
		        MSApp.execUnsafeLocalFunction(function () {
		            element.html(content);
		        });
		    }
		    else {
		    	// Append the element normally
		        element.html(content);
		    }
		},
		/**
		 * Shows a confirmation dialog asynchronously
		 **/
		showConfirmationDialogAsync: function (message, title) {
		    var deferred = $.Deferred();

		    if (MobileDetector.isNativeApp() && MobileDetector.isWindows()) {
		        var confirmationMessage = new Windows.UI.Popups.MessageDialog(message, title);
		        confirmationMessage.commands.append(new Windows.UI.Popups.UICommand(t('Yes'), function () {
		            deferred.resolve(true);
		        }));
		        confirmationMessage.commands.append(new Windows.UI.Popups.UICommand(t('No'), function () {
		            deferred.resolve(false);
		        }));
		        confirmationMessage.defaultCommandIndex = 0;
		        confirmationMessage.cancelCommandIndex = 1;
		        confirmationMessage.showAsync();
		    }
		    else if (MobileDetector.isNativeApp()) {
		        navigator.notification.confirm(message, function (result) {
		        	if (result === 1) {
		        		deferred.resolve(true);
		        	}
		        	else {
		        		deferred.resolve(false);
		        	}
		        }, title, [t('Yes'), t('No')]);
		    }
		    else {
		        setTimeout(function () {
		            var result = confirm(message);
		            deferred.resolve(result);
		        }, 0);
		    }

		    return deferred.promise();
		},
		/**
		 * Shows a dialog asynchronously
		 **/
		showDialogAsync: function (message, title) {
		    var deferred = $.Deferred();

		    if (MobileDetector.isNativeApp() && MobileDetector.isWindows()) {
		        var confirmationMessage = new Windows.UI.Popups.MessageDialog(message, title);
		        confirmationMessage.commands.append(new Windows.UI.Popups.UICommand(t('Accept'), function () {
		            deferred.resolve(true);
		        }));
		        confirmationMessage.defaultCommandIndex = 0;
		        confirmationMessage.cancelCommandIndex = 0;
		        confirmationMessage.showAsync();
		    }
		    else if (MobileDetector.isNativeApp()) {
		        navigator.notification.alert(message, function (result) {
		        	if (result === 1) {
		        		deferred.resolve(true);
		        	}
		        	else {
		        		deferred.resolve(false);
		        	}
		        }, title, [t('Accept')]);
		    }
		    else {
		        setTimeout(function () {
		            var result = confirm(message);
		            deferred.resolve(result);
		        }, 0);
		    }

		    return deferred.promise();
		},
		/**
		 * Gets the application current language
		 **/
		getApplicationLanguage: function() {
			var currentLanguage = null;
			if (MobileDetector.isWindowsPhone()) {
				currentLanguage = clientInformation.browserLanguage;
			}
			else {
				currentLanguage = navigator.language;
			}

			if (currentLanguage !== null && currentLanguage.contains('-')) {
				currentLanguage = currentLanguage.split('-')[0];
			}

			if (currentLanguage !== null && currentLanguage.contains('_')) {
				currentLanguage = currentLanguage.split('_')[0];
			}

			if (currentLanguage === null || currentLanguage === undefined) {
				currentLanguage = Constants.Application.DefaultLanguage;
			}

			return currentLanguage;
		}
	},
	Application: {
		/**
		 * Sets the current active menu element
		 **/
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
		/**
		 * Sets the active elements event handlers (for haptick feedback)
		 **/
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
		/**
		 * Transforms a string into an XML object
		 **/
		stringToXml: function(xml) {
			var xmlDoc;

			if (window.DOMParser) {
			    var parser = new DOMParser();
			  	xmlDoc = parser.parseFromString(xml, 'text/xml');
			}
			else {
				xmlDoc = new ActiveXObject('Microsoft.XMLDOM');
				xmlDoc.async = false;
				xmlDoc.loadXML(xml);
			}

			return xmlDoc;
		},
		/**
		 * Transforms an XML object into a JSON one
		 **/
		xmlToJson: function(xml) {
			// Creates the return object as empty
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
		},
		/**
		 * Replaces the new line symbols for breaklines elements (HTML only)
		 **/
		nl2br: function(html, is_xhtml) {   
		    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';    
		    return (html + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ breakTag +'$2');
		}
	}
};