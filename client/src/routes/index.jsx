import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '../pages/admin/Login.jsx'
import Dashboard from '../pages/admin/Dashboard.jsx'
import Categories from '../pages/admin/Categories.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path='/login' element={<Login btnText='Entrar no Painel' endpointUrl="http://localhost:5000/api/auth/login"/>} />
            <Route path='/dashboard' element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>} />
            <Route path='/categories' element={<ProtectedRoute> <Categories /> </ProtectedRoute>} />
        </Routes>
    )
}

export default AppRoutes
