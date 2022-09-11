import React from 'react';
import {
    Box,
    Button,
    Container,
    Grid,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@mui/material';
import DefaultHookQuery from '../../../components/DefaultHookQuery';
import { Link, useNavigate } from 'react-router-dom';
import { PageContent } from '../../../components/Page';

const Nodes = ({ queryHookData }) => {
    const navigate = useNavigate();
    return (
        <PageContent title={'Nodes'}>
            <Grid container>
                <Grid item xs={12}>
                    <Paper component={Box} p={2} mt={2}>
                        <Stack spacing={1}>
                            <Box>
                                <Button
                                    component={Link}
                                    variant="contained"
                                    to="create"
                                >
                                    New top level node
                                </Button>
                            </Box>
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
                                    <DefaultHookQuery
                                        queryHookData={queryHookData}
                                    >
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
                        </Stack>
                    </Paper>
                </Grid>
            </Grid>
        </PageContent>
    );
};

export default Nodes;
