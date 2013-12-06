var RemoteConfiguration = {
	Urls: {
		Base: (DEBUG ? 'http://' + window.location.hostname + '/api' : 'http://m.raco.fib.upc.edu/api'),
		Subjects: {
			subjects: '/api-v1/assignatures.json',
			Notes: {
				latestNotes: '/api-v1/avisos.json'
			}
		}
	}
};