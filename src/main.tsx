import React from 'react'
import ReactDOM from 'react-dom/client'
import {
    createBrowserRouter,
    RouterProvider
} from 'react-router-dom'
import './global.css'
import Index from './pages/index/Index.tsx'
import Details from './pages/details/Details.tsx'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Index />
    },
    {
        path: 'page/:page',
        element: <Details />
    }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
