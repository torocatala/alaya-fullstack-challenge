import fetch from 'isomorphic-fetch';

export const API_URL = 'http://localhost:3000/api';

export default async (endpoint, method = 'get', body) => {

	const userInfo = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : false;
	const token	= userInfo ? 'Bearer ' + userInfo.token : userInfo

	return fetch(`${API_URL}/${endpoint}`, {
			headers: {
				'content-type': 'application/json',
				'Authorization': token
			},
			method,
			body: body instanceof FormData ? body : JSON.stringify(body),
		})
		//Parsing the response as JSON and returning an object with the JSON and response
		.then(response => response.json().then(json => ({ 
			json,
			response
		})))
		// Checking if the response is not ok and rejecting the promise if it's not
		.then(({ json, response }) => {

			if (!response.ok) {
				return json;
			}

			return json;
		})
		// Handling the resolved and rejected promises separately
		.then( response => response, error => error );
}