import React from 'react';
import {
    Box,
    Button,
    Container,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@mui/material';
import { Editor } from '../../../components/Editor';
import NoteModal from './NoteModal';
import { useNavigate } from 'react-router-dom';

const Node = ({ node, refetch }) => {
    const [selectedNoteToEdit, setSelectedNoteToEdit] = React.useState(null);
    const navigate = useNavigate();

    return (
        <>
            <Container>
                <Grid container>
                    <Grid item xs={12}>
                        <Paper component={Box} p={2} mt={2}>
                            <h1>{node.name}</h1>
                            <Editor initialEditorState={node.content} />
                            <Button
                                onClick={() =>
                                    navigate('/app/nodes/' + node.id + '/edit')
                                }
                            >
                                Edit
                            </Button>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper component={Box} p={2} mt={2}>
                            <h2>Notes</h2>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            <strong>Name</strong>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {node.notes.map((note) => (
                                        <TableRow
                                            onClick={() =>
                                                setSelectedNoteToEdit(note)
                                            }
                                        >
                                            <TableCell>{note.name}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
            <NoteModal
                note={selectedNoteToEdit}
                onClose={() => setSelectedNoteToEdit(null)}
                onSaved={() => {
                    setSelectedNoteToEdit(null);
                    refetch();
                }}
            />
        </>
    );
};

export default Node;
