import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit'; // Import configureStore
import { RouterProvider } from 'react-router-dom';
import RouteList from './RouteList.jsx';
import './index.css';

import { mahasiswaReducer } from './redux/reducers/mahasiswaReducer';
import { authReducer } from "./redux/reducers/authReducer";

const rootReducer = {
    mahasiswa: mahasiswaReducer,
    auth: authReducer,
};

const store = configureStore({
    reducer: rootReducer,
});

createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={RouteList} />
        </Provider>
    </React.StrictMode>,
)