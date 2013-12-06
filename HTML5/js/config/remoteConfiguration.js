var RemoteConfiguration = {
	Urls: {
		//Base: (DEBUG ? 'http://' + window.location.hostname + '/api' : 'http://m.raco.fib.upc.edu/api'),
		Base: 'http://192.168.1.132/api',
		//Base: 'https://raco.fib.upc.edu',
		Subjects: {
			subjects: '/api-v1/assignatures.json',
			Notes: {
				latestNotes: '/api-v1/avisos.json'
			}
		}
	}
};