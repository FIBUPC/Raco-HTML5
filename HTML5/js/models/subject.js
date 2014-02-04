/* 
    (c)2014 Barcelona School of Informatics. All rights reserved.

    @author: Cristian Ortega;
    @publisher: inLabFIB;
*/

define(
	[],
	function(){
		var Subject = Backbone.Model.extend({
			defaults: {
				idAssig: null,
				codi_upc: null,
				nom: null,
				notes: null,
				info: null
			},
			idAttribute: 'codi_upc'
		});

		return Subject;
	}
);