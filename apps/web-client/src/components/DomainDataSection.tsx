import { AccountBox, Assignment, Storage } from '@mui/icons-material';
import { Grid } from '@mui/material';
import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';

import getEmailProvider from 'services/emailProvider';

import DomainCardItem from 'ui/components/domain/DomainCardItem';
import DomainCardItemSection from 'ui/components/domain/DomainCardItemSection';

import type { FunctionComponent } from 'react';
import type { RegistrationData } from 'services/api/whois';
import type { AResponse, MXResponse, NSResponse } from 'services/domain';

interface Props {
  isLoading: boolean;
  activeDomainName: string;
  activeDomainData?: {
    whois: RegistrationData;
    ip: AResponse;
    mx: MXResponse;
    ns: NSResponse;
  };
}

interface SummaryData {
  whois: { title: string; value: string }[];
  dns: { title: string; value: string }[];
}

interface WhoisData {
  registrarInfo: { title: string; value: string }[];
  nameServers: { title: string; value: string }[];
}

interface DnsData {
  aRecord: {
    title?: string;
    value: string;
  }[];
  cName?: {
    value: string;
  }[];
  mxRecord: {
    title?: string;
    value: string;
  }[];
}

const splitIntoArray = (string = '') => {
  const array = string.split(' ');
  const newArray = array.map((index) => Object.create({ value: index }));

  return newArray;
};

const parseDate = (date: string) => (!!date ? moment(date).format('MMMM Do YYYY') : 'empty');

const DomainDataSection: FunctionComponent<Props> = (props) => {
  const [summaryCardData, setSummaryCardData] = useState<SummaryData>();
  const [whoisCardData, setWhoisCardData] = useState<WhoisData>();
  const [dnsCardData, setDNSCardData] = useState<DnsData>();

  const updateDataCards = useCallback(() => {
    if (!props.activeDomainData) return;

    const { ip, mx, whois } = props.activeDomainData;

    const summaryData: SummaryData = {
      whois: [
        {
          title: 'Registrar Company',
          value: whois?.registrar ?? 'empty',
        },
        {
          title: 'Organization',
          value: whois?.registrantOrganization ?? 'empty',
        },
        {
          title: 'Admin Email',
          value: whois?.registrantEmail ?? 'empty',
        },
      ],
      dns: [
        {
          title: 'Email Provider',
          value: getEmailProvider(mx?.answerResourceRecords[0]?.exchangeName?.text),
        },
        {
          title: 'A-Record',
          value: ip?.answerResourceRecords[0]?.ipAddress ?? 'empty',
        },
      ],
    };

    const whoisData: WhoisData = {
      registrarInfo: [
        {
          title: 'Name',
          value: whois?.registrar ?? 'empty',
        },
        {
          title: 'Created Date',
          value: parseDate(whois?.creationDate ?? ''),
        },

        {
          title: 'Updated Date',
          value: parseDate(whois?.updatedDate ?? ''),
        },

        {
          title: 'Expiration Date',
          value: parseDate(whois?.registrarRegistrationExpirationDate ?? ''),
        },
      ],
      nameServers: splitIntoArray(whois?.nameServer),
    };
    const dnsData: DnsData = {
      aRecord: [
        {
          value: ip?.answerResourceRecords[0]?.ipAddress ?? 'empty',
        },
      ],

      mxRecord: splitIntoArray(mx?.answerResourceRecords?.map((index) => index?.exchangeName?.text ?? '').join(' ')),
    };

    setSummaryCardData(summaryData);
    setWhoisCardData(whoisData);
    setDNSCardData(dnsData);
  }, [props.activeDomainData]);
  useEffect(() => {
    if (props.activeDomainData !== undefined) {
      updateDataCards();
    }
  }, [props.activeDomainData, updateDataCards]);

  return (
    <Grid spacing={3} container>
      <Grid item xs={4}>
        <DomainCardItem href={`https://${props.activeDomainName}`} title="SUMMARY" isLoading={props.isLoading} icon={<Assignment />}>
          <DomainCardItemSection key={Math.random()} title={'WHOIS'} rows={summaryCardData?.whois} />
          <DomainCardItemSection key={Math.random()} title={'DNS'} rows={summaryCardData?.dns} />
        </DomainCardItem>
      </Grid>
      <Grid item xs={4}>
        <DomainCardItem href={`https://who.is/whois/${props.activeDomainName}`} title="WHOIS" isLoading={props.isLoading} icon={<AccountBox />}>
          <DomainCardItemSection key={Math.random()} title={'Registrar Info'} rows={whoisCardData?.registrarInfo ?? []} />
          <DomainCardItemSection key={Math.random()} title={'Name Servers'} rows={whoisCardData?.nameServers ?? []} />
        </DomainCardItem>
      </Grid>
      <Grid item xs={4}>
        <DomainCardItem
          href={`https://mxtoolbox.com/SuperTool.aspx?action=https%3a%2f%2f${props.activeDomainName}&run=toolpage`}
          title="DNS"
          isLoading={props.isLoading}
          icon={<Storage />}
        >
          <DomainCardItemSection key={Math.random()} title={'A-Record'} rows={dnsCardData?.aRecord ?? []} />

          <DomainCardItemSection key={Math.random()} title={'MX Records'} rows={dnsCardData?.mxRecord ?? []} />
        </DomainCardItem>
      </Grid>
    </Grid>
  );
};

export default DomainDataSection;
