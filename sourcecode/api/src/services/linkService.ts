import * as TokenUtils from './token';
import { Context } from '../context';

export const addLinkTrackingToUrl = async (
    context: Context,
    url: string,
    linkId
) => {
    const parsedUrl = new URL(url);

    const token = TokenUtils.encrypt(
        {
            linkId,
            type: 'linkTracking',
        },
        24 * 360
    );

    parsedUrl.searchParams.set('dlid', token);

    return parsedUrl.href;
};
