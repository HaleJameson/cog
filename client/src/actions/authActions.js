import {AUTH} from '../constants/actionTypes';
import * as api from '../api/authApi';


export const login = (formData, history) => async (dispatch) => {
    try {
        // log in the user
        const {data} = await api.loginUser(formData);

        dispatch({ type: AUTH, data});

        history.push('/');
    }
    catch (err) {
        console.log(err);
    }
}

export const register = (formData, history) => async (dispatch) => {
    try {
        // register the user
        const {data} = await api.registerUser(formData);

        dispatch({ type: AUTH, data});
        history.push('/');
    }
    catch (err) {
        console.log(err);
    }
}