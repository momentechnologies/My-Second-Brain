import React from 'react';
import {
    Box,
    Button,
    Container,
    Grid,
    Paper,
    Stack,
    TextField,
} from '@mui/material';
import { ManagedForm, ManagedTextField } from '../../../components/ManagedForm';
import { Editor } from '../../../components/Editor';
import ManagedFormControl from '../../../components/ManagedForm/ManagedFormControl';

const EditNode = ({ initialValues, values, setValue, onSubmit, error }) => {
    return (
        <Container>
            <Grid container>
                <Grid item xs={12}>
                    <Paper component={Box} p={2} mt={2}>
                        <h1>Edit or Create new Node</h1>
                        <ManagedForm error={error}>
                            <Stack spacing={2}>
                                <ManagedTextField
                                    inputKey="name"
                                    value={values.name}
                                    onChange={(e) =>
                                        setValue('name', e.target.value)
                                    }
                                    label="Name"
                                    fullWidth
                                    required
                                />
                                <Box>
                                    <ManagedFormControl
                                        inputKey="content"
                                        fullWidth
                                    >
                                        {(hasErrors) => (
                                            <Editor
                                                initialEditorState={
                                                    initialValues &&
                                                    initialValues.content
                                                }
                                                onChange={(editorState) =>
                                                    setValue(
                                                        'content',
                                                        editorState
                                                    )
                                                }
                                            />
                                        )}
                                    </ManagedFormControl>
                                </Box>
                                <Box>
                                    <Button onClick={onSubmit}>
                                        {initialValues ? 'Update' : 'Create'}
                                    </Button>
                                </Box>
                            </Stack>
                        </ManagedForm>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default EditNode;
