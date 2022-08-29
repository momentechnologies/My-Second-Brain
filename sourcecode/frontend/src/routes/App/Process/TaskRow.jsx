import React from 'react';
import {
    Autocomplete,
    IconButton,
    MenuItem,
    Select,
    TableCell,
    TableRow,
    TextField,
} from '@mui/material';
import ProjectPicker from '../../../components/ProjectPicker';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { gql, useMutation } from '@apollo/client';

const UPDATE_TASK = gql`
    mutation UpdateTask($id: Int!, $data: UpdateTaskInput!) {
        updateTask(id: $id, data: $data) {
            id
            isDone
            projectId
            context
            dueAt
        }
    }
`;

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
