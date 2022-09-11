import React from 'react';
import { Grid, Tab, Tabs } from '@mui/material';
import { PageContent } from '../../../components/Page';
import ProcessTasks from './ProcessTasks';
import ProcessNotes from './ProcessNotes';

const Process = () => {
    const [selectedTab, setSelectedTab] = React.useState(0);

    return (
        <PageContent title={'Process'}>
            <Grid container>
                <Grid item xs={12}>
                    <Tabs
                        value={selectedTab}
                        onChange={(e, index) => setSelectedTab(index)}
                    >
                        <Tab label={'Tasks'} />
                        <Tab label={'Notes'} />
                    </Tabs>
                </Grid>
                <Grid item xs={12}>
                    {selectedTab === 0 && <ProcessTasks />}
                    {selectedTab === 1 && <ProcessNotes />}
                </Grid>
            </Grid>
        </PageContent>
    );
};

export default Process;
