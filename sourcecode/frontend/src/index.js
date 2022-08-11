import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import apiConfig from './config/api';
import { BrowserRouter } from 'react-router-dom';
import StartupContainer from './containers/StartupContainer';
import AuthProvider from './containers/AuthProvider';
import Theme from './containers/Theme';

const client = new ApolloClient({
    uri: apiConfig.url + '/api/graphql',
    credentials: 'include',
    cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Theme>
            <ApolloProvider client={client}>
                <BrowserRouter>
                    <StartupContainer>
                        <AuthProvider>
                            <App />
                        </AuthProvider>
                    </StartupContainer>
                </BrowserRouter>
            </ApolloProvider>
        </Theme>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
