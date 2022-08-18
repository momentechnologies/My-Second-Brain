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
import DefaultHookQuery from '../../../components/DefaultHookQuery';
import TaskRow from './TaskRow';

const Process = ({ queryHookData }) => {
    return (
        <Container>
            <Grid container>
                <Grid item xs={12}>
                    <Paper component={Box} p={2} mt={2}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <strong>Name</strong>
                                    </TableCell>
                                    <TableCell>
                                        <strong>Project</strong>
                                    </TableCell>
                                    <TableCell width={40} />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <DefaultHookQuery queryHookData={queryHookData}>
                                    {({ data, refetch }) => {
                                        return (
                                            <>
                                                {data.tasks.map((task) => (
                                                    <TaskRow
                                                        key={task.id}
                                                        task={task}
                                                        onDeleted={() =>
                                                            refetch()
                                                        }
                                                    />
                                                ))}
                                            </>
                                        );
                                    }}
                                </DefaultHookQuery>
                            </TableBody>
                        </Table>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Process;
