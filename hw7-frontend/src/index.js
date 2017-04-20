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


const store = createStore(Reducer)
// const logger = createLogger()
// const store = createStore(Reducer, applyMiddleware(logger))


render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
)
