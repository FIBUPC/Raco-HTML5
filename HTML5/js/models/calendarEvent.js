/* 
    (c)2014 Barcelona School of Informatics. All rights reserved.

    @author: Cristian Ortega;
    @publisher: inLabFIB;
*/

define(
	[],
	function(){
		var CalendarEvent = Backbone.Model.extend({
			defaults: {
				title: null
			}
		});

		return CalendarEvent;
	}
);