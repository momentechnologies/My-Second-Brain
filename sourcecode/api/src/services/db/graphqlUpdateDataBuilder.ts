export const graphqlUpdateDataBuilder = async (
    data: { [key: string]: any },
    parameters: { [key: string]: (value: any) => Promise<any> }
) => {
    const result: {
        [key in keyof typeof parameters]: any;
    } = {};

    for (let key of Object.keys(parameters)) {
        if (data[key] !== undefined) {
            result[key] = await parameters[key](data[key]);
        }
    }

    return result;
};
