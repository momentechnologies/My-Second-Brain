import React from 'react';
import { Checkbox, TableCell, TableRow } from '@mui/material';
import { gql, useMutation } from '@apollo/client';

const UPDATE_TASK = gql`
    mutation UpdateTask($id: Int!, $data: UpdateTaskInput!) {
        updateTask(id: $id, data: $data) {
            id
            isDone
        }
    }
`;

const TaskRow = ({ task, startValueIsDone = false }) => {
    const [updateTask, updateMetadata] = useMutation(UPDATE_TASK);
    const [done, setDone] = React.useState(startValueIsDone);

    return (
        <TableRow>
            <TableCell>{task.name}</TableCell>
            <TableCell>
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
                />
            </TableCell>
        </TableRow>
    );
};

export default TaskRow;
