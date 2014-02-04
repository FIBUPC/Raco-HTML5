/* 
    (c)2014 Barcelona School of Informatics. All rights reserved.

    @author: Cristian Ortega;
    @publisher: inLabFIB;
*/

define(
	['models/room'],
	function(Room){
		var RoomsList = Backbone.Collection.extend({
			model: Room,
			
			initialize: function(models, options) {
				
			}
		});

		return RoomsList;
	}
);