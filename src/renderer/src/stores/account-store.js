import { create } from 'zustand';
import * as R from 'ramda';
import { createJSONStorage, persist } from 'zustand/middleware';

const APP_STORE_CONFIG = {
  name: 'app-store',
  storage: createJSONStorage(() => localStorage),
};

const storeCreator = set => ({
  account: null,
  connected: false,
  chainId: null,
  connectAccount: ({ account, connected, chainId }) => set({ account, connected, chainId }),
});
export const useAccountStore = create(persist(storeCreator, APP_STORE_CONFIG));
