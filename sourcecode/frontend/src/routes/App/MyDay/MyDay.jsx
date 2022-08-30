import React from 'react';
import {
    Box,
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

const MyDay = ({ tasks }) => {
    return (
        <Container>
            <Grid container>
                <Grid item xs={12}>
                    <Paper component={Box} p={2} mt={2}>
                        <h1>My day</h1>
                    </Paper>
                    <Paper component={Box} p={2} mt={2}>
                        <h2>Tasks</h2>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell variant="head">Task</TableCell>
                                    <TableCell variant="head">
                                        Project
                                    </TableCell>
                                    <TableCell />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tasks.map((task) => (
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

export default MyDay;
