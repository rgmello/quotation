import './index.css'
import Root from './root'
import React from 'react'
import axios from 'axios'
import ErrorPage from './error-page'
import { Asset } from './utils/types'
import ReactDOM from 'react-dom/client'
import AssetsList from './components/asset-list'
import { ThemeProvider } from './providers/theme-provider'
import AssetDetails from './components/dashboard/asset-dashboard'
import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom'


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
        <ThemeProvider>
            <RouterProvider router={router} />
        </ThemeProvider>
    </React.StrictMode>
)
