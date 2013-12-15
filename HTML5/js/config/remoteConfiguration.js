var RemoteConfiguration = {
	Urls: {
		Base: (DEBUG ? 'http://' + window.location.hostname + '/api' : 'http://m.raco.fib.upc.edu/api/api-v1'),
		//Base: 'http://192.168.1.132/api',
		//Base: 'https://raco.fib.upc.edu',
		LatestNotes: '/api-v1/avisos.json',
		Subjects: '/api-v1/assignatures.json',
		Timetable: '/api-v1/horari-setmanal.json',
		News: {
			//fib: 'http://www.fib.upc.edu/fib/rss.rss',
			//upc: 'http://www.upc.edu/saladepremsa/actualitat-upc/RSS?set_language=ca'
			fib: 'http://' + window.location.hostname + '/api/api/fib.rss',
			upc: 'http://' + window.location.hostname + '/api/api/upc.rss.xml'
		},
		Rooms: {
			freeSpots: '/aules/places-lliures.json',
			scheduling: '/aules/horari-avui.ics'
		}
	}
};