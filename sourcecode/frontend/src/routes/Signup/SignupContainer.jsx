import React from 'react';
import Signup from './Signup';
import { gql, useMutation } from '@apollo/client';

const SIGNUP = gql`
    mutation Signup($email: String!, $password: String!) {
        signup(email: $email, password: $password) {
            id
        }
    }
`;

const SignupContainer = () => {
    const [values, setValues] = React.useState({
        email: '',
        password: '',
        acceptTerms: false,
    });
    const [signup, { error, loading }] = useMutation(SIGNUP);

    return (
        <Signup
            values={values}
            setValue={(key, value) => {
                setValues({ ...values, [key]: value });
            }}
            signupStatus={{
                error,
                loading,
            }}
            onSubmit={() => {
                signup({ variables: values }).then(() =>
                    window.location.replace('/auth/confirm-email')
                );
            }}
        />
    );
};

export default SignupContainer;
