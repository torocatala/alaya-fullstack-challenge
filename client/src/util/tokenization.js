import jwt_decode from 'jwt-decode';

// Function to check if a token is expired
// Return - A promise resolved with a Boolean
export const isTokenExpired = () => {
	const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : false;

	if (token) {
		const jwtExpiracy = jwt_decode(token);
		return Promise.resolve(Date.now() >= jwtExpiracy.exp * 1000);
	} else {
		return Promise.resolve(true);
	}
};