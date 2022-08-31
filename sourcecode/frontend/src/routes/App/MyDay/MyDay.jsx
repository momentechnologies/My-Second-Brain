import React from 'react';
import {
    Box,
    Container,
    Grid,
    Paper,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Tabs,
} from '@mui/material';
import TaskRow from './TaskRow';

export const tabs = [
    {
        name: 'Do next',
        value: 'doNext',
    },
    {
        name: 'Delegated',
        value: 'delegated',
    },
];

const MyDay = ({ tasks, selectedTab, setSelectedTab }) => {
    return (
        <Container>
            <Grid container>
                <Grid item xs={12}>
                    <Paper component={Box} p={2} mt={2}>
                        <h1>My day</h1>
                    </Paper>
                    <Paper component={Box} p={2} mt={2}>
                        <h2>Tasks</h2>
                        <Box mb={2}>
                            <Tabs
                                value={selectedTab}
                                onChange={(e, index) => setSelectedTab(index)}
                            >
                                {tabs.map((tab, index) => (
                                    <Tab label={tab.name} key={index} />
                                ))}
                            </Tabs>
                        </Box>
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
