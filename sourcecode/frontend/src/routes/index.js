import React from 'react';
import Login from './Login';
import { Navigate, useRoutes } from 'react-router-dom';
import AuthContext from '../contexts/auth';
import Header from '../components/Header';
import Home from './Home';
import Signup from './Signup';
import ConfirmEmail from './Auth/ConfirmEmail';
import App from './App';

export const authenticatedRoutes = [
    {
        path: '/app/*',
        element: <App />,
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
        path: '/auth/signup',
        element: <Signup />,
    },
    {
        path: '/auth/login',
        element: <Login />,
    },
    {
        path: '*',
        element: <Navigate to="/auth/login" replace />,
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
    const { isAuthenticated, user } = React.useContext(AuthContext);

    if (!isAuthenticated) {
        return <NotAuthenticatedRoutes />;
    }

    if (!user.emailConfirmed) {
        return (
            <>
                <Header />
                <ConfirmEmail />
            </>
        );
    }

    return <AuthenticatedRoutes />;
};

export default Routes;
