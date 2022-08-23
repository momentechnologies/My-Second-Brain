import React from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

const IntialState = ({ value, readOnly }) => {
    const [editor] = useLexicalComposerContext();

    React.useEffect(() => {
        if (value) {
            const initialEditorState = editor.parseEditorState(value);
            editor.setEditorState(initialEditorState);
        }
        if (readOnly) {
            editor.setReadOnly(true);
        }
    }, [value]);

    return <></>;
};

export default IntialState;
