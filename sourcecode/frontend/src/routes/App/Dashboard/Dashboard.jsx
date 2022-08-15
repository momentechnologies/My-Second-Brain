import React from 'react';
import { Container, Grid } from '@mui/material';
import BrainDumpCard from './BrainDumpCard';

const Dashboard = () => {
    return (
        <Container>
            <Grid container>
                <Grid item xs={12}>
                    <BrainDumpCard />
                </Grid>
            </Grid>
        </Container>
    );
};

export default Dashboard;
