import React from 'react';
import {
    Box,
    Button,
    Checkbox,
    Container,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@mui/material';
import TaskRow from './TaskRow';

const Project = ({ project }) => {
    return (
        <Container>
            <Grid container>
                <Grid item xs={12}>
                    <Paper component={Box} p={2} mt={2}>
                        <h1>{project.name}</h1>
                    </Paper>
                    <Paper component={Box} p={2} mt={2}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <strong>Name</strong>
                                    </TableCell>
                                    <TableCell>
                                        <strong>Done</strong>
                                    </TableCell>
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
                            </TableBody>
                        </Table>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Project;
