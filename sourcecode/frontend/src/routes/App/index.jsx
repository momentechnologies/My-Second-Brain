import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import Dashboard from './Dashboard';
import AppHeader from '../../components/AppHeader';
import Projects from './Projects';

const Index = () => {
    const routes = useRoutes([
        {
            path: '/',
            element: <Dashboard />,
        },
        {
            path: '/projects',
            element: <Projects />,
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
