import fs from 'fs-extra';
import path from 'path';
import GoogleStorage from '@google-cloud/storage';
import storageConfig from '../config/bucket';
import pipe from './pipe';
import logger from './logger';
import * as Stream from 'stream';

export type FileLocation = {
    bucketName: string;
    fileName: string;
};

const getLocalBucketFileName = (fileLocation: FileLocation) =>
    `./storage/${fileLocation.bucketName}${fileLocation.fileName}`;

const removeLeadingSlash = (string: string) => {
    if (string.startsWith('/')) {
        return removeLeadingSlash(string.substring(1));
    }

    return string;
};

const uploadFileToBucket = async (
    bucketName: string,
    fileName: string,
    buffer: Buffer,
    contentType: string
) => {
    const newFileName = removeLeadingSlash(fileName);
    const storage = new GoogleStorage.Storage();
    const bucket = storage.bucket(bucketName);
    const file = bucket.file(newFileName);

    logger.info(
        `Uploading file to bucket ${bucketName} and filename ${newFileName}`,
        { bucketName, newFileName }
    );

    await file.save(buffer, {
        metadata: {
            contentType,
        },
    });
};

const getFileStreamFromBucket = async (
    fileLocation: FileLocation
): Promise<Stream.Readable> => {
    const storage = new GoogleStorage.Storage();
    const bucket = storage.bucket(fileLocation.bucketName);
    const file = bucket.file(removeLeadingSlash(fileLocation.fileName));

    return file.createReadStream();
};

const getFileStream = async (
    fileLocation: FileLocation
): Promise<Stream.Readable> => {
    return fs.createReadStream(getLocalBucketFileName(fileLocation));
};

export const save = async (
    fileLocation: FileLocation,
    buffer: Buffer,
    contentType?: string
) => {
    if (storageConfig.storage === 'bucket') {
        return await uploadFileToBucket(
            fileLocation.bucketName,
            fileLocation.fileName,
            buffer,
            contentType
        );
    }

    return fs.outputFile(getLocalBucketFileName(fileLocation), buffer);
};

const getBucketFileWriteStream = async (fileLocation: FileLocation) => {
    const storage = new GoogleStorage.Storage();
    const bucket = storage.bucket(fileLocation.bucketName);
    const file = bucket.file(removeLeadingSlash(fileLocation.fileName));

    return file.createWriteStream({
        resumable: false,
    });
};

export const saveFileStream = async (
    fileLocation: FileLocation,
    readStream
) => {
    let writeStream;
    if (storageConfig.storage === 'bucket') {
        writeStream = await getBucketFileWriteStream(fileLocation);
    } else {
        const localFilename = getLocalBucketFileName(fileLocation);

        await fs.ensureDir(path.dirname(localFilename));
        writeStream = await fs.createWriteStream(localFilename);
    }

    return await pipe(readStream, writeStream);
};

export const get = async (
    fileLocation: FileLocation
): Promise<Stream.Readable> => {
    if (storageConfig.storage === 'bucket') {
        return await getFileStreamFromBucket(fileLocation);
    }

    return await getFileStream(fileLocation);
};

const copyLocal = async (from: FileLocation, to: FileLocation) => {
    await fs.copy(getLocalBucketFileName(from), getLocalBucketFileName(to));
};

const copyBucket = async (from: FileLocation, to: FileLocation) => {
    const storage = new GoogleStorage.Storage();

    const fromBucket = storage.bucket(from.bucketName);
    const toBucket = storage.bucket(to.bucketName);

    const fromFile = fromBucket.file(removeLeadingSlash(from.fileName));
    const toFile = toBucket.file(removeLeadingSlash(to.fileName));

    await fromFile.copy(toFile);
};

export const copyFile = async (from: FileLocation, to: FileLocation) => {
    if (storageConfig.storage === 'bucket') {
        return await copyBucket(from, to);
    }

    return await copyLocal(from, to);
};

const deleteLocal = async (file: FileLocation) => {
    await fs.remove(getLocalBucketFileName(file));
};

const deleteBucket = async (file: FileLocation) => {
    const storage = new GoogleStorage.Storage();

    const bucket = storage.bucket(file.bucketName);
    const bucketFile = bucket.file(removeLeadingSlash(file.fileName));

    await bucketFile.delete();
};

export const deleteFile = async (file: FileLocation) => {
    if (storageConfig.storage === 'bucket') {
        return await deleteBucket(file);
    }

    return await deleteLocal(file);
};
