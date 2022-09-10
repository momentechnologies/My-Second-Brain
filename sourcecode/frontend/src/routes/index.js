import React from 'react';
import Login from './Login';
import { Navigate, useRoutes } from 'react-router-dom';
import AuthContext from '../contexts/auth';
import Header from '../components/Header';
import Home from './Home';
import Signup from './Signup';
import ConfirmEmail from './Auth/ConfirmEmail';
import App from './App';
import AppHeader from '../components/AppHeader';
import SetupSubscription from './SetupSubscription';

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
        path: '/auth/confirm-email',
        element: <ConfirmEmail />,
    },
    {
        path: '*',
        element: <Navigate to="/auth/login" replace />,
    },
];

const AuthenticatedRoutes = () => {
    const routes = useRoutes([
        {
            path: '/app/*',
            element: <App />,
        },
        {
            path: '*',
            element: <Navigate to={'/app'} replace />,
        },
    ]);

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

const SubscriptionRequiredRoutes = () => {
    const routes = useRoutes([
        {
            path: '/auth/create-subscription',
            element: (
                <>
                    <AppHeader />
                    <SetupSubscription />
                </>
            ),
        },
        {
            path: '*',
            element: <Navigate to={'/auth/create-subscription'} replace />,
        },
    ]);

    return <>{routes}</>;
};

const Routes = () => {
    const { isAuthenticated, user } = React.useContext(AuthContext);

    if (!isAuthenticated) {
        return <NotAuthenticatedRoutes />;
    }

    if (!user.emailConfirmed) {
        return (
            <>
                <AppHeader />
                <ConfirmEmail />
            </>
        );
    }

    if (!user.hasSubscription) {
        return <SubscriptionRequiredRoutes />;
    }

    return <AuthenticatedRoutes />;
};

export default Routes;
