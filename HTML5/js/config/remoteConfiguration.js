var RemoteConfiguration = null;

if (APPLICATION) {
	// Production environment
	RemoteConfiguration = {
		Urls: {
			Base: 'https://raco.fib.upc.edu',
			LatestNotes: '/api-v1/avisos.json',
			Subjects: {
				List: '/api-v1/assignatures.json',
				Details: '/api/assignatures/info.json?codi_upc={0}',
				Notes: '/api-v1/avisos-assignatura.json?assig={0}'
			},
			Timetable: '/api-v1/horari-setmanal.json',
			News: {
				fib: 'http://www.fib.upc.edu/{0}/rss.rss',
				upc: 'http://www.upc.edu/saladepremsa/actualitat-upc/RSS?set_language={0}'
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
	RemoteConfiguration = {
		Urls: {
			Base: 'http://' + window.location.hostname + '/api',
			LatestNotes: '/api-v1/avisos.json',
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