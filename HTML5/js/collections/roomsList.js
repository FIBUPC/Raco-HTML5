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