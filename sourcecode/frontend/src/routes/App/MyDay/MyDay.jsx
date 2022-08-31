import React from 'react';
import * as DateFNS from 'date-fns';
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
import { Calendar } from '../../../components/Calendar';
import TaskEditModal from '../../../components/TaskEditModal';

export const tabs = [
    {
        name: 'Date tasks',
        value: 'doNext',
        filters: {
            dueBefore: DateFNS.endOfDay(DateFNS.addDays(new Date(), 5)),
        },
        order: (tasks) =>
            tasks.sort(
                (a, b) => DateFNS.parseISO(a.dueAt) - DateFNS.parseISO(b.dueAt)
            ),
    },
    {
        name: 'Do next',
        value: 'doNext',
        filters: {
            context: 'doNext',
        },
    },
    {
        name: 'Delegated',
        value: 'delegated',
        filters: {
            context: 'delegated',
        },
    },
];

const MyDay = ({ tasks, selectedTab, setSelectedTab }) => {
    const tabInfo = tabs[selectedTab];
    const [selectedTaskToEdit, setSelectedTaskToEdit] = React.useState(null);

    return (
        <>
            <Container>
                <Grid container>
                    <Grid item xs={12}>
                        <Paper component={Box} p={2} mt={2}>
                            <h1>My day</h1>
                            <Calendar />
                        </Paper>
                        <Paper component={Box} p={2} mt={2}>
                            <h2>Tasks</h2>
                            <Box mb={2}>
                                <Tabs
                                    value={selectedTab}
                                    onChange={(e, index) =>
                                        setSelectedTab(index)
                                    }
                                >
                                    {tabs.map((tab, index) => (
                                        <Tab label={tab.name} key={index} />
                                    ))}
                                </Tabs>
                            </Box>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell variant="head">
                                            Task
                                        </TableCell>
                                        <TableCell variant="head">
                                            Project
                                        </TableCell>
                                        <TableCell variant="head">
                                            Due at
                                        </TableCell>
                                        <TableCell />
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {(tabInfo.order
                                        ? tabInfo.order(tasks)
                                        : tasks
                                    ).map((task) => (
                                        <TaskRow
                                            key={task.id}
                                            task={task}
                                            startValueIsDone={task.isDone}
                                            onClick={() =>
                                                setSelectedTaskToEdit(task)
                                            }
                                        />
                                    ))}
                                </TableBody>
                            </Table>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
            <TaskEditModal
                task={selectedTaskToEdit}
                onClose={() => setSelectedTaskToEdit(null)}
                onUpdated={(updatedTask) => {
                    setSelectedTaskToEdit({
                        ...selectedTaskToEdit,
                        ...updatedTask,
                    });
                }}
            />
        </>
    );
};

export default MyDay;
