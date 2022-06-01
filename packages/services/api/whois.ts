import { Axios } from 'axios';

import { localApiServerURL } from '../environment';

type Result = ResultArrayElement[];

interface ResultArrayElement {
  server: string;
  data: RegistrationData;
}

export interface RegistrationData {
  domainName?: string | undefined;
  registryDomainId?: string | undefined;
  registrarWhoisServer?: string | undefined;
  registrarUrl?: string | undefined;
  updatedDate?: string | undefined;
  creationDate?: string | undefined;
  registrarRegistrationExpirationDate?: string | undefined;
  registrar?: string | undefined;
  registrarIanaId?: string | undefined;
  registrarAbuseContactEmail?: string | undefined;
  registrarAbuseContactPhone?: string | undefined;
  domainStatus?: string | undefined;
  registrantName?: string | undefined;
  registrantOrganization?: string | undefined;
  registrantStreet?: string | undefined;
  registrantCity?: string | undefined;
  registrantStateProvince?: string | undefined;
  registrantPostalCode?: string | undefined;
  registrantCountry?: string | undefined;
  registrantPhone?: string | undefined;
  registrantEmail?: string | undefined;
  adminName?: string | undefined;
  adminOrganization?: string | undefined;
  adminStreet?: string | undefined;
  adminCity?: string | undefined;
  adminStateProvince?: string | undefined;
  adminPostalCode?: string | undefined;
  adminCountry?: string | undefined;
  adminPhone?: string | undefined;
  adminEmail?: string | undefined;
  techName?: string | undefined;
  techOrganization?: string | undefined;
  techStreet?: string | undefined;
  techCity?: string | undefined;
  techStateProvince?: string | undefined;
  techPostalCode?: string | undefined;
  techCountry?: string | undefined;
  techPhone?: string | undefined;
  techEmail?: string | undefined;
  nameServer?: string | undefined;
  dnssec?: string | undefined;
  urlOfTheIcannWhoisDataProblemReportingSystem?: string | undefined;
  lastUpdateOfWhoisDatabase?: string | undefined;
}

const apiClient = new Axios({
  baseURL: localApiServerURL(),
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchWhois = async (domain: string) => {
  const result = await apiClient.get<RegistrationData>(`/whois/${domain}`);

  //next js API endpoint needs json parsed manually
  return JSON.parse(result.data as unknown as string) as RegistrationData;
};
