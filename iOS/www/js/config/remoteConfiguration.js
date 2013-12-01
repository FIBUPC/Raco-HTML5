var RemoteConfiguration = {
	Urls: {
		Base: (DEBUG ? 'http://' + window.location.hostname + '/api' : 'http://racomobile.azurewebsites.net/api'),
		Subjects: {
			subjects: "/api-v1/assignatures.json",
			Notes: {
				latestNotes: '/api-v1/avisos.json'
			}
		}
	}
};