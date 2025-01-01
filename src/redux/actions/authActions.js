import axios from 'axios';
import Swal from 'sweetalert2';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

export const loginUser = (formData) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
        const response = await axios.post(
            'http://demo-api.syaifur.io/api/login',
            formData,
            { headers: { "Content-Type": "application/json" } }
        );

        if (response.data.code === 200) {
            const { token } = response.data.data;
            localStorage.setItem('authToken', token);
            dispatch({ type: LOGIN_SUCCESS, payload: token });
            Swal.fire({ icon: 'success', title: 'Login berhasil', text: response.data.message });
            return true;
        }
    } catch (error) {
        dispatch({
            type: LOGIN_FAILURE,
            payload: error.response?.data?.message || 'Terjadi kesalahan saat login.',
        });
        Swal.fire({ icon: 'error', title: 'Login gagal', text: error.response?.data?.message });
        return false;
    }
};

export const registerUser = (formData) => async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST });
    try {
        const response = await axios.post(
            'http://demo-api.syaifur.io/api/register',
            formData,
            { headers: { "Content-Type": "application/json" } }
        );

        if (response.data.code === 201) {
            dispatch({ type: REGISTER_SUCCESS });
            Swal.fire({ icon: 'success', title: 'Daftar berhasil', text: response.data.message });
            return true;
        }
    } catch (error) {
        dispatch({
            type: REGISTER_FAILURE,
            payload: error.response?.data?.message || 'Terjadi kesalahan saat daftar.',
        });
        Swal.fire({ icon: 'error', title: 'Daftar gagal', text: error.response?.data?.message });
        return false;
    }
};
