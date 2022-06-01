import { createTypedHooks } from 'easy-peasy';

import type storeModel from './models';

const typedHooks = createTypedHooks<typeof storeModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;
