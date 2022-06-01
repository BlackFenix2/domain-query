import React from 'react';

import { useStoreActions, useStoreState } from 'src/state/hook';

import RecentDomainItem from 'ui/components/domain/RecentDomainItem';

interface Props {
  activeDomainName: string;
  recentSearchHandler: (domain: string) => void;
}

const RecentDomainList: React.FC<Props> = ({ recentSearchHandler, activeDomainName }) => {
  const domainList = useStoreState((state) => state.recentDomainQueryModel.recentDomainQueries);
  const actions = useStoreActions((actions) => actions.recentDomainQueryModel);
  // hack to address easy-peasy bug with fast-refresh
  const [hack, setHack] = React.useState(false);

  const onDelete = (domain: string) => {
    actions.removeDomainQuery(domain);
    setHack(!hack);
  };

  return (
    <>
      {domainList.length > 0 && <h3>Recent Searches</h3>}
      {domainList.map((domainItem) => (
        <RecentDomainItem
          key={Math.random()}
          onClick={recentSearchHandler}
          onDelete={() => onDelete(domainItem.domain)}
          domain={domainItem.domain}
          registrar={{ title: 'Registrar', rows: [domainItem.registrar] }}
          nameServers={{ title: 'Name Servers', rows: domainItem.nameservers }}
          aRecord={{ title: 'A Record', rows: domainItem.aRecord }}
          mxRecord={{ title: 'MX Record', rows: domainItem.mxRecord }}
          activeDomainName={activeDomainName}
        />
      ))}
    </>
  );
};

export default RecentDomainList;
