import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import { BrowserRouter as Router, Route } from 'react-router-dom'

import store from './redux/store/store';

import App from './App';
import './index.css';

// ReactDOM.render(<Provider store={store}><BrowserRouter><App/></BrowserRouter></Provider>, document.getElementById('root'));


ReactDOM.render(
    <Provider store={store}>
        <Router >
          <Route path="/" component={App} />
        </Router>
    </Provider>, document.getElementById('root'));
