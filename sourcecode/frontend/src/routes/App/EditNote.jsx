import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, Grid, Paper } from '@mui/material';
import { NoteForm, NoteFormContainer } from '../../components/Forms/Note';
import NoteFormSubmitWrapper from '../../components/Forms/Note/NoteFormSubmitWrapper';

const EditNote = () => {
    let navigate = useNavigate();

    return (
        <NoteFormContainer
            onSaved={(noteId) => {
                navigate('/app/notes/' + noteId);
            }}
        >
            <Container>
                <Grid container>
                    <Grid item xs={12}>
                        <Paper component={Box} p={2} mt={2}>
                            <h1>Create new note</h1>
                            <NoteForm />
                            <NoteFormSubmitWrapper>
                                {(onSubmit) => (
                                    <Button onClick={onSubmit}>Save</Button>
                                )}
                            </NoteFormSubmitWrapper>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </NoteFormContainer>
    );
};

export default EditNote;
