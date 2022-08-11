import React from 'react';
import * as Sentry from '@sentry/react';

import AuthContext from '../../contexts/auth';

const AuthProvider = ({
    loading,
    data,
    children,
    refetch,
    logout,
    isLoggedOut,
}) => {
    const user =
        !isLoggedOut && data && data.auth && data.auth.user
            ? data.auth.user
            : null;

    React.useEffect(() => {
        if (user) {
            console.log(
                `Setting user with sentry. id: ${user.id}, email: ${user.email}`
            );
            Sentry.configureScope((scope) => {
                scope.setUser({
                    id: user.id,
                    email: user.email,
                });
            });
        }
    }, [user]);

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated: !!user,
                isAuthenticating: !isLoggedOut && loading,
                isAdmin: user && user.isAdmin,
                user,
                refetch,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
