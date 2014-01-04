var RemoteConfiguration = null;

if (APPLICATION) {
	// Production environment
	RemoteConfiguration = {
		Urls: {
		    //Base: 'https://raco.fib.upc.edu',
            Base: 'http://192.168.1.129/api',
			LatestNotes: '/api-v1/avisos.json',
			MarkNoteAsRead: '/api-v1/marcar-llegit?id={0}',
			Attachment: '/api-v1/attachment?assig={0}&d_id_attachment={1}&attachment_name={2}',
			Subjects: {
				List: '/api-v1/assignatures.json',
			    //Details: '/api/assignatures/info.json?codi_upc={0}',
				Details: '/api/assignatures/info-{0}.json',
			    //Notes: '/api-v1/avisos-assignatura.json?assig={0}'
				Notes: '/api-v1/avisos-assignatura-{0}.json'
			},
			Timetable: '/api-v1/horari-setmanal.json',
			News: {
				Fib: 'http://www.fib.upc.edu/{0}/rss.rss',
				Upc: 'http://www.upc.edu/saladepremsa/actualitat-upc/RSS?set_language={0}'
			},
			Rooms: {
				FreeSpots: '/api/aules/places-lliures.json',
				Scheduling: '/api/aules/horari-avui.ics',
				Map: 'http://www.fib.upc.edu/poa/mapa.php?mod={0}'
			}
		}
	};
}
else {
	// Test environment (used to test from the default phone browser)
	if (!window.location.hostname) {
		window.location.hostname = '192.168.1.132';
	}
	
	RemoteConfiguration = {
		Urls: {
			Base: 'http://' + window.location.hostname + '/api',
			LatestNotes: '/api-v1/avisos.json',
			Attachment: '/api-v1/attachment?assig={0}&d_id_attachment={1}&attachment_name={2}',
			MarkNoteAsRead: '/api-v1/marcar-llegit?id={0}',
			Subjects: {
				List: '/api-v1/assignatures.json',
				Details: '/api/assignatures/info-{0}.json',
				Notes: '/api-v1/avisos-assignatura-{0}.json'
			},
			Timetable: '/api-v1/horari-setmanal.json',
			News: {
				Fib: 'http://' + window.location.hostname + '/api/api/fib.rss',
				Upc: 'http://' + window.location.hostname + '/api/api/upc.rss.xml'
			},
			Rooms: {
				FreeSpots: '/api/aules/places-lliures.json',
				Scheduling: '/api/aules/horari-avui.ics',
				Map: 'http://' + window.location.hostname + '/api/api/mapa-{0}.png'
			}
		}
	};
}