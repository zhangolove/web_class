require('expose?$!expose?jQuery!jquery')
require("bootstrap-webpack")
require('./style.css')
import React from 'react'
import { render } from 'react-dom'

import { Provider } from 'react-redux'
import createLogger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'

import Reducer from './reducers'
import App from './components/App'
import {tryLoginAndRedirect} from './components/auth/authActions'


const store = createStore(Reducer)
tryLoginAndRedirect(store.dispatch)

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
)
