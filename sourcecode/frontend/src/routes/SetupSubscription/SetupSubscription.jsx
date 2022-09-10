import React from 'react';
import { Box, Button, Container, Grid, Paper } from '@mui/material';

const SetupSubscription = ({ onSubmit }) => {
    return (
        <Container>
            <Grid container>
                <Grid item xs={6}>
                    <Paper component={Box} p={2} mt={2}>
                        <h2>Setup your subscription</h2>
                        <Button onClick={onSubmit}>Start</Button>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper component={Box} p={2} mt={2}>
                        <h2>Free 14 days trial</h2>
                        <h2>5$/month</h2>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default SetupSubscription;
