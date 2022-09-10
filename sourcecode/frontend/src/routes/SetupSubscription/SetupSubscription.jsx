import React from 'react';
import { Box, Button, Container, Grid, Paper } from '@mui/material';

const SetupSubscription = ({ onSubmit }) => {
    return (
        <Container>
            <Grid container justifyContent={'center'}>
                <Grid item xs={6}>
                    <Paper component={Box} p={2} mt={2}>
                        <h2>Start trial</h2>
                        <p>
                            In order to start your trial you will need to
                            provide you payment information.
                        </p>
                        <p>
                            By pressing the button bellow you will be redirected
                            to our payment provider "Stripe".
                        </p>
                        <Button onClick={onSubmit}>
                            Add payment information
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default SetupSubscription;
