import { fetchApi } from './constants';

interface IRatioIn {
    id: number;
    type: string;
    name: string;
    is_benchmark_needed: boolean;
    is_percent: boolean;
}

export const getRatios: () => Promise<IRatioIn[]> = async () => {
    const res = await fetchApi('/ratio').then(res => res.json());

    const ratios: IRatioIn[] = [];

    for (const r of res) {
        ratios.push({
            id: r.id,
            type: r.type,
            name: r.name,
            is_benchmark_needed: r.is_benchmark_needed,
            is_percent: r.is_percent
        });
    }

    return ratios;
};

export const invokeRatios = async (
    ratios: number[],
    assets: number[],
    bench: number | null,
    startDate: string,
    endDate: string,
    frequency: number | null
) => {
    const res = await fetchApi('/ratio/invoke', {
        method: 'POST',
        body: JSON.stringify({
            ratio: ratios,
            asset: assets,
            bench: bench,
            startDate: startDate,
            endDate: endDate,
            frequency: frequency
        })
    });

    const assets_ratios = await res.json();

    return assets_ratios;
};
