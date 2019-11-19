import { fetchApi } from './constants';
import { IAsset } from './interfaces';
import { getValueOf, getValueFromPrice } from './utils';

class Assets {
    private static assetFromData: (data: any) => IAsset = (data: any) => ({
        id: parseInt(getValueOf(data, 'REST_OBJECT_ID')),
        label: getValueOf(data, 'LABEL'),
        close: getValueFromPrice(getValueOf(data, 'LAST_CLOSE_VALUE_IN_CURR', '0')),
        currency: getValueOf(data, 'MARKET_PLACE_CURRENCY'),
        date: new Date(getValueOf(data, 'FIRST_QUOTE_DATE'))
    });

    static getAssetById = async (assetId: number) => {
        const res = await fetchApi(`/asset/${assetId}`);

        return Assets.assetFromData(await res.json());
    };

    static getAllAssets = async () => {
        const res = await fetchApi('/asset');
        const json = await res.json();

        const assets: IAsset[] = [];

        for (const a of json) {
            assets.push(Assets.assetFromData(a));
        }

        return assets;
    };
}

export default Assets;
