import React from 'react';
import {
    Box,
    Button,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@mui/material';
import DefaultHookQuery from '../../../components/DefaultHookQuery';
import { gql, useQuery } from '@apollo/client';
import NoteRow from './NoteRow';
import NoteModal from './NoteModal';
import { Link } from 'react-router-dom';

const getNotesToProcess = gql`
    query GetNotesToProcess {
        notes(filters: { onlyUnassigned: true }) {
            id
            name
            parentNodeId
            content
        }
    }
`;

const ProcessNotes = () => {
    const [selectedNoteToEdit, setSelectedNoteToEdit] = React.useState(null);
    const queryHookData = useQuery(getNotesToProcess, {
        fetchPolicy: 'network-only',
    });

    return (
        <>
            <Paper component={Box} p={2} mt={2}>
                <h2>Notes</h2>
                <Stack spacing={1}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <strong>Name</strong>
                                </TableCell>
                                <TableCell width={40} />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <DefaultHookQuery queryHookData={queryHookData}>
                                {({ data, refetch }) => {
                                    return (
                                        <>
                                            {data.notes.map((note) => (
                                                <NoteRow
                                                    key={note.id}
                                                    note={note}
                                                    onDeleted={() => refetch()}
                                                    onClick={() =>
                                                        setSelectedNoteToEdit(
                                                            note
                                                        )
                                                    }
                                                />
                                            ))}
                                        </>
                                    );
                                }}
                            </DefaultHookQuery>
                        </TableBody>
                    </Table>
                    <Box>
                        <Button size="large" component={Link} to="notes/create">
                            Create new note
                        </Button>
                    </Box>
                </Stack>
            </Paper>
            <NoteModal
                note={selectedNoteToEdit}
                onClose={() => setSelectedNoteToEdit(null)}
                onSaved={() => {
                    setSelectedNoteToEdit(null);
                    queryHookData.refetch();
                }}
            />
        </>
    );
};

export default ProcessNotes;
