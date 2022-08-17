import React from 'react';
import {
    Box,
    Button,
    Chip,
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
import DefaultHookQuery from '../../../components/DefaultHookQuery';

const Projects = ({ queryHookData, onCreateNew, onUpdate }) => {
    return (
        <Container>
            <Grid container>
                <Grid item xs={12}>
                    <Paper component={Box} p={2} mt={2}>
                        <Button
                            variant="contained"
                            onClick={() => onCreateNew()}
                        >
                            New Project
                        </Button>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper component={Box} p={2} mt={2}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <strong>Name</strong>
                                    </TableCell>
                                    <TableCell>
                                        <strong>Status</strong>
                                    </TableCell>
                                    <TableCell>
                                        <strong>Actions</strong>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <DefaultHookQuery queryHookData={queryHookData}>
                                    {({ data, refetch }) => {
                                        return (
                                            <>
                                                {data.projects.map(
                                                    (project) => (
                                                        <TableRow
                                                            key={project.id}
                                                            hover
                                                        >
                                                            <TableCell>
                                                                {project.name}
                                                            </TableCell>
                                                            <TableCell>
                                                                {project.status}
                                                            </TableCell>
                                                            <TableCell>
                                                                <Button
                                                                    variant="contained"
                                                                    onClick={() =>
                                                                        onUpdate(
                                                                            project
                                                                        )
                                                                    }
                                                                >
                                                                    Edit
                                                                </Button>
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

export default Projects;
