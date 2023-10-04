import LoginPage from './components/login-page'
import LogoutPage from './components/logout-page'
import AssetsList from './components/assets-page'
import ErrorPage from './components/layouts/error-page'
import { ThemeProvider } from './providers/theme-provider'
import MainWrapper from './components/layouts/main-wrapper'
import PrivateRoute from './components/layouts/private-route'
import AssetDetails from './components/dashboard/asset-dashboard'
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom'
import SignUpPage from './components/signup-page'


export default function App() {
    return (
        <ThemeProvider>
            <BrowserRouter>
                <MainWrapper>
                    <Routes>
                        <Route
                            path='/'
                            element={<Navigate to='/assets' />}
                            errorElement={<ErrorPage />}
                        />
                        <Route
                            path='/assets'
                            element={<PrivateRoute><AssetsList /></PrivateRoute>}
                            errorElement={<ErrorPage />}
                        />
                        <Route
                            path='/assets/:assetId'
                            element={<PrivateRoute><AssetDetails /></PrivateRoute>}
                            errorElement={<ErrorPage />}
                        />
                        <Route
                            path='/not-found'
                            element={<ErrorPage />}
                            errorElement={<ErrorPage />}
                        />
                        <Route
                            path='/signup'
                            element={<SignUpPage />}
                            errorElement={<ErrorPage />}
                        />
                        <Route
                            path='/login'
                            element={<LoginPage />}
                            errorElement={<ErrorPage />}
                        />
                        <Route
                            path='/logout'
                            element={<LogoutPage />}
                            errorElement={<ErrorPage />}
                        />
                    </Routes>
                </MainWrapper>
            </BrowserRouter>
        </ThemeProvider>
    )
}