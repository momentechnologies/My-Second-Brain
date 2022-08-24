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

const Signup = ({ values, setValue, signupStatus, onSubmit }) => {
    return (
        <Container sx={{ mt: 2 }}>
            <Grid container>
                <Grid item xs={12}>
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
