var RemoteConfiguration = {
	Urls: {
		Base: (DEBUG ? 'http://' + window.location.hostname + '/api' : 'http://m.raco.fib.upc.edu/api/api-v1'),
		//Base: 'http://192.168.1.132/api',
		//Base: 'https://raco.fib.upc.edu',
		LatestNotes: '/api-v1/avisos.json',
		Subjects: '/api-v1/assignatures.json',
		Timetable: '/api-v1/horari-setmanal.json',
		News: {
			fib: 'http://www.fib.upc.edu/en/rss.rss',
			upc: 'http://www.upc.edu/saladepremsa/actualitat-upc/RSS?set_language=en'
		},
		Rooms: {
			freeSpots: '/aules/places-lliures.json',
			scheduling: '/aules/horari-avui.ics'
		}
	}
};