import { Alert, Box, Snackbar } from '@mui/material';
import { useStoreRehydrated } from 'easy-peasy';
import moment from 'moment';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import validator from 'validator';

import DomainDataSection from 'src/components/DomainDataSection';
import RecentDomainList from 'src/components/RecentDomainList';
import { ClearButton } from 'src/components/elements/ClearButton';
import { useStoreActions } from 'src/state/hook';

import { fetchDns } from 'services/api/dns';
import { fetchWhois } from 'services/api/whois';

import DomainSearchSection from 'ui/components/domain/DomainSearchSection';

import type { NextPage } from 'next';
import type { RegistrationData } from 'services/api/whois';
import type { AResponse, MXResponse, NSResponse } from 'services/domain';

export const Home: NextPage = () => {
  const actions = useStoreActions((actions) => actions.recentDomainQueryModel);

  const [validationError, setValidationError] = useState('');
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [domainSearchName, setDomainSearchName] = useState('');
  const [activeDomainName, setActiveDomainName] = useState('');
  const [activeDomainData, setActiveDomainData] = useState<{
    whois: RegistrationData;
    ip: AResponse;
    mx: MXResponse;
    ns: NSResponse;
  }>();

  const router = useRouter();

  const domainSubmitHandler = async (domain = '') => {
    // clean out whitespace and lower casing

    const domainName = domain.toLowerCase().trim();

    // error out if domain is not valid
    if (!validator.isFQDN(domainName)) {
      setValidationError('Please enter a valid domain name');

      return;
    }

    setDomainSearchName('');

    setActiveDomainName(domainName);

    setIsLoading(true);

    // query WHOIS and DNS endpoints
    try {
      const dnsResult = await fetchDns(domainName);
      const whoisResult = await fetchWhois(domainName);

      const combinedResult = { ...dnsResult, whois: whoisResult };

      setActiveDomainData(combinedResult);

      // add domain to recent list
      actions.addDomainQuery({
        domain: domainName,
        registrar: whoisResult.registrar || '',
        nameservers: whoisResult.nameServer?.split(' ') || [],
        aRecord: dnsResult.ip.answerResourceRecords.map((record) => record.ipAddress) || [],
        mxRecord: dnsResult.mx.answerResourceRecords.map((index) => index?.exchangeName?.text ?? ''),
      });

      setIsLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        setIsError(true);
        setErrorMessage(error.message);
      }
    }
  };

  // reset error state after onChange event
  useEffect(() => {
    setValidationError('');
  }, [domainSearchName]);

  // check for domain in querystring on load
  useEffect(() => {
    // wait for the router to load
    if (!router.isReady) return;

    // run the submit handler if there is a domain in the querystring
    if (router.query.domain) {
      domainSubmitHandler(router.query.domain as string);
    }
    //re-run the effect when the router.isReady prop changes
  }, [router.isReady]);

  const clearFormHandler = () => {
    setDomainSearchName('');
    setActiveDomainName('');
  };

  const ActiveWebsiteInformation = (
    <Box
      sx={{
        maxWidth: '1080px',
        width: '100%',
        margin: '0 auto',
        flexGrow: 1,
        flexShrink: 0,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          margin: '30px auto',
          justifyContent: 'center',
          fontSize: '22px',
        }}
      >
        <span>Domain Name:</span>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <Box
            sx={{
              backgroundColor: '#ffffff',
              padding: '10px 18px',
              fontWeight: 'bold',
              marginLeft: '15px',
            }}
          >
            {activeDomainName}
          </Box>
          <ClearButton onClick={clearFormHandler} />
        </Box>
      </Box>
      <DomainDataSection isLoading={isLoading} activeDomainName={activeDomainName} activeDomainData={activeDomainData} />
    </Box>
  );

  //End Page Layout components

  return (
    //check for store hydration

    <Box>
      <Head>
        <title>Domain Lookup</title>
      </Head>

      <Snackbar open={isError} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity="error" onClose={() => setIsError(false)}>{`Request could not be completed: ${errorMessage}`}</Alert>
      </Snackbar>
      <DomainSearchSection
        isError={!!validationError}
        errorMessage={validationError}
        onChange={(event: any) => setDomainSearchName(event.target.value)}
        domainSearchName={domainSearchName}
        domainSubmitHandler={domainSubmitHandler}
      />
      <Box maxWidth={'1500px'} margin={'0 auto'} padding={'0 20px'}>
        <Box sx={{ display: 'flex', transition: '300ms' }}>
          {/* Main Body Col   */}
          <Box sx={{ flexGrow: activeDomainName ? 1 : 0, flexShrink: 0 }}>{activeDomainName && ActiveWebsiteInformation}</Box>

          {/* Recent Col   */}
          <Box
            sx={{
              // width: "100%",
              // maxWidth: "320px",
              display: 'flex',
              margin: '0 auto',
              padding: '15px 25px',
              transition: '300ms',
              flexGrow: activeDomainName ? 0 : 1,
              flexShrink: 1,
              flexBasis: '320px',
            }}
          >
            <Box sx={{ width: '100%', maxWidth: '824px', margin: '0 auto' }}>
              <RecentDomainList activeDomainName={activeDomainName} recentSearchHandler={domainSubmitHandler} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
