import { action } from 'easy-peasy';

import { LocalStorageKeys } from '../../../ui/config';
import { getFromLS, setToLS } from '../../../utils';

export const updateTransaction = action((state, payload) => {
  state.transactions = state.transactions.map(transaction => {
    return transaction.transactionHash === payload.transactionHash
      ? { ...transaction, ...payload.data }
      : transaction;
  });
  const transactionsFromStorage = getFromLS(LocalStorageKeys.TRANSACTIONS, {});
  transactionsFromStorage[`netId-${payload.network}`] = state.transactions;
  setToLS(LocalStorageKeys.TRANSACTIONS, transactionsFromStorage);
});
