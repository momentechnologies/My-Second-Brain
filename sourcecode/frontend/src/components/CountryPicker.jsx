import React from 'react';
import countries from '../constants/countries';
import { Autocomplete, Box, TextField } from '@mui/material';

const CountryPicker = ({ value, onChange }) => {
    return (
        <Autocomplete
            sx={{ width: '100%' }}
            value={countries.find((country) => country.code === value)}
            onChange={(event, newValue) => {
                onChange(newValue ? newValue.code : null);
            }}
            options={countries}
            autoHighlight
            getOptionLabel={(option) => option.label}
            renderOption={(props, option) => (
                <Box
                    component="li"
                    sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                    {...props}
                >
                    <img
                        loading="lazy"
                        width="20"
                        src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                        srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                        alt=""
                    />
                    {option.label} ({option.code})
                </Box>
            )}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Choose a country"
                    inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password', // disable autocomplete and autofill
                    }}
                />
            )}
        />
    );
};

export default CountryPicker;
