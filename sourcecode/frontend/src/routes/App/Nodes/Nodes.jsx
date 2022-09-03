import React from 'react';
import {
    Box,
    Button,
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
import { Link, useNavigate } from 'react-router-dom';

const Nodes = ({ queryHookData, onUpdate }) => {
    const navigate = useNavigate();
    return (
        <Container>
            <Grid container>
                <Grid item xs={12}>
                    <Paper component={Box} p={2} mt={2}>
                        <Button
                            component={Link}
                            variant="contained"
                            to="create"
                        >
                            New top level node
                        </Button>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper component={Box} p={2} mt={2}>
                        <Table size={'small'}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <strong>Name</strong>
                                    </TableCell>
                                    <TableCell>
                                        <strong>Status</strong>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <DefaultHookQuery queryHookData={queryHookData}>
                                    {({ data, refetch }) => {
                                        return (
                                            <>
                                                {data.nodes.map((node) => (
                                                    <TableRow
                                                        key={node.id}
                                                        hover
                                                        onClick={() =>
                                                            navigate(
                                                                '/app/nodes/' +
                                                                    node.id
                                                            )
                                                        }
                                                    >
                                                        <TableCell>
                                                            {node.name}
                                                        </TableCell>
                                                        <TableCell>
                                                            {node.status}
                                                        </TableCell>
                                                    </TableRow>
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

export default Nodes;
