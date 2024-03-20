import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { WebContainer } from '@webcontainer/api'
import { files } from './file.ts'

export let webcontainerInstance: WebContainer | undefined

window.addEventListener('load', async () => {
  webcontainerInstance = await WebContainer.boot()

  await webcontainerInstance.mount(files)
  const exitCode = await installDependencies()
  if (exitCode !== 0) {
    throw new Error('Installation failed')
  }
  startDevServer()
})

async function installDependencies() {
  // Install dependencies
  const installProcess = await webcontainerInstance!.spawn('npm', ['install'])
  installProcess.output.pipeTo(
    new WritableStream({
      write(data) {
        console.log(data)
      }
    })
  )
  // Wait for install command to exit
  return installProcess.exit
}

async function startDevServer() {
  // Run `npm run start` to start the Express app
  await webcontainerInstance!.spawn('npm', ['run', 'start'])

  // Wait for `server-ready` event
  webcontainerInstance!.on('server-ready', (port, url) => {
    // iframeEl.src = url
    console.log(`Server is live at ${url}`)
  })
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
