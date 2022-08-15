import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import Dashboard from './Dashboard';
import AppHeader from '../../components/AppHeader';

const Index = () => {
    const routes = useRoutes([
        {
            path: '/',
            element: <Dashboard />,
        },
        {
            path: '*',
            element: <Navigate to="/" replace />,
        },
    ]);

    return (
        <>
            <AppHeader />
            {routes}
        </>
    );
};

export default Index;
