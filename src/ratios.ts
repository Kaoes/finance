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
    await fetchApi('/ratio/invoke', {
        method: 'POST',
        body: `
            _ratio=${JSON.stringify(ratios)},
            _asset=${JSON.stringify(assets)},
            _bench=${bench},
            _startDate=${startDate},
            _endDate=${endDate},
            _frequency=${frequency}
        `
    });
};
