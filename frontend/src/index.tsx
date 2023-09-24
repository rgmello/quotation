import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom'
import './index.css'
import AssetsList from './components/assets-list'
import AssetDetails from './components/asset-details'
import ErrorPage from './error-page'
import Root from './root'
import axios from 'axios'
import { Asset } from './types'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                loader: async () => redirect('/assets')
            },
            {
                path: '/assets',
                element: <AssetsList />
            },
            {
                id: 'asset',
                path: '/assets/:assetId',
                loader: async ({ params }) => {
                    return axios.get<Asset>(`/api/assets/${params.assetId}/`)
                },
                element: <AssetDetails />
            },
        ]
    },
    {
        path: '/not-found',
        element: <ErrorPage />
    }
])

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)
