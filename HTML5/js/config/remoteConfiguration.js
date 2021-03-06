/* 
    (c)2014 Barcelona School of Informatics. All rights reserved.

    @author: Cristian Ortega;
    @publisher: inLabFIB;
*/

var RemoteConfiguration = {
	Urls: {
	    Base: 'https://raco.fib.upc.edu',
		LatestNotes: '/api-v1/avisos.json',
		MarkNoteAsRead: '/api-v1/marcar-llegit?id={0}',
		Attachment: '/api-v1/attachment?assig={0}&d_id_attachment={1}&attachment_name={2}',
		Subjects: {
			List: '/api-v1/assignatures.json',
		    Details: '/api/assignatures/info.json?codi_upc={0}',
		    Notes: '/api-v1/avisos-assignatura.json?assig={0}'
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
		},
		CurrentUser: {
			Data: '/api-v1/info-personal.json',
			Image: '/api-v1/foto-personal.jpg?cache=false'
		}
	}
};