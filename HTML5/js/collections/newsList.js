/* 
    (c)2014 Barcelona School of Informatics. All rights reserved.

    @author: Cristian Ortega;
    @publisher: inLabFIB;
*/

define(
	['models/new'],
	function(New){
		var NewsList = Backbone.Collection.extend({
			model: New,
			
			initialize: function(models, options) {

			}
		});

		return NewsList;
	}
);