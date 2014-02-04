/* 
    (c)2014 Barcelona School of Informatics. All rights reserved.

    @author: Cristian Ortega;
    @publisher: inLabFIB;
*/

define(
	['models/action'],
	function(Action){
		var Actions = Backbone.Collection.extend({
			model: Action,
			
			initialize: function(models, options) {
				
			}
		});

		return Actions;
	}
);