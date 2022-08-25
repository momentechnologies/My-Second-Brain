import React from 'react';
import { Box, IconButton, TableCell, TableRow } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { gql, useMutation } from '@apollo/client';

const DELETE_NOTE = gql`
    mutation DeleteNote($noteId: Int!) {
        deleteNote(noteId: $noteId)
    }
`;

const NoteRow = ({ note, onDeleted, onClick }) => {
    const [deleteNote, deleteNoteStatus] = useMutation(DELETE_NOTE);

    return (
        <TableRow hover onClick={onClick}>
            <TableCell>{note.name}</TableCell>
            <TableCell>
                <Box onClick={(e) => e.stopPropagation()}>
                    <IconButton
                        color="error"
                        onClick={() =>
                            deleteNote({
                                variables: { noteId: note.id },
                            }).then(() => onDeleted())
                        }
                    >
                        <DeleteIcon />
                    </IconButton>
                </Box>
            </TableCell>
        </TableRow>
    );
};

export default NoteRow;
