import React from 'react';
import {
    Alert,
    Box,
    Button,
    Checkbox,
    Container,
    FormControlLabel,
    FormGroup,
    Grid,
    Paper,
    Stack,
    TextField,
} from '@mui/material';
import { ManagedForm } from '../../components/ManagedForm';
import ManagedTextField from '../../components/ManagedForm/ManagedTextField';
import CardElement from './CardElement';

const CARD_ELEMENT_OPTIONS = {
    style: {
        base: {
            color: '#32325d',
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: 'antialiased',
            fontSize: '16px',
            '::placeholder': {
                color: '#aab7c4',
            },
        },
        invalid: {
            color: '#fa755a',
            iconColor: '#fa755a',
        },
    },
};

const Signup = ({ values, setValue, signupStatus, onSubmit }) => {
    return (
        <Container sx={{ mt: 2 }}>
            <Grid container justifyContent={'center'}>
                <Grid item xs={6}>
                    <Paper component={Box} p={2}>
                        <h2>Create new account</h2>
                        <ManagedForm error={signupStatus.error}>
                            <Stack spacing={2}>
                                <ManagedTextField
                                    inputKey="email"
                                    value={values.email}
                                    onChange={(e) =>
                                        setValue('email', e.target.value)
                                    }
                                    label="Email"
                                    fullWidth
                                    required
                                    type="email"
                                />
                                <Stack direction={'row'} spacing={1}>
                                    <ManagedTextField
                                        inputKey="firstName"
                                        value={values.firstName}
                                        onChange={(e) =>
                                            setValue(
                                                'firstName',
                                                e.target.value
                                            )
                                        }
                                        label="First Name"
                                        fullWidth
                                        required
                                        type="text"
                                    />
                                    <ManagedTextField
                                        inputKey="lastName"
                                        value={values.lastName}
                                        onChange={(e) =>
                                            setValue('lastName', e.target.value)
                                        }
                                        label="Last Name"
                                        fullWidth
                                        required
                                        type="text"
                                    />
                                </Stack>
                                <Stack direction={'row'} spacing={1}>
                                    <ManagedTextField
                                        inputKey="country"
                                        value={values.country}
                                        onChange={(e) =>
                                            setValue('country', e.target.value)
                                        }
                                        label="Country"
                                        fullWidth
                                        required
                                        type="text"
                                    />
                                    <ManagedTextField
                                        inputKey="postalCode"
                                        value={values.postalCode}
                                        onChange={(e) =>
                                            setValue(
                                                'postalCode',
                                                e.target.value
                                            )
                                        }
                                        label="Postal code"
                                        fullWidth
                                        required
                                        type="text"
                                    />
                                </Stack>
                                <ManagedTextField
                                    inputKey="password"
                                    value={values.password}
                                    onChange={(e) =>
                                        setValue('password', e.target.value)
                                    }
                                    label="Password"
                                    fullWidth
                                    required
                                    type="password"
                                />
                                <CardElement />
                                <FormGroup>
                                    <FormControlLabel
                                        checked={values.acceptTerms}
                                        onChange={() =>
                                            setValue(
                                                'acceptTerms',
                                                !values.acceptTerms
                                            )
                                        }
                                        control={<Checkbox />}
                                        label="Do you accept the terms???"
                                    />
                                </FormGroup>
                                {signupStatus.error && (
                                    <Alert color="error">
                                        {signupStatus.error.message}
                                    </Alert>
                                )}
                                <Box mt={1}>
                                    <Button
                                        onClick={onSubmit}
                                        disabled={!values.acceptTerms}
                                    >
                                        Create
                                    </Button>
                                </Box>
                            </Stack>
                        </ManagedForm>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Signup;
