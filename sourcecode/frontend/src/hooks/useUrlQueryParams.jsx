import React from 'react';
import { useLocation } from 'react-router-dom';

const useUrlQueryParams = () => {
    const { search } = useLocation();

    return React.useMemo(() => {
        return new URLSearchParams(search);
    }, [search]);
};

export default useUrlQueryParams;
