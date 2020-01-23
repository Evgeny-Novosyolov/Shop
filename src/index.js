import React from 'react';
import ReactDOM from 'react-dom';
import './main.scss'
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './components/app';
import ErrorBoundry from './components/error-boundry';
import ProductsService from './services/products-service';
import { ProductServiceProvider } from './components/productstore-service-context';

import store, {history} from './store';

const productstoreService = new ProductsService()



ReactDOM.render(
        <Provider store={store}>
            <Router history={history}>
                <ErrorBoundry>
                    <ProductServiceProvider value={productstoreService}>
                            <App />
                    </ProductServiceProvider>
                </ErrorBoundry>
            </Router>
        </Provider>,
    document.getElementById('root')
);