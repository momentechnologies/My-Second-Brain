import React from 'react';
import SetupSubscription from './SetupSubscription';
import { gql, useMutation } from '@apollo/client';
import useUrlQueryParams from '../../hooks/useUrlQueryParams';
import startupContext from '../../contexts/startup';

const START_PAYMENT_PAGE = gql`
    mutation StartPaymentPage {
        startPaymentPage {
            url
        }
    }
`;

const CONFIRM_SUBSCRIPTION = gql`
    mutation ConfirmSubscription($sessionId: String!) {
        confirmSubscription(sessionId: $sessionId)
    }
`;

const SetupSubscriptionContainer = () => {
    const { refetch } = React.useContext(startupContext);

    const [startPaymentPage, startPaymentPageStatus] =
        useMutation(START_PAYMENT_PAGE);
    const [confirmSubscription, confirmSubscriptionStatus] =
        useMutation(CONFIRM_SUBSCRIPTION);

    const query = useUrlQueryParams();

    React.useEffect(() => {
        const success = query.get('success');
        const sessionId = query.get('session_id');
        if (!success || !sessionId) {
            return;
        }

        confirmSubscription({
            variables: {
                sessionId,
            },
        }).then(() => {
            refetch();
        });
    }, [query]);

    return (
        <SetupSubscription
            signupStatus={startPaymentPageStatus}
            onSubmit={() => {
                startPaymentPage().then(({ data }) =>
                    window.location.replace(data.startPaymentPage.url)
                );
            }}
            isReadyToBeSubmitted={false}
        />
    );
};

export default SetupSubscriptionContainer;
