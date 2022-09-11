import React from 'react';
import {
    Alert,
    Autocomplete,
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Paper,
    Stack,
    TextField,
} from '@mui/material';
import { gql, useMutation } from '@apollo/client';
import ProjectPicker from './ProjectPicker';
import { DateTimePicker } from '@mui/x-date-pickers';
import { parseISO } from 'date-fns';
import { Clear as ClearIcon } from '@mui/icons-material';
import checkUndefinedParameters from '../helpers/checkUndefinedParameters';
import taskLists from '../constants/taskLists';
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
            list
            listSpecificDateDate
            remindMeAt
            dueAt
        }
    }
`;

const DELETE_TASK = gql`
    mutation DeleteTask($taskId: Int!) {
        deleteTask(taskId: $taskId)
    }
`;

const defaultListValues = {
    list: null,
    remindMeAt: null,
    dueAt: null,
    listSpecificDateDate: null,
};

const TaskEditModal = ({ task, onClose, onUpdated }) => {
    checkUndefinedParameters([
        ['list', task.list],
        ['dueAt', task.dueAt],
    ]);

    const [updateTask, updateTaskProjectStatus] = useMutation(UPDATE_TASK);

    const [name, setName] = React.useState(task.name);
    const debouncedName = useDebounce(name, 500);
    const [listValues, setListValues] = React.useState(defaultListValues);

    React.useEffect(() => {
        if (task.name === debouncedName || task.name.length === 0) {
            return;
        }

        update({
            name,
        });
    }, [debouncedName]);

    React.useEffect(() => {
        setListValues({
            list: task.list,
            listSpecificDateDate: task.listSpecificDateDate,
            dueAt: task.dueAt,
            remindMeAt: task.remindMeAt,
        });
    }, [task]);

    const update = (data) => {
        updateTask({
            variables: {
                id: task.id,
                data,
            },
        }).then(({ data }) => onUpdated(data.updateTask));
    };

    const updateListValues = (values) => {
        const updatedState = {
            ...listValues,
            ...values,
        };

        const canSendToServer = () => {
            switch (updatedState.list) {
                case 'doNext':
                case 'delegated':
                case 'someday':
                default:
                    return true;
                case 'specificDate':
                    return updatedState.listSpecificDateDate !== null;
            }
        };

        if (canSendToServer()) {
            update(updatedState);
        }

        setListValues(updatedState);
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
                    <Paper component={Stack} p={1} spacing={1}>
                        <Autocomplete
                            value={
                                listValues.list
                                    ? taskLists.find(
                                          (taskList) =>
                                              taskList.value === listValues.list
                                      )
                                    : null
                            }
                            onChange={(event, newValue) => {
                                updateListValues({
                                    list: newValue ? newValue.value : null,
                                });
                            }}
                            options={taskLists}
                            renderInput={(params) => (
                                <TextField {...params} label="list" />
                            )}
                        />
                        {['specificDate'].indexOf(listValues.list) !== -1 && (
                            <DateTimePicker
                                label="When?"
                                value={
                                    listValues.listSpecificDateDate
                                        ? parseISO(
                                              listValues.listSpecificDateDate
                                          )
                                        : null
                                }
                                onChange={(value) =>
                                    updateListValues({
                                        listSpecificDateDate: value,
                                    })
                                }
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        required
                                        InputProps={{
                                            endAdornment: (
                                                <IconButton
                                                    sx={{
                                                        visibility:
                                                            listValues.listSpecificDateDate
                                                                ? 'visible'
                                                                : 'hidden',
                                                    }}
                                                    onClick={() =>
                                                        updateListValues({
                                                            listSpecificDateDate:
                                                                null,
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
                        )}
                        {['someday', 'delegated'].indexOf(listValues.list) !==
                            -1 && (
                            <DateTimePicker
                                label="Remind me at"
                                value={
                                    listValues.remindMeAt
                                        ? parseISO(listValues.remindMeAt)
                                        : null
                                }
                                onChange={(value) =>
                                    updateListValues({
                                        remindMeAt: value,
                                    })
                                }
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        InputProps={{
                                            endAdornment: (
                                                <IconButton
                                                    sx={{
                                                        visibility:
                                                            listValues.remindMeAt
                                                                ? 'visible'
                                                                : 'hidden',
                                                    }}
                                                    onClick={() =>
                                                        updateListValues({
                                                            remindMeAt: null,
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
                        )}
                        {['doNext', 'someday'].indexOf(listValues.list) !==
                            -1 && (
                            <DateTimePicker
                                label="Due at"
                                value={
                                    listValues.dueAt
                                        ? parseISO(listValues.dueAt)
                                        : null
                                }
                                onChange={(value) =>
                                    updateListValues({
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
                                                        visibility:
                                                            listValues.dueAt
                                                                ? 'visible'
                                                                : 'hidden',
                                                    }}
                                                    onClick={() =>
                                                        updateListValues({
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
                        )}
                    </Paper>
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
