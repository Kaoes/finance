import { IQuote } from './interfaces';
import { fetchApi } from './constants';
import { getValueOf, frenchToNumberFloat } from './utils';

class Quotes {
    private static quoteFromData: (data: any) => IQuote = (data: any) => ({
        close: frenchToNumberFloat(getValueOf(data, 'close')),
        date: new Date(getValueOf(data, 'date')),
        gross: frenchToNumberFloat(getValueOf(data, 'gross')),
        nav: frenchToNumberFloat(getValueOf(data, 'nav')),
        pl: frenchToNumberFloat(getValueOf(data, 'pl')),
        return: frenchToNumberFloat(getValueOf(data, 'return'))
    });

    static getQuotesForAsset = async (assetId: number, startDate: string, endDate: string) => {
        const res = await fetchApi(`/asset/${assetId}/quote?startDate=${startDate}&endDate=${endDate}`);
        const json = await res.json();

        const quotes: IQuote[] = [];

        for (const q of json) {
            quotes.push(Quotes.quoteFromData(q));
        }

        return quotes;
    };
}

export default Quotes;
