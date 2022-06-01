import { createStore, persist } from 'easy-peasy';

import storeModel from './models';

import type { EasyPeasyConfig } from 'easy-peasy';

const config: EasyPeasyConfig = {
  // disable passing mutable state
  disableImmer: true,

  // enalbe devtools in development only
  devTools: process.env.NODE_ENV === 'development',
};

const store = createStore(persist(storeModel), config);

export default store;
