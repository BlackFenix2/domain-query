import MojoDnsClient from 'mojodns';

const dnsApi = new MojoDnsClient('2cf00d90-32d7-4a28-8ebd-d1cf3284e8ac');

export const getDomainIP = async (domain: string) => {
  try {
    const result = await dnsApi.getA(domain);

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getDomainMX = async (domain: string) => {
  try {
    const result = await dnsApi.getMX(domain);

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getDomainNS = async (domain: string) => {
  try {
    const result = await dnsApi.getNS(domain);

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export type { AResponse, NSResponse, MXResponse, TXTResponse } from 'mojodns';
