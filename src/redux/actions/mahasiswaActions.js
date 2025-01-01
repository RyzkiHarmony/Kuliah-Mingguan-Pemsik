// redux/actions/mahasiswaActions.js
import axios from 'axios';
import Swal from 'sweetalert2';

export const FETCH_MAHASISWA_REQUEST = 'FETCH_MAHASISWA_REQUEST';
export const FETCH_MAHASISWA_SUCCESS = 'FETCH_MAHASISWA_SUCCESS';
export const FETCH_MAHASISWA_FAILURE = 'FETCH_MAHASISWA_FAILURE';

export const ADD_MAHASISWA_REQUEST = 'ADD_MAHASISWA_REQUEST';
export const ADD_MAHASISWA_SUCCESS = 'ADD_MAHASISWA_SUCCESS';
export const ADD_MAHASISWA_FAILURE = 'ADD_MAHASISWA_FAILURE';

export const UPDATE_MAHASISWA_REQUEST = 'UPDATE_MAHASISWA_REQUEST';
export const UPDATE_MAHASISWA_SUCCESS = 'UPDATE_MAHASISWA_SUCCESS';
export const UPDATE_MAHASISWA_FAILURE = 'UPDATE_MAHASISWA_FAILURE';

export const DELETE_MAHASISWA_REQUEST = 'DELETE_MAHASISWA_REQUEST';
export const DELETE_MAHASISWA_SUCCESS = 'DELETE_MAHASISWA_SUCCESS';
export const DELETE_MAHASISWA_FAILURE = 'DELETE_MAHASISWA_FAILURE';

export const fetchMahasiswa = (token) => async (dispatch) => {
    dispatch({ type: FETCH_MAHASISWA_REQUEST });
    try {
        const response = await axios.get('http://demo-api.syaifur.io/api/mahasiswa', {
            headers: { Authorization: `Bearer ${token}` }
        });
        dispatch({ type: FETCH_MAHASISWA_SUCCESS, payload: response.data.data });
    } catch (error) {
        dispatch({ 
            type: FETCH_MAHASISWA_FAILURE, 
            payload: error.response?.data?.message || 'Terjadi kesalahan saat mengambil data.'
        });
    }
};

export const addMahasiswa = (formData, token) => async (dispatch) => {
    dispatch({ type: ADD_MAHASISWA_REQUEST });
    try {
        const response = await axios.post(
            'http://demo-api.syaifur.io/api/mahasiswa',
            formData,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            }
        );
        dispatch({ type: ADD_MAHASISWA_SUCCESS, payload: response.data.data });
        return true;
    } catch (error) {
        dispatch({ 
            type: ADD_MAHASISWA_FAILURE, 
            payload: error.response?.data?.message || 'Terjadi kesalahan saat menambahkan data.'
        });
        return false;
    }
};

export const updateMahasiswa = (id, formData, token) => async (dispatch) => {
    dispatch({ type: UPDATE_MAHASISWA_REQUEST });
    try {
        const response = await axios.put(
            `http://demo-api.syaifur.io/api/mahasiswa/${id}`,
            formData,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            }
        );
        dispatch({ type: UPDATE_MAHASISWA_SUCCESS, payload: response.data.data });
        return true;
    } catch (error) {
        dispatch({ 
            type: UPDATE_MAHASISWA_FAILURE, 
            payload: error.response?.data?.message || 'Terjadi kesalahan saat mengedit data.'
        });
        return false;
    }
};

export const deleteMahasiswa = (id, token) => async (dispatch) => {
    dispatch({ type: DELETE_MAHASISWA_REQUEST });
    try {
        await axios.delete(`http://demo-api.syaifur.io/api/mahasiswa/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        dispatch({ type: DELETE_MAHASISWA_SUCCESS, payload: id });
        Swal.fire('Berhasil Dihapus BANG OMG!', 'Data mahasiswa telah menghilang dari lane.', 'success');
        return true;
    } catch (error) {
        dispatch({ 
            type: DELETE_MAHASISWA_FAILURE, 
            payload: error.response?.data?.message || 'Terjadi kesalahan saat menghapus data.'
        });
        Swal.fire('Gagal Jir!', 'Terjadi kesalahan saat menghapus data.', 'error');
        return false;
    }
};