import React from 'react';
import {
    Box,
    Container,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@mui/material';
import DefaultHookQuery from '../../../components/DefaultHookQuery';
import TaskRow from './TaskRow';
import NoteRow from './NoteRow';
import NoteModal from './NoteModal';

const Process = ({ queryHookData }) => {
    const [selectedNoteToEdit, setSelectedNoteToEdit] = React.useState(null);

    return (
        <>
            <Container>
                <Grid container>
                    <Grid item xs={12}>
                        <Paper component={Box} p={2} mt={2}>
                            <h2>Tasks</h2>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            <strong>Name</strong>
                                        </TableCell>
                                        <TableCell>
                                            <strong>Project</strong>
                                        </TableCell>
                                        <TableCell width={40} />
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <DefaultHookQuery
                                        queryHookData={queryHookData}
                                    >
                                        {({ data, refetch }) => {
                                            return (
                                                <>
                                                    {data.tasks.map((task) => (
                                                        <TaskRow
                                                            key={task.id}
                                                            task={task}
                                                            onDeleted={() =>
                                                                refetch()
                                                            }
                                                        />
                                                    ))}
                                                </>
                                            );
                                        }}
                                    </DefaultHookQuery>
                                </TableBody>
                            </Table>
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
                                        <TableCell width={40} />
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <DefaultHookQuery
                                        queryHookData={queryHookData}
                                    >
                                        {({ data, refetch }) => {
                                            return (
                                                <>
                                                    {data.notes.map((note) => (
                                                        <NoteRow
                                                            key={note.id}
                                                            note={note}
                                                            onDeleted={() =>
                                                                refetch()
                                                            }
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
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
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

export default Process;
