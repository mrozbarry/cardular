import App from './App'
import React from 'react'
import ReactDOM from 'react-dom'

const mountGame = (props, dom) => {
  require('./styles/index.css')

  props = props || {}
  ReactDOM.render(
    <App {...props} />,
    dom
  )
}

document.addEventListener('DOMContentLoaded', () => {
  const container = document.createElement('div')
  document.body.appendChild(container)
  mountGame({
    sets: [
      "/assets/sets/demo"
    ]
  }, container)
})
