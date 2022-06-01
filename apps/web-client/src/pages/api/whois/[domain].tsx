/* eslint-disable unicorn/filename-case */
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import whois from 'whois-json';

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  try {
    //pull domain name from query string.
    const domain = request.query['domain'];
    const result = await whois(domain as string, { verbose: true });

    if (Array.isArray(result)) {
      response.status(200).json(result[result.length - 1].data);
    } else {
      response.status(200).json(result);
    }
  } catch (error) {
    response.status(400).json({ error: `cannot find domain: ${error}` });
  }
}
