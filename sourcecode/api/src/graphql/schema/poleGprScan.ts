import gql from 'graphql-tag';
import { Context } from '../../context';
import validateJoi from '../../services/validateJoi';
import Joi from 'joi';
import fs from 'fs';
import NotFoundException from '../../exceptions/notFound';
import { v4 as uuidv4 } from 'uuid';
import { downloadFromProceqLink } from '../../services/proceq';
import * as Storage from '../../services/storage';
import storageConfig from '../../config/bucket';

export const schema = gql`
    type Mutation {
        createPoleGprScan(data: CreatePoleGprScanInput!): PoleGprScan @auth
    }

    type Query {
        poleGprScans(filters: PoleGprScansFiltersInput! = {}): [PoleGprScan!]!
            @auth
    }

    input CreatePoleGprScanInput {
        poleId: ID!
        heightFromGround: Float!
        proceqLink: String!
        polarizationDirection: String!
        withPec: Boolean!
        comment: String
        tags: [String!]!
    }

    input PoleGprScansFiltersInput {
        tags: [String!]
        userDefinedPoleId: ID
    }

    type PoleGprScan {
        id: ID!
        poleId: ID!
        pole: Pole!
        heightFromGround: Float!
        polarizationDirection: String!
        withPec: Boolean!
        comment: String
        tags: [PoleGprScanTag!]!
        createdAt: DateTime!
        updatedAt: DateTime!
        files: [PoleGprScanFile!]!
    }

    type PoleGprScanTag {
        poleGprScanId: ID!
        tag: String!
    }

    type PoleGprScanFile {
        id: ID!
        poleGprScanId: ID!
        type: String!
        bucketName: String!
        fileName: String!
    }
`;

export const resolvers = {
    Query: {
        poleGprScans: async (_, { filters }, context: Context) =>
            context.db().poleGprScan.get(filters),
    },
    Mutation: {
        createPoleGprScan: async (_, { data }, context: Context) => {
            const validatedArgs = validateJoi(
                data,
                Joi.object().keys({
                    poleId: Joi.number().min(1).required(),
                    heightFromGround: Joi.number().required(),
                    proceqLink: Joi.string().uri().required(),
                    polarizationDirection: Joi.string()
                        .allow('up', 'down')
                        .required(),
                    withPec: Joi.boolean().required(),
                    comment: Joi.string().allow(null).optional(),
                    tags: Joi.array().items(Joi.string().max(10)).required(),
                })
            );

            const pole = await context
                .db()
                .pole.getById.load(validatedArgs.poleId);

            if (!pole) {
                throw new NotFoundException('pole');
            }

            const response = await downloadFromProceqLink(
                validatedArgs.proceqLink
            );

            const poleGprScan = await context.db().poleGprScan.create({
                poleId: pole.id,
                heightFromGround: validatedArgs.heightFromGround,
                polarizationDirection: validatedArgs.polarizationDirection,
                withPec: validatedArgs.withPec,
                scannedAt: new Date(),
                comment: validatedArgs.comment,
            });

            for (let tag of validatedArgs.tags) {
                await context.db().poleGprScanTag.create({
                    poleGprScanId: poleGprScan.id,
                    tag,
                });
            }

            for (let fileToUpload of Object.values(response)) {
                const filePath = `/poles-gpr-scan-files/${
                    poleGprScan.id
                }/${uuidv4()}${fileToUpload.extension}`;

                await context.db().poleGprScanFile.create({
                    poleGprScanId: poleGprScan.id,
                    type: fileToUpload.type,
                    fileName: filePath,
                    bucketName: storageConfig.hotBucket,
                });

                await Storage.save(
                    {
                        bucketName: storageConfig.hotBucket,
                        fileName: filePath,
                    },
                    fs.readFileSync(fileToUpload.fileName)
                );
            }

            return poleGprScan;
        },
    },
    PoleGprScan: {
        tags: async ({ id }, args, context: Context) =>
            context.db().poleGprScanTag.getAllForPoleGprScanId.load(id),
        files: async ({ id }, args, context: Context) =>
            context.db().poleGprScanFile.getAllForPoleGprScanId.load(id),
    },
};
