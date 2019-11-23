import { fetchApi, ID_RETURN, START_DATE, END_DATE, ID_SHARPE, ID_VOL, WALLET_ID, WALLET_REF_ID } from './constants';
import Assets from './assets';
import Quotes from './quotes';
import { getRatios, invokeRatios } from './ratios';
import { IDynAmount, IAssetValues, IAsset } from './interfaces';
import { getWallet, updateWallet } from './portfolio';

const quantityStrategy = (a: IAsset, volatility: IAsset[]) => {
    const volatilityRank = volatility.findIndex(({ id }) => id === a.id) / volatility.length;

    if (volatilityRank < 1 / 3) {
        return 3;
    } else if (volatilityRank < 2 / 3) {
        return 2;
    } else {
        return 1;
    }
};

// Entry main
const main = async () => {
    // Code here

    console.log('Downloading list of assets...');
    const allAssets = await Assets.getAllAssets();
    console.log(`OK! ${allAssets.length} assets found!`);

    const assets = allAssets.filter(({ isPortfolio }) => !isPortfolio);
    const assetIds = assets.map(({ id }) => id);

    console.log('\nRetreiving ratios...');
    const ratios = await invokeRatios([ID_RETURN, ID_SHARPE, ID_VOL], assetIds, null, START_DATE, END_DATE, null);
    console.log(`OK! ${Object.keys(ratios).length} found!`);

    for (const k in ratios) {
        const asset = assets.find(({ id }) => id === parseInt(k));

        if (!asset) {
            continue;
        }

        for (const pId of [ID_RETURN, ID_SHARPE, ID_VOL]) {
            if (ratios[k][pId].type === 'error') {
                continue;
            }

            switch (pId) {
                case ID_RETURN:
                    asset.nav = parseFloat(ratios[k][pId].value.replace(',', '.'));
                    break;
                case ID_SHARPE:
                    asset.sharpe = parseFloat(ratios[k][pId].value.replace(',', '.'));
                    break;
                case ID_VOL:
                    asset.volatility = parseFloat(ratios[k][pId].value.replace(',', '.'));
                    break;
                default:
                    break;
            }
        }
    }

    console.log('Filtering unwanted data...');
    const possibleMatches = assets.filter(
        ({ nav, sharpe, volatility }) => nav >= 0 && sharpe >= 0 && volatility >= 0 && nav >= 1 && nav <= 10
    );
    console.log('OK!\n');

    console.log('Sorting...');
    const sortedNavMatches = [...possibleMatches].sort((a, b) => b.nav - a.nav); // Dec
    const sortedVolMatches = [...possibleMatches].sort((a, b) => a.volatility - b.volatility); // Inc
    const sortedSharpeMatches = [...possibleMatches].sort((a, b) => b.sharpe - a.sharpe); // Dec

    // Create stores
    const assetsAvg: number[][] = [];
    const assetsAvgObj: { [key: number]: number } = {};

    for (let i = 0; i < sortedNavMatches.length; i++) {
        if (!assetsAvgObj[sortedNavMatches[i].id]) {
            assetsAvgObj[sortedNavMatches[i].id] = 0;
        }

        assetsAvgObj[sortedNavMatches[i].id] += i;
    }

    for (let i = 0; i < sortedVolMatches.length; i++) {
        if (!assetsAvgObj[sortedVolMatches[i].id]) {
            assetsAvgObj[sortedVolMatches[i].id] = 0;
        }

        assetsAvgObj[sortedVolMatches[i].id] += i;
    }

    for (let i = 0; i < sortedSharpeMatches.length; i++) {
        if (!assetsAvgObj[sortedSharpeMatches[i].id]) {
            assetsAvgObj[sortedSharpeMatches[i].id] = 0;
        }

        assetsAvgObj[sortedSharpeMatches[i].id] += i;
    }

    for (const k in assetsAvgObj) {
        assetsAvg.push([parseInt(k), assetsAvgObj[k]]);
    }

    // Sort
    assetsAvg.sort((a, b) => a[1] - b[1]);

    // Number of bought actions
    const actions_nb = 20; // Must be even

    // Create final arr
    const sortedMatches: any[] = assetsAvg.map(arr => possibleMatches.find(({ id }) => id === arr[0])).slice(0, actions_nb);

    console.log('OK!\n');

    const valuesToBuy: IAssetValues[] = [];

    for (const m of sortedMatches) {
        valuesToBuy.push({
            asset: m.id,
            quantity: quantityStrategy(m, sortedVolMatches)
        });
    }

    const wallet: IDynAmount = {
        label: 'EPITA_PTF_7',
        currency: { code: 'EUR' },
        type: 'front',
        values: {
            [START_DATE]: valuesToBuy.map(v => ({
                asset: v
            }))
        }
    };

    console.log('Updating wallet...');
    await updateWallet(wallet);

    const compareRations = await invokeRatios(
        [ID_SHARPE],
        [WALLET_ID, WALLET_REF_ID],
        null,
        START_DATE,
        END_DATE,
        null
    );

    console.log('Wallet:', await getWallet());
    console.log('Ratios');
    console.log(compareRations);

    // const quotesFor59 = await Quotes.getQuotesForAsset(1792, '2013-06-14', '2019-05-31');

    // const ratios = await getRatios();
};

main();
