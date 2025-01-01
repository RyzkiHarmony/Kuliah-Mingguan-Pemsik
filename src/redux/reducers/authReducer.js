import { 
    LOGIN_REQUEST, 
    LOGIN_SUCCESS, 
    LOGIN_FAILURE, 
    REGISTER_REQUEST, 
    REGISTER_SUCCESS, 
    REGISTER_FAILURE 
} from '../actions/authActions';

const initialState = {
    token: localStorage.getItem('authToken') || null,
    loading: false,
    error: null,
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case REGISTER_REQUEST:
            return { 
                ...state, 
                loading: true, 
                error: null 
            };

        case LOGIN_SUCCESS:
            return { 
                ...state, 
                loading: false, 
                token: action.payload, 
                error: null 
            };

        case REGISTER_SUCCESS:
            return { 
                ...state, 
                loading: false, 
                error: null 
            };

        case LOGIN_FAILURE:
        case REGISTER_FAILURE:
            return { 
                ...state, 
                loading: false, 
                error: action.payload 
            };

        default:
            return state;
    }
};
