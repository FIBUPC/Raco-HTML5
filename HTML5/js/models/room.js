/* 
    (c)2014 Barcelona School of Informatics. All rights reserved.

    @author: Cristian Ortega;
    @publisher: inLabFIB;
*/

define(
	[],
	function(){
		var Room = Backbone.Model.extend({
			defaults: {
				nom: null,
				places: 0
			},
			idAttribute: "nom",
			currentEvent: function() {
				if (!_.isEmpty(this.get('timetable'))) {
					return _.find(this.get('timetable'), function(event) {
						return moment().isAfter(moment(event.dtstart)) && moment().isBefore(moment(event.dtend));
					});
				}
				else {
					return undefined;
				}
			}
		});

		return Room;
	}
);