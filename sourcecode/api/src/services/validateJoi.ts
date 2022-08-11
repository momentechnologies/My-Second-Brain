import _ from 'lodash';
import ValidationException, {
    validationTypes,
    validationError,
} from '../exceptions/validation';
import { AnySchema } from 'joi';

const validateJoi = (data: any, schema: AnySchema) => {
    const result = schema.validate(data, {
        abortEarly: false,
        stripUnknown: true,
    });

    if (result && result.error && result.error.details) {
        throw new ValidationException(
            result.error.details.map((detail) => {
                const key = detail.path.join('.');
                const filterFromMessage = `"${key}" `;

                return validationError(
                    key,
                    _.upperFirst(
                        detail.message.startsWith(filterFromMessage)
                            ? detail.message.substring(filterFromMessage.length)
                            : detail.message
                    ),
                    validationTypes.INVALID_PARAMETER
                );
            })
        );
    }

    return result.value;
};

export default validateJoi;
