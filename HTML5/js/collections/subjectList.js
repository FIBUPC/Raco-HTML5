/* 
    (c)2014 Barcelona School of Informatics. All rights reserved.

    @author: Cristian Ortega;
    @publisher: inLabFIB;
*/

define(
	['models/subject'],
	function(Subject){
		var SubjectList = Backbone.Collection.extend({
			model: Subject,
			
			initialize: function(models, options) {
				
			}
		});

		return SubjectList;
	}
);