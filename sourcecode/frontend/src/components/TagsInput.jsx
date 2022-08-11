import React from 'react';
import { Autocomplete, Box, Chip, TextField } from '@mui/material';

const TagsInput = ({ tags }) => {
    return (
        <Box>
            <Autocomplete
                multiple
                options={[]}
                value={tags.value}
                onChange={(event, newValue) => {
                    console.log(newValue);
                    tags.setValue(newValue);
                }}
                renderInput={(params) => (
                    <TextField {...params} label="Tags" placeholder="Tags" />
                )}
                freeSolo
                renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                        <Chip
                            variant="outlined"
                            label={option}
                            {...getTagProps({ index })}
                        />
                    ))
                }
            />
        </Box>
    );
};

export default TagsInput;
