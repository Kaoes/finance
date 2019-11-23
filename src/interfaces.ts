export interface IAsset {
    id: number;
    label: string;
    close: number;
    date: Date;
    isPortfolio: boolean;
    type: string;
    currency: string;
    nav: number;
    volatility: number;
    sharpe: number;
}

export interface IQuote {
    date: Date;
    nav: number;
    gross: number;
    pl: number;
    close: number;
    return: number;
}

export interface IAssetValues {
    asset: number;
    quantity: number;
}

export interface IDynAmount {
    label: string;
    currency: { code: string };
    type: 'back' | 'front';
    values: {
        [key: string]: {
            asset: IAssetValues;
        }[];
    };
}
