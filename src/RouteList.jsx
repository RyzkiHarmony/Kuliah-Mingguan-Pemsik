import { createBrowserRouter } from "react-router-dom";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import AdminLayout from "./Layouts/AdminLayout";
import Dashboard from "./Pages/Admin/Dashboard";
import Mahasiswa from "./Pages/Admin/Mahasiswa";
import ProtectedRoute from "./Components/ProtectedRoute";

const RouteList = createBrowserRouter([
    {
        path: '/',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/admin',
        element: (
            <ProtectedRoute>
                <AdminLayout />
            </ProtectedRoute>
        ),
        children: [
            {
                index: true,
                element: <Dashboard />
            },
            {
                path: 'mahasiswa',
                element: <Mahasiswa />
            }
        ]
    }
]);

export default RouteList;
