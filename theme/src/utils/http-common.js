import axios from "axios";
import jwt from "jsonwebtoken";
import { setUserSession, removeUserSession, getToken } from "./Common";

const instance = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	headers: {
		"Content-type": "application/json",
	}
});




instance.interceptors.response.use(
	/* (res) => {
		console.log('res=:',res);
		if(res.data.status ==='error' && res.data.msg === 'toen_error'){
			refresh();
			// window.location.reload();	
		}
		else{
			setUserSession('api_token', res.data.token);
			return;
			// window.location.reload();
		}
	}, */
	(res) => res,
	(error) => {
		console.log(error.response);
		const originalConfig = error.config;
		const status = error.response ? error.response.status : null;
		console.log(status);
		if (status === 401) {

			removeUserSession('api_token');
			refresh();
			originalConfig.headers.common['x-access-token'] = getToken();
			return instance.request(originalConfig);
			// window.location.reload();

		}


		/* console.log('error=:',error);
		const status = error.response ? error.response.status : null;
		console.log("eroro");
		if (status === 401) {
			alert("4");
			removeUserSession('api_token');
			refresh();
			window.location.reload();
		}
		// status might be undefined
		if (!status) {
			alert("5");
			removeUserSession('api_token');
			refresh();
		} */
		return Promise.reject(error);
	}
);

instance.interceptors.request.use(config => {

	
	config.headers.common['x-access-token'] = getToken();
	return config;

});



function check_token_expire(token) {

	console.log('exp : ', token);
	const decodedToken = jwt.decode(token, { complete: true });
	const dateNow = new Date();
	if (decodedToken.exp < dateNow.getTime()) {
		removeUserSession('api_token');
		return refresh();
	}
	return token;

}




function refresh() {
	return new Promise((resolve, reject) => {
		const token = getToken();

		if (token === '' || token === null || token === 'null' || token === 'undefined' || token === undefined) {

			const login_data = { email: "udgeapi@gmail.com", password: "Nud@g#126" };
			instance.post(`${process.env.REACT_APP_API_URL}/api/token`, login_data).then((response) => {
				setUserSession('api_token', response.data.token);
				return resolve(response);
			}).catch((error) => {
				return reject(error);
			});
		}

		else {
			return resolve(check_token_expire(token));
		}


	});
}


export default instance;

