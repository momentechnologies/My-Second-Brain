import React from 'react';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { gql, useMutation } from '@apollo/client';
import { AttachMoney as AttachMoneyIcon } from '@mui/icons-material';

const CREATE_BILLING_PAGE_LINK = gql`
    mutation CreateBillingPageLink($returnUrl: String!) {
        createBillingPageLink(returnUrl: $returnUrl) {
            url
        }
    }
`;

const LoadBillingButton = () => {
    const [createBillingPageLink] = useMutation(CREATE_BILLING_PAGE_LINK);

    return (
        <ListItemButton
            onClick={() => {
                console.log('here');
                createBillingPageLink({
                    variables: {
                        returnUrl: window.location.href,
                    },
                }).then(({ data }) => {
                    window.location.replace(data.createBillingPageLink.url);
                });
            }}
        >
            <ListItemIcon>
                <AttachMoneyIcon />
            </ListItemIcon>
            <ListItemText primary="Billing" />
        </ListItemButton>
    );
};

export default LoadBillingButton;
