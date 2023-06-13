import callApi from '../util/apiCaller';

// Export Action Types
export const SET_USER = 'SET_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE';


// Export Actions
export function setUser(user) {
    localStorage.setItem('user', user);

    return {
        type: SET_USER,
        payload: user,
    };

}

export function setErrorMessage(msg) {
    return {
        type: SET_ERROR_MESSAGE,
        payload: msg
    };
}

export function logout() {
    
    localStorage.removeItem('user');
    return {
        type: LOGOUT_USER,
        payload: {}
    };
}

export function authUser(user) {
    return async (dispatch) => {
        try{
            const response = await callApi('login', 'post', {
                email: user.email,
                password: user.password
            });

            if(!response.success){
                dispatch(setErrorMessage(response.msg))
            }

            if (response.user) {
                dispatch(setUser(JSON.stringify(response.user)));
            }

            return response;
        }
        catch (error){
            return {success: false, msg: 'There was a problem with the authentication.'}
        }
    }
}

export function signup(user) {
    return async (dispatch) => {
        try {
            const response = await callApi('users/add', 'post', {
                fullName: user.fullName,
                username: user.username,
                email: user.email,
                password: user.password
            });

            if(!response.success){
                dispatch(setErrorMessage(response.msg))
            }

            return response;
        } 
        catch (error) {
            return {success: false, msg: 'There was a problem with the sign up process.'}
        }

    }
}