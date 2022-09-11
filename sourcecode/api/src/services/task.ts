import { Task, TaskList, taskLists } from '../context/db/task';
import Joi from 'joi';

export const getJoiValidation = (isUpdate: boolean = false) => {
    let nameValidation = Joi.string().min(1);
    if (isUpdate) {
        nameValidation.optional();
    } else {
        nameValidation.required();
    }

    return Joi.object({
        name: nameValidation,
        isDone: Joi.boolean().optional(),
        projectId: Joi.number().min(1).allow(null).optional(),
        list: Joi.string()
            .valid(...taskLists)
            .allow(null)
            .optional(),
        dueAt: Joi.date().allow(null).optional(),
        remindMeAt: Joi.date().allow(null).optional(),
    }).when(
        Joi.object({
            list: Joi.number().valid('specificDate').required(),
        }).unknown(),
        {
            then: Joi.object({
                listSpecificDateDate: Joi.date().required(),
            }),
        }
    );
};
export const setNulls = <T>(task: any): T => {
    if (task.list === undefined) {
        return task;
    }

    return {
        ...task,
        ...getNullFieldsFromListValue(task.list),
    };
};

export const getNullFieldsFromListValue = (list: TaskList): Partial<Task> => {
    switch (list) {
        case 'specificDate':
            return {
                remindMeAt: null,
                dueAt: null,
            };
        case 'delegated':
            return {
                listSpecificDateDate: null,
                dueAt: null,
            };
        case 'doNext':
            return {
                listSpecificDateDate: null,
                remindMeAt: null,
            };
        case 'someday':
            return {
                listSpecificDateDate: null,
            };
        default:
            return {
                listSpecificDateDate: null,
                remindMeAt: null,
                dueAt: null,
            };
    }
};
