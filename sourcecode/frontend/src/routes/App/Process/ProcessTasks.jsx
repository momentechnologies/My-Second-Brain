import React from 'react';
import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@mui/material';
import DefaultHookQuery from '../../../components/DefaultHookQuery';
import TaskRow from './TaskRow';
import { gql, useQuery } from '@apollo/client';
import TaskEditModal from '../../../components/TaskEditModal';
import { ManagedTextField } from '../../../components/ManagedForm';
import CreateTaskContainer from '../../../containers/CreateTaskContainer';

const getTasksToProcess = gql`
    query GetTasksToProcess {
        tasks(filters: { onlyUnassigned: true }) {
            id
            name
            isDone
            projectId
            project {
                id
                name
            }
            list
            listSpecificDateDate
            remindMeAt
            dueAt
        }
    }
`;

const ProcessTasks = () => {
    const [selectedTaskToEdit, setSelectedTaskToEdit] = React.useState(null);
    const queryHookData = useQuery(getTasksToProcess, {
        fetchPolicy: 'network-only',
    });

    return (
        <>
            <Paper component={Box} p={2} mt={2}>
                <h2>Tasks</h2>
                <Table size="small">
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
                                        {data.tasks.map((task) => (
                                            <TaskRow
                                                key={task.id}
                                                task={task}
                                                onDeleted={() => refetch()}
                                                onClick={() =>
                                                    setSelectedTaskToEdit(task)
                                                }
                                            />
                                        ))}
                                    </>
                                );
                            }}
                        </DefaultHookQuery>
                        <TableRow>
                            <TableCell>
                                <CreateTaskContainer
                                    onCreated={() => queryHookData.refetch()}
                                >
                                    {({ setValue, values }) => (
                                        <ManagedTextField
                                            inputKey="name"
                                            name={'taskName'}
                                            value={values.name}
                                            onChange={(e) =>
                                                setValue('name', e.target.value)
                                            }
                                            fullWidth
                                            required
                                            placeholder={
                                                'Create new task by inputting it here'
                                            }
                                        />
                                    )}
                                </CreateTaskContainer>
                            </TableCell>
                            <TableCell />
                        </TableRow>
                    </TableBody>
                </Table>
            </Paper>
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
        </>
    );
};

export default ProcessTasks;
