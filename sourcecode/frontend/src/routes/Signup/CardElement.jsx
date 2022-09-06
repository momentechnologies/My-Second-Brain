import React from 'react';
import {
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement,
} from '@stripe/react-stripe-js';
import { Stack, TextField } from '@mui/material';

const StripeInput = React.forwardRef(
    ({ component: Component, inputRef, ...other }, ref) => {
        const elementRef = React.useRef();

        React.useImperativeHandle(ref, () => ({
            focus: () => elementRef.current.focus,
        }));

        return (
            <Component
                onReady={(element) => (elementRef.current = element)}
                {...other}
            />
        );
    }
);

const CardElement = () => {
    return (
        <>
            <TextField
                label="Credit Card Number"
                name="ccnumber"
                variant="outlined"
                required
                fullWidth
                InputLabelProps={{ shrink: true }}
                InputProps={{
                    inputComponent: StripeInput,
                    inputProps: {
                        component: CardNumberElement,
                    },
                }}
            />
            <Stack direction={'row'} spacing={1}>
                <TextField
                    label="Expiration Date"
                    name="ccexp"
                    variant="outlined"
                    required
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                        inputComponent: StripeInput,
                        inputProps: {
                            component: CardExpiryElement,
                        },
                    }}
                />
                <TextField
                    label="CVC"
                    name="cvc"
                    variant="outlined"
                    required
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                        inputComponent: StripeInput,
                        inputProps: {
                            component: CardCvcElement,
                        },
                    }}
                />
            </Stack>
        </>
    );
};

export default CardElement;
