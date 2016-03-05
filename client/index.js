import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

const firebaseConf = require('../firebase.json')

const mountRouter = (props, dom) => {
  props = props || {}
  ReactDOM.render(
    <App {...props} />,
    dom
  )
}

document.addEventListener('DOMContentLoaded', () => {
  const container = document.createElement('div')
  document.body.appendChild(container)

  mountRouter({
    config: firebaseConf
  }, container)
})
