var RemoteConfiguration = {
	Urls: {
		Base: ((DEBUG && !MobileDetector.isNativeApp()) ? 'http://' + window.location.hostname + '/api' : 'http://192.168.1.128/api'),
		Subjects: {
			subjects: "/api-v1/assignatures.json",
			Notes: {
				latestNotes: '/api-v1/avisos.json'
			}
		}
	}
};