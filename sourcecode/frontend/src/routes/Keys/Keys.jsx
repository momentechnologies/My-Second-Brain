import React from 'react';
import {
    Alert,
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

const Keys = ({ keys, onCreate, newKeyValue, createKeyStatus, onDelete }) => {
    return (
        <Container>
            <Grid container>
                <Grid item xs={12}>
                    <Paper component={Box} p={2} mt={2}>
                        <Button variant="contained" onClick={() => onCreate()}>
                            New API Key
                        </Button>
                        {newKeyValue && (
                            <Alert component={Box} mt={1}>
                                New key created. Copy it now as it will not be
                                shown again:
                                <p>
                                    <strong>{newKeyValue}</strong>
                                </p>
                            </Alert>
                        )}
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <strong>Key ID</strong>
                                    </TableCell>
                                    <TableCell>
                                        <strong>Last used</strong>
                                    </TableCell>
                                    <TableCell>
                                        <strong>Actions</strong>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {keys.map(({ id, lastUsed }) => (
                                    <TableRow key={id}>
                                        <TableCell>{id}</TableCell>
                                        <TableCell>{lastUsed}</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                color="error"
                                                onClick={() => onDelete(id)}
                                            >
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Keys;
