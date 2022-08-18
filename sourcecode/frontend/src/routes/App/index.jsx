import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import Dashboard from './Dashboard';
import AppHeader from '../../components/AppHeader';
import Projects from './Projects';
import Process from './Process';

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
            path: '/process',
            element: <Process />,
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
