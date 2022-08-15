import React from 'react';
import Login from './Login';
import { Navigate, useRoutes } from 'react-router-dom';
import AuthContext from '../contexts/auth';
import Header from '../components/Header';
import Home from './Home';
import Signup from './Signup';
import ConfirmEmail from './Auth/ConfirmEmail';

export const authenticatedRoutes = [
    {
        path: '/app',
        element: <Home />,
    },
    {
        path: '/auth/confirm-email',
        element: <ConfirmEmail />,
    },
    {
        path: '*',
        element: <Navigate to="/app" replace />,
    },
];

export const notAuthenticatedRoutes = [
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/signup',
        element: <Signup />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '*',
        element: <Navigate to="/login" replace />,
    },
];

const AuthenticatedRoutes = () => {
    const routes = useRoutes(authenticatedRoutes);
    return <>{routes}</>;
};

const NotAuthenticatedRoutes = () => {
    const routes = useRoutes(notAuthenticatedRoutes);
    return (
        <>
            <Header />
            {routes}
        </>
    );
};

const Routes = () => {
    const { isAuthenticated } = React.useContext(AuthContext);

    if (isAuthenticated) {
        return <AuthenticatedRoutes />;
    }

    return <NotAuthenticatedRoutes />;
};

export default Routes;
