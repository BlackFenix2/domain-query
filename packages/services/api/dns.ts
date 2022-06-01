import { Axios } from 'axios';

import { localApiServerURL } from '../environment';

import type { AResponse, MXResponse, NSResponse } from '../domain';

export interface DnsResult {
  ip: AResponse;
  mx: MXResponse;
  ns: NSResponse;
}

const apiClient = new Axios({
  baseURL: localApiServerURL(),
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchDns = async (domain: string) => {
  const result = await apiClient.get<DnsResult>(`/dns/${domain}`);

  //next js API endpoint needs json parsed manually
  return JSON.parse(result.data as unknown as string) as DnsResult;
};

export default apiClient;
