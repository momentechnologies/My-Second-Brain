import React from 'react';
import CreateGprScan from './CreateGprScan';
import { gql, useMutation } from '@apollo/client';
import { useArrayV2 } from 'moment-hooks';
import { useNavigate } from 'react-router-dom';

const CREATE_POLE_GPR_SCAN = gql`
    mutation CreatePoleGprScan($data: CreatePoleGprScanInput!) {
        createPoleGprScan(data: $data) {
            id
            tags {
                tag
            }
        }
    }
`;

const CreateGprScanContainer = () => {
    let navigate = useNavigate();

    const [createPoleGprScans, { error, loading }] =
        useMutation(CREATE_POLE_GPR_SCAN);
    const [values, setValues] = React.useState({
        poleId: '',
        heightFromGround: '',
        proceqLink: '',
        // Correct default value
        polarizationDirection: 'up',
        withPec: false,
        comment: '',
    });

    const tags = useArrayV2([]);

    return (
        <CreateGprScan
            values={values}
            tags={tags}
            setValues={(key, value) =>
                setValues({
                    ...values,
                    [key]: value,
                })
            }
            onSubmit={() =>
                createPoleGprScans({
                    variables: {
                        data: {
                            ...values,
                            heightFromGround: parseFloat(
                                values.heightFromGround
                            ),
                            comment:
                                values.comment.length === 0
                                    ? null
                                    : values.comment,
                            tags: tags.value,
                        },
                    },
                }).then(() => {
                    navigate('/gpr-scans');
                })
            }
            createGprScanStatus={{
                error,
                loading,
            }}
        />
    );
};

export default CreateGprScanContainer;
