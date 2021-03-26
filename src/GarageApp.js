import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store/store';
import { AppRouter } from './router/AppRouter';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';


export const GarageApp = () => {
    return (
        <Provider store={ store }>
            <AppRouter />
            <ToastContainer
                position="top-right"
                newestOnTop={ true }
                autoClose={ 4500 }
            />
        </Provider>
    )
}
