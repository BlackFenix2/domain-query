import { action } from 'easy-peasy';

import type { Action, State } from 'easy-peasy';

export interface RecentDomainQuery {
  domain: string;
  registrar: string;
  nameservers: string[];
  aRecord: string[];
  mxRecord: string[];
}

export interface RecentDomainQueryModel {
  recentDomainQueries: RecentDomainQuery[];
  addDomainQuery: Action<RecentDomainQueryModel, RecentDomainQuery>;
  removeDomainQuery: Action<RecentDomainQueryModel, string>;
}

export const recentDomainQueryModel: RecentDomainQueryModel = {
  recentDomainQueries: [],

  addDomainQuery: action((state, payload) => {
    //avoid doplucating recent domain names, refresh query object on new item added

    const index = state.recentDomainQueries.findIndex((query) => query.domain === payload.domain);

    if (index === -1) {
      return { ...state, recentDomainQueries: [...state.recentDomainQueries, payload] };
    }

    // copy the state to prevent mutation of the original state
    const copyList = [...state.recentDomainQueries];

    //use splice to remove the item at the index,
    //replace with the new item at a specific index to prevent the domainquery list from going out of order
    copyList.splice(index, 1, payload);

    return {
      ...state,
      recentDomainQueries: copyList,
    };
  }),
  removeDomainQuery: action(
    (state, payload): State<typeof state> =>
      // remove the domain query
      // state.domainQueries = state.domainQueries.filter((query) => query.domain !== payload);

      ({
        ...state,
        recentDomainQueries: state.recentDomainQueries.filter((query) => query.domain !== payload),
      })
  ),
};
