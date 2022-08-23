import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import Dashboard from './Dashboard';
import AppHeader from '../../components/AppHeader';
import Projects from './Projects';
import Process from './Process';
import Notes from './Notes';
import Nodes from './Nodes';
import EditNode from './EditNode';
import Node from './Node';

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
            path: '/notes',
            element: <Notes />,
        },
        {
            path: '/nodes',
            element: <Nodes />,
        },
        {
            path: '/nodes/create',
            element: <EditNode />,
        },
        {
            path: '/nodes/:nodeId',
            element: <Node />,
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
