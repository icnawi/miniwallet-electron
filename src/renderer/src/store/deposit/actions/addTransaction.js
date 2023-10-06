import { action } from 'easy-peasy';

import { LocalStorageKeys } from '../../../ui/config';
import { getFromLS, setToLS } from '../../../utils';

export const addTransaction = action((state, payload) => {
  state.transactions.unshift(payload);
  const transactionsFromStorage = getFromLS(LocalStorageKeys.TRANSACTIONS, {});
  transactionsFromStorage[`netId-${payload.network}`] = state.transactions;
  setToLS(LocalStorageKeys.TRANSACTIONS, transactionsFromStorage);
});
