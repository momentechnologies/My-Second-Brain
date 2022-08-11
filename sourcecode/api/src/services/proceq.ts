import axios from 'axios';
import fs from 'fs';
import jszip from 'jszip';
import { v4 as uuidv4 } from 'uuid';
import { promisify } from 'util';
import stream from 'stream';
import ValidationException, { validationError } from '../exceptions/validation';
import ApiException from '../exceptions/apiException';
import * as os from 'os';
import path from 'path';

const finished = promisify(stream.finished);

const getFilesToDownload = (tmpName: string) => ({
    csv: {
        extension: '.csv',
        fileName: path.join(os.tmpdir(), `${tmpName}.csv`),
    },
    sgy: {
        extension: '.sgy',
        fileName: path.join(os.tmpdir(), `${tmpName}.sgy`),
    },
});

export const downloadFromProceqLink = async (proceqLinkUrl: string) => {
    const proceqUrl = new URL(proceqLinkUrl);

    if (!proceqUrl.searchParams.has('k') || !proceqUrl.searchParams.has('d')) {
        throw new ValidationException(
            validationError(
                'proceqLink',
                'Link is missing som query parameters'
            )
        );
    }

    const zipLocationInfoUrl = `https://${proceqUrl.searchParams.get(
        'd'
    )}/api/files/info?key=${proceqUrl.searchParams.get('k')}`;

    let url;

    try {
        const { data } = await axios({
            url: zipLocationInfoUrl,
        });

        url = data.url;
    } catch (e: unknown) {
        throw new ApiException(
            'We had problems downloading the proceq link information'
        );
    }

    const tmpName = uuidv4();
    const zipFileName = path.join(os.tmpdir(), `${tmpName}.zip`);

    const filesToDownload = getFilesToDownload(tmpName);

    const writer = fs.createWriteStream(zipFileName);

    try {
        await axios({
            method: 'get',
            url: url,
            responseType: 'stream',
        }).then((response) => {
            response.data.pipe(writer);
            return finished(writer); //this is a Promise
        });
    } catch (e: unknown) {
        throw new ApiException(
            'We had problems downloading the zip from the proceq link'
        );
    }

    const info = await jszip.loadAsync(fs.readFileSync(zipFileName));

    const downloads = Object.keys(info.files).reduce(
        (result, fileName) => {
            const keepInfo = Object.entries(filesToDownload).find(
                ([key, fileToDownload]) =>
                    fileName.endsWith(fileToDownload.extension)
            );

            if (keepInfo) {
                const [key, fileInfo] = keepInfo;
                return {
                    ...result,
                    [key]: {
                        type: key,
                        fileName: fileInfo.fileName,
                        extension: fileInfo.extension,
                        download: info.files[fileName],
                    },
                };
            }

            return result;
        },
        {} as {
            [key in keyof ReturnType<typeof getFilesToDownload>]: {
                type: keyof ReturnType<typeof getFilesToDownload>;
                fileName: string;
                extension: string;
                download: jszip.JSZipObject;
            };
        }
    );

    if (Object.keys(downloads).length !== Object.keys(filesToDownload).length) {
        throw new ValidationException(
            validationError('proceqLink', 'Link did not contained all files')
        );
    }

    for (let downloadInfo of Object.values(downloads)) {
        fs.writeFileSync(
            downloadInfo.fileName,
            Buffer.from(await downloadInfo.download.async('arraybuffer'))
        );
    }

    return downloads;
};
