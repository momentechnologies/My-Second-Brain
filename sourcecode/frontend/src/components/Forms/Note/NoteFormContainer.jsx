import React from 'react';
import NoteForm from './NoteForm';
import { gql, useMutation } from '@apollo/client';
import formComponentContext from '../../../contexts/formComponent';

const CREATE_NOTE = gql`
    mutation CreateNote($data: CreateNoteInput!) {
        createNote(data: $data) {
            id
            name
            content
            parentNodeId
        }
    }
`;

const UPDATE_NOTE = gql`
    mutation UpdateNote($id: Int!, $data: UpdateNoteInput!) {
        updateNote(id: $id, data: $data) {
            id
            name
            content
            parentNodeId
        }
    }
`;

const NoteFormContainer = ({ onSaved, startValues, children }) => {
    const isCreating = !startValues;
    const [values, setValues] = React.useState(
        startValues || {
            name: '',
            content: null,
            parentNodeId: null,
        }
    );
    const [createNote, createMetadata] = useMutation(CREATE_NOTE);
    const [updateNote, updateMetadata] = useMutation(UPDATE_NOTE);

    return (
        <formComponentContext.Provider
            value={{
                isCreating: isCreating,
                values: values,
                startValues: startValues,
                setValue: (key, value) =>
                    setValues({
                        ...values,
                        [key]: value,
                    }),
                onSubmit: () => {
                    if (!values.content) {
                        return;
                    }

                    const parsedValues = {
                        name: values.name,
                        content: JSON.stringify(values.content),
                        parentNodeId: values.parentNodeId,
                    };

                    let action;
                    if (!isCreating) {
                        action = updateNote({
                            variables: {
                                id: values.id,
                                data: parsedValues,
                            },
                        });
                    } else {
                        action = createNote({
                            variables: {
                                data: parsedValues,
                            },
                        });
                    }

                    action.then(({ data }) => {
                        onSaved(
                            isCreating ? data.createNote.id : data.updateNote.id
                        );
                    });
                },
                error: createMetadata.error || updateMetadata.error,
            }}
        >
            {children}
        </formComponentContext.Provider>
    );
    return (
        <NoteForm
            isCreating={isCreating}
            values={values}
            startValues={startValues}
            setValue={(key, value) =>
                setValues({
                    ...values,
                    [key]: value,
                })
            }
            onSubmit={() => {
                if (!values.content) {
                    return;
                }

                const parsedValues = {
                    name: values.name,
                    content: JSON.stringify(values.content),
                    parentNodeId: values.parentNodeId,
                };

                let action;
                if (!isCreating) {
                    action = updateNote({
                        variables: {
                            id: values.id,
                            data: parsedValues,
                        },
                    });
                } else {
                    action = createNote({
                        variables: {
                            data: parsedValues,
                        },
                    });
                }

                action.then(({ data }) => {
                    onSaved(
                        isCreating ? data.createNote.id : data.updateNote.id
                    );
                });
            }}
            error={createMetadata.error || updateMetadata.error}
        />
    );
};

export default NoteFormContainer;
