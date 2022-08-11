import React from 'react';
import {
    Alert,
    Box,
    Button,
    Card,
    Container,
    FormControl,
    Grid,
    TextField,
} from '@mui/material';

const Login = ({ values, setValues, loading, error, login }) => {
    return (
        <Container>
            <Grid container>
                <Grid item md={6}>
                    <Card body component={Box} p={2}>
                        <h1>Login</h1>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                login();
                            }}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <TextField
                                            required
                                            label="Email"
                                            value={values.email}
                                            onChange={(e) =>
                                                setValues({
                                                    ...values,
                                                    email: e.target.value,
                                                })
                                            }
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <TextField
                                            required
                                            label="Password"
                                            type="password"
                                            value={values.password}
                                            onChange={(e) =>
                                                setValues({
                                                    ...values,
                                                    password: e.target.value,
                                                })
                                            }
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <div className="my-2 d-flex">
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                        >
                                            Login
                                        </Button>
                                        {loading && <div>loading</div>}
                                    </div>
                                    {error ? (
                                        <Alert
                                            color="error"
                                            component={Box}
                                            mt={2}
                                        >
                                            {error.message}
                                        </Alert>
                                    ) : (
                                        ''
                                    )}
                                </Grid>
                            </Grid>
                        </form>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Login;
