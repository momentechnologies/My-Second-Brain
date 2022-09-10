export const isUniqueError = (e: any) => {
    if (e && e.code && e.code === '23505') {
        return true;
    }

    return false;
};
