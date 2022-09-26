import React from 'react';
import { IconButton, TableCell, TableRow } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { gql, useMutation } from '@apollo/client';

const DELETE_TASK = gql`
    mutation DeleteTask($taskId: Int!) {
        deleteTask(taskId: $taskId)
    }
`;

const TaskRow = ({ task, onDeleted, onClick }) => {
    const [deleteTask, deleteTaskStatus] = useMutation(DELETE_TASK);

    return (
        <TableRow hover onClick={onClick}>
            <TableCell>{task.name}</TableCell>
            <TableCell>{task.project && task.project.name}</TableCell>
            <TableCell>{task.list}</TableCell>
            <TableCell>
                <IconButton
                    color="error"
                    onClick={() =>
                        deleteTask({
                            variables: { taskId: task.id },
                        }).then(() => onDeleted())
                    }
                >
                    <DeleteIcon />
                </IconButton>
            </TableCell>
        </TableRow>
    );
};

export default TaskRow;
