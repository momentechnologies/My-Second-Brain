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
import { PageContent } from '../../../components/Page';
import DefaultHookQuery from '../../../components/DefaultHookQuery';

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
            list: 'doNext',
        },
    },
    {
        name: 'Delegated',
        value: 'delegated',
        filters: {
            list: 'delegated',
        },
    },
];

const MyDay = ({ queryHookData, selectedTab, setSelectedTab }) => {
    const tabInfo = tabs[selectedTab];
    const [selectedTaskToEdit, setSelectedTaskToEdit] = React.useState(null);

    return (
        <PageContent title={'My day'}>
            <Grid container>
                <Grid item xs={12}>
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
                                    <TableCell variant="head">Due at</TableCell>
                                    <TableCell />
                                </TableRow>
                            </TableHead>
                            <DefaultHookQuery queryHookData={queryHookData}>
                                {({ data, refetch }) => (
                                    <TableBody>
                                        {(tabInfo.order
                                            ? tabInfo.order(data.tasks)
                                            : data.tasks
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
                                )}
                            </DefaultHookQuery>
                        </Table>
                    </Paper>
                </Grid>
            </Grid>
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
        </PageContent>
    );
};

export default MyDay;
