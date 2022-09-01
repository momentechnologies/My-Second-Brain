const checkUndefinedParameters = (parameters) => {
    parameters.forEach(([name, value]) => {
        if (value === undefined) {
            throw new Error(`Missing required parameter "${name}"`);
        }
    });
};

export default checkUndefinedParameters;
