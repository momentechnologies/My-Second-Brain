import React from 'react';
import {
    Alert,
    Autocomplete,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Stack,
    TextField,
} from '@mui/material';
import { gql, useMutation } from '@apollo/client';
import ProjectPicker from './ProjectPicker';
import { DateTimePicker } from '@mui/x-date-pickers';
import { parseISO } from 'date-fns';
import { Clear as ClearIcon } from '@mui/icons-material';
import checkUndefinedParameters from '../helpers/checkUndefinedParameters';
import taskContexts from '../constants/taskContexts';
import { useDebounce } from 'moment-hooks';

const UPDATE_TASK = gql`
    mutation UpdateTask($id: Int!, $data: UpdateTaskInput!) {
        updateTask(id: $id, data: $data) {
            id
            isDone
            name
            project {
                id
                name
            }
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

const TaskEditModal = ({ task, onClose, onUpdated }) => {
    checkUndefinedParameters([
        ['context', task.context],
        ['dueAt', task.dueAt],
    ]);

    const [updateTask, updateTaskProjectStatus] = useMutation(UPDATE_TASK);
    const [deleteTask, deleteTaskStatus] = useMutation(DELETE_TASK);

    const [name, setName] = React.useState(task.name);
    const debouncedName = useDebounce(name, 500);

    React.useEffect(() => {
        if (task.name === debouncedName || task.name.length === 0) {
            return;
        }

        update({
            name,
        });
    }, [debouncedName]);

    const update = (data) => {
        updateTask({
            variables: {
                id: task.id,
                data,
            },
        }).then(({ data }) => onUpdated(data.updateTask));
    };

    return (
        <Dialog fullWidth maxWidth="md" open={true} onClose={onClose}>
            {updateTaskProjectStatus.loading && (
                <CircularProgress
                    size={30}
                    sx={{ position: 'absolute', right: 15, top: 15 }}
                />
            )}
            <DialogTitle>Edit task</DialogTitle>
            <DialogContent>
                <Stack spacing={2} mt={2}>
                    <TextField
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        label="Name"
                        fullWidth
                        required
                        onBlur={() => {
                            if (name.length !== 0) {
                                update({
                                    name,
                                });
                            }
                        }}
                    />
                    <ProjectPicker
                        startValue={
                            task.project
                                ? {
                                      id: task.project.id,
                                      label: task.project.name,
                                  }
                                : null
                        }
                        onSetProjectId={(id) =>
                            update({
                                projectId: id ? parseInt(id) : null,
                            })
                        }
                    />
                    <Autocomplete
                        value={
                            task.context
                                ? taskContexts.find(
                                      (taskContext) =>
                                          taskContext.value === task.context
                                  )
                                : null
                        }
                        onChange={(event, newValue) => {
                            update({
                                context: newValue ? newValue.value : null,
                            });
                        }}
                        options={taskContexts}
                        renderInput={(params) => (
                            <TextField {...params} label="context" />
                        )}
                    />
                    <DateTimePicker
                        label="Due at"
                        value={task.dueAt ? parseISO(task.dueAt) : null}
                        onChange={(value) =>
                            update({
                                dueAt: value,
                            })
                        }
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                InputProps={{
                                    endAdornment: (
                                        <IconButton
                                            sx={{
                                                visibility: task.dueAt
                                                    ? 'visible'
                                                    : 'hidden',
                                            }}
                                            onClick={() =>
                                                update({
                                                    dueAt: null,
                                                })
                                            }
                                        >
                                            <ClearIcon />
                                        </IconButton>
                                    ),
                                    ...params.InputProps,
                                }}
                            />
                        )}
                    />
                    {updateTaskProjectStatus.error && (
                        <Alert color="error">
                            {updateTaskProjectStatus.error.message}
                        </Alert>
                    )}
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={onClose}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

const Wrapper = (props) => {
    if (!props.task) {
        return <></>;
    }

    return <TaskEditModal {...props} />;
};

export default Wrapper;
