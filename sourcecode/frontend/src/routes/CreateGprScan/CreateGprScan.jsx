import React from 'react';
import {
    Alert,
    Box,
    Button,
    Checkbox,
    Container,
    FormControlLabel,
    FormGroup,
    Grid,
    MenuItem,
    Paper,
    Stack,
    TextField,
} from '@mui/material';
import TagsInput from '../../components/TagsInput';

const CreateGprScan = ({
    values,
    setValues,
    onSubmit,
    tags,
    createGprScanStatus,
}) => {
    return (
        <Container>
            <Grid container>
                <Grid item xs={12}>
                    <Paper component={Box} p={2} mt={2}>
                        <h2>Create new gpr scan</h2>
                        <Stack spacing={2}>
                            <TextField
                                value={values.poleId}
                                onChange={(e) =>
                                    setValues('poleId', e.target.value)
                                }
                                label="Pole ID"
                                helperText="Enter the ID of the pole (not the number)."
                                fullWidth
                                required
                            />
                            <TextField
                                value={values.proceqLink}
                                onChange={(e) =>
                                    setValues('proceqLink', e.target.value)
                                }
                                label="Proceq link"
                                helperText="Go to the proceq app and copy the export link."
                                fullWidth
                                required
                            />
                            <TextField
                                type="number"
                                inputProps={{
                                    step: 0.01,
                                }}
                                value={values.heightFromGround}
                                onChange={(e) =>
                                    setValues(
                                        'heightFromGround',
                                        e.target.value
                                    )
                                }
                                label="Height from ground in meters"
                                fullWidth
                                required
                            />

                            <TextField
                                value={values.polarizationDirection}
                                onChange={(e) =>
                                    setValues(
                                        'polarizationDirection',
                                        e.target.value
                                    )
                                }
                                label="Polarization direction"
                                fullWidth
                                required
                                select
                            >
                                {[
                                    { value: 'up', label: 'up' },
                                    { value: 'down', label: 'down' },
                                ].map(({ value, label }) => (
                                    <MenuItem key={value} value={value}>
                                        {label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                value={values.comment}
                                onChange={(e) =>
                                    setValues('comment', e.target.value)
                                }
                                label="Comment"
                                fullWidth
                            />
                            <FormGroup>
                                <FormControlLabel
                                    checked={values.withPec}
                                    onChange={() =>
                                        setValues('withPec', !values.withPec)
                                    }
                                    control={<Checkbox />}
                                    label="With pec"
                                />
                            </FormGroup>
                            <TagsInput tags={tags} />
                            {createGprScanStatus.error && (
                                <Alert color="error">
                                    {createGprScanStatus.error.message}
                                </Alert>
                            )}
                            <Box mt={1}>
                                <Button variant="contained" onClick={onSubmit}>
                                    Create
                                </Button>
                            </Box>
                        </Stack>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default CreateGprScan;
