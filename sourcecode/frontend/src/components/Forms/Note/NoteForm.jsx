import React from 'react';
import { Box, Button, Stack } from '@mui/material';
import { ManagedForm, ManagedTextField } from '../../../components/ManagedForm';
import { Editor } from '../../../components/Editor';
import ManagedFormControl from '../../../components/ManagedForm/ManagedFormControl';
import NodePicker from '../../NodePicker';
import formComponentContext from '../../../contexts/formComponent';

const NoteForm = ({ hideParentNodeIdInput }) => {
    const { values, startValues, setValue, error } =
        React.useContext(formComponentContext);

    return (
        <ManagedForm error={error}>
            <Stack spacing={2}>
                <ManagedTextField
                    inputKey="name"
                    value={values.name}
                    onChange={(e) => setValue('name', e.target.value)}
                    label="Name"
                    fullWidth
                    required
                />
                {!hideParentNodeIdInput && (
                    <NodePicker
                        onSetNodeId={(id) => setValue('parentNodeId', id)}
                    />
                )}
                <Box>
                    <ManagedFormControl inputKey="content" fullWidth>
                        {(hasErrors) => (
                            <Editor
                                initialEditorState={
                                    startValues && startValues.content
                                }
                                onChange={(editorState) =>
                                    setValue('content', editorState)
                                }
                            />
                        )}
                    </ManagedFormControl>
                </Box>
            </Stack>
        </ManagedForm>
    );
};

export default NoteForm;
