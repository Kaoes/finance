export interface IAsset {
    id: number;
    label: string;
    close: number;
    date: Date;
    currency: string;
}

export interface IQuote {
    date: Date;
    nav: number;
    gross: number;
    pl: number;
    close: number;
    return: number;
}
