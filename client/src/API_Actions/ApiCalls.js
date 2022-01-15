import axios from 'axios';

export const registerUser = async (username, email, password, dispatch) => {
    const data = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
    };
    dispatch({ type: 'LOGIN_START' });
    try {
        const res = await axios.post('/auth/register', data);
        console.log(res.data);
        dispatch({ type: 'LOGIN_SUCCESS', payload: res.data.user });
    } catch (error) {
        console.log(error);
        dispatch({ type: 'LOGIN_FAILURE' });
    }
};
