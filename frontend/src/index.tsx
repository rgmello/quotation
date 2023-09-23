import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import AssetsList from './components/assets-list'
import AssetDetails from './components/asset-details'

const router = createBrowserRouter([
    { path: "/", element: <AssetsList /> },
    { path: "/:assetId", element: <AssetDetails /> },
])

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)
