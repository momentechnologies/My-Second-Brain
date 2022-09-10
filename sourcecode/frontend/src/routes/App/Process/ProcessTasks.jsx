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

const ProcessTasks = ({ queryHookData, setSelectedTaskToEdit }) => {
    return (
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
                </TableBody>
            </Table>
        </Paper>
    );
};

export default ProcessTasks;
