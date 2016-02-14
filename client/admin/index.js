import ReactDOM from 'react'
import App from './App'

mountApplication = => {
  ReactDOM.render(
    (
      <div>
        <App />
      </div>
    ),
    document.getElementById('app')
  )
}

document.addEventListener('DOMContendLoaded', () => {
  mountApplication()
})
