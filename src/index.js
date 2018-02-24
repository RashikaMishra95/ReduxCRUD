import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import allReducers from './dev/reducers/main'
import {Provider} from 'react-redux';
import App1 from './dev/components/myApp'
import thunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import * as fetchProduct from './dev/Actions/index-action';
import registerServiceWorker from './registerServiceWorker';
import {composeWithDevTools} from 'redux-devtools-extension';


const store=createStore(allReducers,composeWithDevTools(),applyMiddleware(thunk));

store.dispatch(fetchProduct.fetchProd());
store.dispatch(fetchProduct.pagination());
store.dispatch(fetchProduct.fetchCat());

ReactDOM.render(
        <Provider store={store}>{/* makes store available to Application*/}
            <App1/>
        </Provider>, document.getElementById('root'));
registerServiceWorker();
