import './hacks'

import { Provider } from 'jotai'
import React from 'react'
import ReactDOM from 'react-dom'
import 'what-input'

import App from './app'

const el = document.getElementById('app')
ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  el
)
