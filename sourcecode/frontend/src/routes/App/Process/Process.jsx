import React from 'react';
import {
    Box,
    Container,
    Grid,
    Paper,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Tabs,
} from '@mui/material';
import DefaultHookQuery from '../../../components/DefaultHookQuery';
import TaskRow from './TaskRow';
import NoteRow from './NoteRow';
import NoteModal from './NoteModal';
import TaskEditModal from '../../../components/TaskEditModal';
import { PageContent } from '../../../components/Page';
import { tabs } from '../MyDay/MyDay';
import ProcessTasks from './ProcessTasks';

const Process = ({ queryHookData }) => {
    const [selectedNoteToEdit, setSelectedNoteToEdit] = React.useState(null);
    const [selectedTaskToEdit, setSelectedTaskToEdit] = React.useState(null);
    const [selectedTab, setSelectedTab] = React.useState(0);

    return (
        <PageContent title={'Process'}>
            <Grid container>
                <Grid item xs={12}>
                    <Tabs
                        value={selectedTab}
                        onChange={(e, index) => setSelectedTab(index)}
                    >
                        <Tab label={'Tasks'} />
                        <Tab label={'Notes'} />
                    </Tabs>
                </Grid>
                <Grid item xs={12}>
                    {selectedTab === 0 && (
                        <ProcessTasks
                            setSelectedTaskToEdit={setSelectedTaskToEdit}
                            queryHookData={queryHookData}
                        />
                    )}
                    {selectedTab === 1 && (
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
                    )}
                </Grid>
            </Grid>
            <NoteModal
                note={selectedNoteToEdit}
                onClose={() => setSelectedNoteToEdit(null)}
                onSaved={() => {
                    setSelectedNoteToEdit(null);
                    queryHookData.refetch();
                }}
            />
            <TaskEditModal
                task={selectedTaskToEdit}
                onClose={() => setSelectedTaskToEdit(null)}
                onUpdated={(updatedTask) => {
                    console.log(updatedTask);
                    setSelectedTaskToEdit({
                        ...selectedTaskToEdit,
                        ...updatedTask,
                    });
                }}
            />
        </PageContent>
    );
};

export default Process;
