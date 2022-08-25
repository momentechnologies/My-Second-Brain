import React from 'react';
import { Alert, Box, Button, Container, Grid, Paper } from '@mui/material';
import CreateQuickTaskCard from './CreateQuickTaskCard';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    return (
        <Container>
            <Grid container>
                <Grid item xs={12}>
                    <CreateQuickTaskCard />
                </Grid>
                <Grid item xs={12}>
                    <Paper component={Box} p={2} mt={2}>
                        <Button
                            fullWidth
                            size="large"
                            component={Link}
                            to="notes/create"
                        >
                            Create new note
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Dashboard;
