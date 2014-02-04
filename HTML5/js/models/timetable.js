/* 
    (c)2014 Barcelona School of Informatics. All rights reserved.

    @author: Cristian Ortega;
    @publisher: inLabFIB;
*/

define(
	[],
	function(){
		var Timetable = Backbone.Model.extend({
			defaults: {
				classes: null
			}
		});

		return Timetable;
	}
);