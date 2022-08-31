import React from 'react';
import * as DateFNS from 'date-fns';
import { Box } from '@mui/material';

const Calendar = () => {
    const [selectedDay, setSelectedDay] = React.useState(() => new Date());

    return (
        <Box>
            <Box>{DateFNS.format(selectedDay, 'LLLL yyyy')}</Box>
            <Box></Box>
        </Box>
    );
};

export default Calendar;
