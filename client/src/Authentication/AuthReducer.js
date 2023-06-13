import { SET_USER, SET_ERROR_MESSAGE, LOGOUT_USER } from "./AuthActions";

const initialState = {
	user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
	token: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null,
	error: null,
};

const AuthReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_USER:
			return {
				...state,
				user: action.payload
			};
		case SET_ERROR_MESSAGE:
			return {
				error: action.payload
			};
		case LOGOUT_USER:
			return {
				user: action.payload
			};
		default:
			return state;
	}
};

export default AuthReducer;