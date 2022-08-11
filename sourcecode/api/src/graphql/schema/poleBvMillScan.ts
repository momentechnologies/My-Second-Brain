import gql from 'graphql-tag';
import { Context } from '../../context';

export const schema = gql`
    type Query {
        poleBvMillScans: [PoleBvMillScan!]!
    }

    type PoleBvMillScan {
        id: ID!
        poleId: ID!
        pole: Pole!
        version: String!
        heightFromGround: Float!
        circumference: Float!
        comment: String
        scannedAt: DateTime!
        createdAt: DateTime!
        updatedAt: DateTime!
        files: [PoleBvMillScanFile!]!
    }

    type PoleBvMillScanFile {
        id: ID!
        poleBvMillScanId: ID!
        type: String!
        bucketName: String!
        fileName: String!
    }
`;

export const resolvers = {
    Query: {
        poleBvMillScans: async (_, args, context: Context) => {
            return context.db().poleBvMillScan.getAll();
        },
    },
    PoleBvMillScan: {
        files: async ({ id }, args, context: Context) =>
            context.db().poleBvMillScanFile.getAllForPoleBvMillScanId.load(id),
    },
};
