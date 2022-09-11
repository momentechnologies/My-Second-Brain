import React from 'react';
import { Checkbox } from '@mui/material';
import { gql, useMutation } from '@apollo/client';

const UPDATE_TASK = gql`
    mutation UpdateTask($id: Int!, $data: UpdateTaskInput!) {
        updateTask(id: $id, data: $data) {
            id
            isDone
        }
    }
`;

const TaskDoneCheckbox = ({ taskId, startValueIsDone = false }) => {
    const [updateTask, updateMetadata] = useMutation(UPDATE_TASK);
    const [done, setDone] = React.useState(startValueIsDone);

    return (
        <Checkbox
            checked={done}
            onChange={() => {
                const newDoneValue = !done;
                setDone(newDoneValue);
                updateTask({
                    variables: {
                        id: taskId,
                        data: {
                            isDone: newDoneValue,
                        },
                    },
                });
            }}
            onClick={(e) => e.stopPropagation()}
        />
    );
};

export default TaskDoneCheckbox;
