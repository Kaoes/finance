import { IDynAmount } from './interfaces';
import { fetchApi, WALLET_ID } from './constants';

export const updateWallet = (wallet: IDynAmount) =>
    fetchApi(`/portfolio/${WALLET_ID}/dyn_amount_compo`, {
        method: 'PUT',
        body: JSON.stringify(wallet)
    });

export const getWallet = () => fetchApi(`/portfolio/${WALLET_ID}/dyn_amount_compo`).then(res => res.json());
