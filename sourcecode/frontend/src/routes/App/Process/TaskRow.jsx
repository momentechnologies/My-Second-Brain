import React from 'react';
import { IconButton, TableCell, TableRow } from '@mui/material';
import ProjectPicker from '../../../components/ProjectPicker';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { gql, useMutation } from '@apollo/client';

const UPDATE_TASK = gql`
    mutation UpdateTask($id: Int!, $data: UpdateTaskInput!) {
        updateTask(id: $id, data: $data) {
            id
            isDone
            projectId
        }
    }
`;

const DELETE_TASK = gql`
    mutation DeleteTask($taskId: Int!) {
        deleteTask(taskId: $taskId)
    }
`;

const TaskRow = ({ task, onDeleted }) => {
    const [updateTask, updateTaskProjectStatus] = useMutation(UPDATE_TASK);
    const [deleteTask, deleteTaskStatus] = useMutation(DELETE_TASK);

    return (
        <TableRow hover>
            <TableCell>{task.name}</TableCell>
            <TableCell>
                <ProjectPicker
                    onSetProjectId={(id) =>
                        updateTask({
                            variables: {
                                id: task.id,
                                data: {
                                    projectId: id ? parseInt(id) : null,
                                },
                            },
                        })
                    }
                />
            </TableCell>
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
