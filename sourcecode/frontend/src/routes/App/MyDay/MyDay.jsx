import React from 'react';
import * as DateFNS from 'date-fns';
import { Box, Grid, Paper, Tab, Tabs } from '@mui/material';
import TaskEditModal from '../../../components/TaskEditModal';
import { PageContent } from '../../../components/Page';
import DefaultHookQuery from '../../../components/DefaultHookQuery';
import DateSpecificTable from './DateSpecificTable';
import DoNextTable from './DoNextTable';
import DelegatedTable from './DelegatedTable';
import SomedayTable from './SomedayTable';

export const tabs = [
    {
        name: 'Date specific',
        value: 'specificDate',
        filters: {
            listSpecificDateDateBefore: DateFNS.endOfDay(
                DateFNS.addDays(new Date(), 7)
            ),
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
    {
        name: 'Some day',
        value: 'someday',
        filters: {
            list: 'someday',
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
                        <DefaultHookQuery queryHookData={queryHookData}>
                            {({ data, refetch }) => {
                                const tasks = tabInfo.order
                                    ? tabInfo.order(data.tasks)
                                    : data.tasks;
                                switch (tabInfo.value) {
                                    case 'specificDate':
                                        return (
                                            <DateSpecificTable
                                                setSelectedTaskToEdit={
                                                    setSelectedTaskToEdit
                                                }
                                                tasks={tasks}
                                            />
                                        );
                                    case 'doNext':
                                        return (
                                            <DoNextTable
                                                setSelectedTaskToEdit={
                                                    setSelectedTaskToEdit
                                                }
                                                tasks={tasks}
                                            />
                                        );
                                    case 'delegated':
                                        return (
                                            <DelegatedTable
                                                setSelectedTaskToEdit={
                                                    setSelectedTaskToEdit
                                                }
                                                tasks={tasks}
                                            />
                                        );
                                    case 'someday':
                                        return (
                                            <SomedayTable
                                                setSelectedTaskToEdit={
                                                    setSelectedTaskToEdit
                                                }
                                                tasks={tasks}
                                            />
                                        );
                                }
                            }}
                        </DefaultHookQuery>
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
