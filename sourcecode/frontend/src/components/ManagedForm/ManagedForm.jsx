import React from 'react';
import managedFormContext from './managedFormContext';

const ManagedForm = ({ children, error }) => {
    return (
        <managedFormContext.Provider
            value={{
                error,
            }}
        >
            {children}
        </managedFormContext.Provider>
    );
};

export default ManagedForm;
