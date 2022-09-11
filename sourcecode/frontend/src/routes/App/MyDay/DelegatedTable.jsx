import React from 'react';
import {
    Chip,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@mui/material';
import TaskDoneCheckbox from '../../../components/TaskDoneCheckbox';
import { getRelativeDateString } from '../../../helpers/date';

const DelegatedTable = ({ tasks, setSelectedTaskToEdit }) => {
    return (
        <Table size="small">
            <TableHead>
                <TableRow>
                    <TableCell variant="head">Task</TableCell>
                    <TableCell variant="head">Project</TableCell>
                    <TableCell variant="head">Delegated to</TableCell>
                    <TableCell variant="head">Remind me</TableCell>
                    <TableCell />
                </TableRow>
            </TableHead>
            <TableBody>
                {tasks.map((task) => {
                    const relativeDateString = getRelativeDateString(
                        task.remindMeAt
                    );
                    return (
                        <TableRow
                            onClick={() => setSelectedTaskToEdit(task)}
                            hover
                        >
                            <TableCell>{task.name}</TableCell>
                            <TableCell>
                                {task.project && task.project.name}
                            </TableCell>
                            <TableCell>Coming soon</TableCell>
                            <TableCell>
                                {relativeDateString.string && (
                                    <Chip
                                        color={relativeDateString.color}
                                        label={relativeDateString.string}
                                    />
                                )}
                            </TableCell>
                            <TableCell align="right">
                                <TaskDoneCheckbox
                                    taskId={task.id}
                                    startValueIsDone={task.isDone}
                                />
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
};

export default DelegatedTable;
