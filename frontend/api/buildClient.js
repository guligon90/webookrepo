import axios from 'axios';

const buildClient = ({ req }) => {
	if (typeof window === 'undefined') {
		// We're on the server. Request should be made by
		// using the namespace pattern or external name service.
		return axios.create({
			baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
			headers: req.headers
		});
	} else {
		// We're on the browser. Request should be made
		// with a base URL of ''
		return axios.create({
			baseURL: '/'
		});
	}
};

export default buildClient;
