import React from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material';
import { NoteForm, NoteFormContainer } from '../../../components/Forms/Note';
import NoteFormSubmitWrapper from '../../../components/Forms/Note/NoteFormSubmitWrapper';

const NoteModal = ({ note, onClose, onSaved }) => {
    if (!note) {
        return <></>;
    }

    return (
        <Dialog fullWidth maxWidth="md" open={!!note} onClose={onClose}>
            <NoteFormContainer onSaved={onSaved} startValues={note}>
                <DialogTitle>Edit note</DialogTitle>
                <DialogContent>
                    <Box mt={1}>
                        <NoteForm />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={onClose}>
                        Close
                    </Button>
                    <NoteFormSubmitWrapper>
                        {(onSubmit) => <Button onClick={onSubmit}>Save</Button>}
                    </NoteFormSubmitWrapper>
                </DialogActions>
            </NoteFormContainer>
        </Dialog>
    );
};

export default NoteModal;
