define(
	[],
	function(){
		var Subject = Backbone.Model.extend({
			defaults: {
				idAssig: null,
				codi_upc: null,
				nom: null
			}
		});

		return Subject;
	}
);