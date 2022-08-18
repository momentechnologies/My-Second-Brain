import React from 'react';
import { IconButton, TableCell, TableRow } from '@mui/material';
import ProjectPicker from '../../../components/ProjectPicker';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { gql, useMutation } from '@apollo/client';

const UPDATE_TASK_PROJECT = gql`
    mutation UpdateTaskProject($taskId: Int!, $projectId: Int) {
        updateTaskProject(taskId: $taskId, projectId: $projectId) {
            id
        }
    }
`;

const DELETE_TASK = gql`
    mutation DeleteTask($taskId: Int!) {
        deleteTask(taskId: $taskId)
    }
`;

const TaskRow = ({ task, onDeleted }) => {
    const [updateTaskProject, updateTaskProjectStatus] =
        useMutation(UPDATE_TASK_PROJECT);
    const [deleteTask, deleteTaskStatus] = useMutation(DELETE_TASK);

    return (
        <TableRow hover>
            <TableCell>{task.name}</TableCell>
            <TableCell>
                <ProjectPicker
                    onSetProjectId={(id) =>
                        updateTaskProject({
                            variables: {
                                taskId: task.id,
                                projectId: id ? parseInt(id) : null,
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
