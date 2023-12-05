import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

// RRD
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Layouts
import AuthLayout from './layout/AuthLayout';
import AdminLayout from './layout/AdminLayout';

// Pages
import SignUp from './pages/auth/SignUp';
import Login from './pages/auth/Login';
import Muro from './pages/admin/Muro';
import Perfil from './pages/admin/Perfil';
import CrearPost from './pages/admin/CrearPost';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Muro />
      },
      {
        path: 'perfil',
        element: <Perfil />
      },
      {
        path: 'crear-posts',
        element: <CrearPost />
      },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'signup',
        element: <SignUp />
      },
      {
        path: 'login',
        element: <Login />
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider
      router={router}
    />
  </React.StrictMode>,
)
