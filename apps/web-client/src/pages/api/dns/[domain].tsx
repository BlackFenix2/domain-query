/* eslint-disable unicorn/filename-case */
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getDomainIP, getDomainMX, getDomainNS } from 'services/domain';

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  try {
    //pull domain name from query string.
    const domain = request.query['domain'] as string;
    // load all endpoint results, then return array value
    const result = await Promise.all([await getDomainIP(domain), await getDomainMX(domain), await getDomainNS(domain)]);

    response.status(200).json({
      ip: result[0],
      mx: result[1],
      ns: result[2],
    });
  } catch (error) {
    response.status(400).json({ error: `cannot find domain: ${error}` });
  }
}
