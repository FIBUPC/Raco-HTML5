/* 
    (c)2014 Barcelona School of Informatics. All rights reserved.

    @author: Cristian Ortega;
    @publisher: inLabFIB;
*/

define(
	['models/language'],
	function(Language){
		var Languages = Backbone.Collection.extend({
			model: Language,
			
			initialize: function(models, options) {
				
			}
		});

		return Languages;
	}
);