import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ConfigProvider } from 'antd'

const router = createBrowserRouter([
  {
    index: true,
    lazy: () => import('./pages')
  },
  {
    path: '*',
    element: <div>404</div>
  }
])

export default function App() {
  return (
    <ConfigProvider>
      <RouterProvider router={router} />
    </ConfigProvider>
  )
}
