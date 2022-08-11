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
    TextField,
} from '@mui/material';
import { Link } from 'react-router-dom';
import TagsInput from '../../components/TagsInput';
import DefaultHookQuery from '../../components/DefaultHookQuery';

const GprScans = ({ filters, tags, queryHookData }) => {
    return (
        <Container>
            <Grid container>
                <Grid item xs={12}>
                    <Paper component={Box} p={2} mt={2}>
                        <Button
                            variant="contained"
                            component={Link}
                            to="create"
                        >
                            Create new Gpr scan
                        </Button>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper component={Box} p={2} mt={2}>
                        <h2>Filters</h2>
                        <Stack spacing={2}>
                            <TextField
                                value={filters.userDefinedPoleId.value}
                                onChange={(e) =>
                                    filters.userDefinedPoleId.set(
                                        e.target.value
                                    )
                                }
                                label="User defined Pole ID"
                            />
                            <TagsInput tags={tags} />
                        </Stack>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper component={Box} p={2} mt={2}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <strong>ID</strong>
                                    </TableCell>
                                    <TableCell>
                                        <strong>Pole ID</strong>
                                    </TableCell>
                                    <TableCell>
                                        <strong>Height from ground</strong>
                                    </TableCell>
                                    <TableCell>
                                        <strong>Polarization direction</strong>
                                    </TableCell>
                                    <TableCell>
                                        <strong>With pec</strong>
                                    </TableCell>
                                    <TableCell>
                                        <strong>Comment</strong>
                                    </TableCell>
                                    <TableCell>
                                        <strong>Created at</strong>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <DefaultHookQuery queryHookData={queryHookData}>
                                    {({ data, refetch }) => {
                                        return (
                                            <>
                                                {data.poleGprScans.map(
                                                    ({
                                                        id,
                                                        createdAt,
                                                        pole,
                                                        heightFromGround,
                                                        polarizationDirection,
                                                        withPec,
                                                        comment,
                                                    }) => (
                                                        <TableRow key={id}>
                                                            <TableCell>
                                                                {id}
                                                            </TableCell>
                                                            <TableCell>
                                                                {pole.id} (User
                                                                defined ID:
                                                                {
                                                                    pole.userDefinedId
                                                                }
                                                                )
                                                            </TableCell>
                                                            <TableCell>
                                                                {
                                                                    heightFromGround
                                                                }
                                                            </TableCell>
                                                            <TableCell>
                                                                {
                                                                    polarizationDirection
                                                                }
                                                            </TableCell>
                                                            <TableCell>
                                                                {withPec
                                                                    ? 'Yes'
                                                                    : 'No'}
                                                            </TableCell>
                                                            <TableCell>
                                                                {comment}
                                                            </TableCell>
                                                            <TableCell>
                                                                {createdAt}
                                                            </TableCell>
                                                        </TableRow>
                                                    )
                                                )}
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

export default GprScans;
