import {
    FETCH_MAHASISWA_REQUEST,
    FETCH_MAHASISWA_SUCCESS,
    FETCH_MAHASISWA_FAILURE,
    ADD_MAHASISWA_REQUEST,
    ADD_MAHASISWA_SUCCESS,
    ADD_MAHASISWA_FAILURE,
    UPDATE_MAHASISWA_REQUEST,
    UPDATE_MAHASISWA_SUCCESS,
    UPDATE_MAHASISWA_FAILURE,
    DELETE_MAHASISWA_REQUEST,
    DELETE_MAHASISWA_SUCCESS,
    DELETE_MAHASISWA_FAILURE
} from '../actions/mahasiswaActions';

const initialState = {
    data: [],
    loading: false,
    error: null
};

export const mahasiswaReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_MAHASISWA_REQUEST:
        case ADD_MAHASISWA_REQUEST:
        case UPDATE_MAHASISWA_REQUEST:
        case DELETE_MAHASISWA_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };

        case FETCH_MAHASISWA_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null
            };

        case ADD_MAHASISWA_SUCCESS:
            return {
                ...state,
                loading: false,
                data: [...state.data, action.payload],
                error: null
            };

        case UPDATE_MAHASISWA_SUCCESS:
            return {
                ...state,
                loading: false,
                data: state.data.map(item => 
                    item.id === action.payload.id ? action.payload : item
                ),
                error: null
            };

        case DELETE_MAHASISWA_SUCCESS:
            return {
                ...state,
                loading: false,
                data: state.data.filter(item => item.id !== action.payload),
                error: null
            };

        case FETCH_MAHASISWA_FAILURE:
        case ADD_MAHASISWA_FAILURE:
        case UPDATE_MAHASISWA_FAILURE:
        case DELETE_MAHASISWA_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        default:
            return state;
    }
};