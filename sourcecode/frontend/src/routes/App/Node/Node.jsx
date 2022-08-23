import React from 'react';
import { Box, Button, Container, Grid, Paper, Stack } from '@mui/material';
import { ManagedForm, ManagedTextField } from '../../../components/ManagedForm';
import ManagedFormControl from '../../../components/ManagedForm/ManagedFormControl';
import { Editor } from '../../../components/Editor';

const Node = ({ node }) => {
    return (
        <Container>
            <Grid container>
                <Grid item xs={12}>
                    <Paper component={Box} p={2} mt={2}>
                        <h1>{node.name}</h1>
                        <Editor initialEditorState={node.content} />
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Node;
