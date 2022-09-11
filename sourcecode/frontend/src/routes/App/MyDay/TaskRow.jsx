import React from 'react';
import { Checkbox, Chip, TableCell, TableRow } from '@mui/material';
import { gql, useMutation } from '@apollo/client';
import * as DateFNS from 'date-fns';

const UPDATE_TASK = gql`
    mutation UpdateTask($id: Int!, $data: UpdateTaskInput!) {
        updateTask(id: $id, data: $data) {
            id
            isDone
        }
    }
`;

const getDueString = (dueAt) => {
    const nowDate = new Date();
    if (DateFNS.isToday(dueAt)) {
        return `Today at ${DateFNS.format(dueAt, 'HH:mm')}`;
    }

    if (DateFNS.isTomorrow(dueAt)) {
        return `Tomorrow at ${DateFNS.format(dueAt, 'HH:mm')}`;
    }

    const diffInDays = Math.abs(DateFNS.differenceInDays(nowDate, dueAt));

    if (DateFNS.isBefore(dueAt, nowDate)) {
        return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    }

    return `In ${diffInDays} day${diffInDays > 1 ? 's' : ''}`;
};

const useDueInfo = (task) => {
    if (!task.listSpecificDateDate) {
        return {
            dueString: null,
            color: '',
        };
    }

    const date = DateFNS.parseISO(task.listSpecificDateDate);
    const nowDate = new Date();

    return {
        dueString: getDueString(date),
        color: DateFNS.isBefore(date, nowDate)
            ? 'error'
            : DateFNS.isBefore(nowDate, DateFNS.addDays(date, 1))
            ? 'warning'
            : '',
    };
};

const TaskRow = ({ task, startValueIsDone = false, onClick }) => {
    const [updateTask, updateMetadata] = useMutation(UPDATE_TASK);
    const [done, setDone] = React.useState(startValueIsDone);

    const dueInfo = useDueInfo(task);

    return (
        <TableRow onClick={onClick} hover>
            <TableCell>{task.name}</TableCell>
            <TableCell>{task.project && task.project.name}</TableCell>
            <TableCell>
                {dueInfo.dueString && (
                    <Chip color={dueInfo.color} label={dueInfo.dueString} />
                )}
            </TableCell>
            <TableCell align="right">
                <Checkbox
                    checked={done}
                    onChange={() => {
                        const newDoneValue = !done;
                        setDone(newDoneValue);
                        updateTask({
                            variables: {
                                id: task.id,
                                data: {
                                    isDone: newDoneValue,
                                },
                            },
                        });
                    }}
                    onClick={(e) => e.stopPropagation()}
                />
            </TableCell>
        </TableRow>
    );
};

export default TaskRow;
