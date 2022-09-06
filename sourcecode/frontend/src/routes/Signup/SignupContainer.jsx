import React from 'react';
import Signup from './Signup';
import { gql, useMutation } from '@apollo/client';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import appConfig from '../../config/app';

const SIGNUP = gql`
    mutation Signup($email: String!, $password: String!) {
        signup(email: $email, password: $password) {
            id
        }
    }
`;

const stripePromise = loadStripe(appConfig.stripePublicUrl);

const SignupContainer = () => {
    const [values, setValues] = React.useState({
        email: '',
        password: '',
        acceptTerms: false,
    });
    const [signup, { error, loading }] = useMutation(SIGNUP);

    return (
        <Elements stripe={stripePromise}>
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
        </Elements>
    );
};

export default SignupContainer;
