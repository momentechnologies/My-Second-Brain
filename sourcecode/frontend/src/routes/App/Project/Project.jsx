import React from 'react';
import {
    Box,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@mui/material';
import TaskRow from './TaskRow';
import { PageContent } from '../../../components/Page';
import CreateTaskContainer from '../../../containers/CreateTaskContainer';
import { ManagedTextField } from '../../../components/ManagedForm';

const Project = ({ project, refetch }) => {
    return (
        <PageContent title={project.name}>
            <Grid container spacing={1}>
                <Grid item md={6}>
                    <Paper component={Box} p={2} mt={2}>
                        <h2>Tasks</h2>
                        <Table size={'small'}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <strong>Task</strong>
                                    </TableCell>
                                    <TableCell />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {project.tasks.map((task) => (
                                    <TaskRow
                                        key={task.id}
                                        task={task}
                                        startValueIsDone={task.isDone}
                                    />
                                ))}
                                <TableRow>
                                    <TableCell>
                                        <CreateTaskContainer
                                            contextValues={{
                                                projectId: project.id,
                                            }}
                                            onCreated={() => refetch()}
                                        >
                                            {({ setValue, values }) => (
                                                <ManagedTextField
                                                    inputKey="name"
                                                    name={'taskName'}
                                                    value={values.name}
                                                    onChange={(e) =>
                                                        setValue(
                                                            'name',
                                                            e.target.value
                                                        )
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
                </Grid>
                <Grid item md={6}>
                    <Paper component={Box} p={2} mt={2}>
                        <h2>Notes</h2>
                    </Paper>
                </Grid>
            </Grid>
        </PageContent>
    );
};

export default Project;
