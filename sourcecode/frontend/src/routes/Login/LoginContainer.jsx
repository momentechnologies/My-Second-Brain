import React from 'react';

import getGraphqlError from '../../helpers/getGraphqlError';
import Login from './Login';
import AuthContext from '../../contexts/auth.js';
import { useNavigate } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';

const LOGIN_MUTATION = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            id
        }
    }
`;

const LoginContainer = ({ redirect = true, ...props }) => {
    let navigate = useNavigate();
    const { refetch } = React.useContext(AuthContext);
    const [login, { error, loading }] = useMutation(LOGIN_MUTATION);
    const [values, setValues] = React.useState({
        email: '',
        password: '',
    });

    return (
        <>
            <Login
                {...props}
                loading={loading}
                values={values}
                setValues={setValues}
                error={error && getGraphqlError(error)}
                login={() => {
                    login({
                        variables: values,
                    })
                        .then(() => {
                            refetch().then(() => {
                                if (redirect) {
                                    navigate('/');
                                }
                            });
                        })
                        .catch(() => {});
                }}
            />
        </>
    );
};

export default LoginContainer;
