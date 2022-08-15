import React from 'react';
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Container,
    Grid,
    Paper,
    Stack,
} from '@mui/material';

export default ({ hasToken, error, newConfirmEmailStatus, onNew }) => {
    return (
        <Container>
            <Grid container>
                <Grid item xs={12}>
                    <Paper component={Box} p={2} mt={2}>
                        <h2>Confirm your email</h2>
                        <Stack spacing={2}>
                            {!hasToken ? (
                                <Box>
                                    Check your inbox to confirm your email
                                </Box>
                            ) : error ? (
                                <Alert color="danger">
                                    Problems verifying your email
                                </Alert>
                            ) : (
                                <CircularProgress />
                            )}
                            <Box mt={1}>
                                <Button
                                    disabled={newConfirmEmailStatus.loading}
                                    onClick={onNew}
                                >
                                    Send new
                                </Button>
                            </Box>
                            {newConfirmEmailStatus.error && (
                                <Alert color="danger">
                                    Something happened. Please try again later.
                                </Alert>
                            )}
                            {newConfirmEmailStatus.success && (
                                <Alert color="success">New email sent</Alert>
                            )}
                        </Stack>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};
