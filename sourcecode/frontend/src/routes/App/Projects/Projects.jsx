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
import { useNavigate } from 'react-router-dom';
import { PageContent } from '../../../components/Page';

const Projects = ({ queryHookData, onCreateNew }) => {
    const navigate = useNavigate();

    return (
        <PageContent title={'Projects'}>
            <Grid container>
                <Grid item xs={12}>
                    <Paper component={Box} p={2} mt={2}>
                        <Stack spacing={1}>
                            <Box>
                                <Button
                                    variant="contained"
                                    onClick={() => onCreateNew()}
                                >
                                    New Project
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
                                                    {data.projects.map(
                                                        (project) => (
                                                            <TableRow
                                                                key={project.id}
                                                                hover
                                                                onClick={() =>
                                                                    navigate(
                                                                        String(
                                                                            project.id
                                                                        )
                                                                    )
                                                                }
                                                            >
                                                                <TableCell>
                                                                    {
                                                                        project.name
                                                                    }
                                                                </TableCell>
                                                                <TableCell>
                                                                    {
                                                                        project.status
                                                                    }
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
                        </Stack>
                    </Paper>
                </Grid>
            </Grid>
        </PageContent>
    );
};

export default Projects;
