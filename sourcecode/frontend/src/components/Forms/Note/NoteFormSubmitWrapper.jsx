import React from 'react';
import formComponentContext from '../../../contexts/formComponent';

const NoteFormSubmitWrapper = ({ children }) => {
    const { onSubmit } = React.useContext(formComponentContext);

    return children(onSubmit);
};

export default NoteFormSubmitWrapper;
