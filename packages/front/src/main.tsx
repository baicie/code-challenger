import 'allotment/dist/style.css'
import { message } from 'antd'
import React from 'react'
import ReactDOM from 'react-dom/client'
import 'reflect-metadata'
import App from './App'
import { registerGlobalModules } from './di'
import './index.css'
import { init } from './node'

registerGlobalModules()

init()
  .then(() => {
    message.success('WebContainer booted')
  })
  .catch((err) => message.error(err.message))

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
