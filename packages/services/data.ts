import { Client, Get, Collection, Documents, Lambda, Map, Paginate } from 'faunadb';

const DOCUMENT_NAME = 'domains';
const client = new Client({
  secret: 'fnAEa5PC0xAAQGYiXQRoGgW1gC7bl7PZKBaThle8',
  domain: 'db.us.fauna.com',
});

export async function getDomainList() {
  try {
    const q = await client.query<{ data: any }>(
      Map(
        Paginate(Documents(Collection(DOCUMENT_NAME))),
        Lambda((x) => Get(x))
      )
    );

    return q.data;
  } catch (error) {
    console.error(JSON.stringify(error));
  }
}

export async function getDomainDetails(domain: string) {
  try {
    const q = await client.query<{ data: any }>(
      Map(
        Paginate(Documents(Collection(DOCUMENT_NAME))),
        Lambda((x) => Get(x))
      )
    );

    return q.data;
  } catch (error) {
    console.error(JSON.stringify(error));
  }
}

export async function insertDomainDetails(data: any) {
  try {
    const q = await client.query<{ data: any }>(
      Map(
        Paginate(Documents(Collection(DOCUMENT_NAME))),
        Lambda((x) => Get(x))
      )
    );

    return q.data;
  } catch (error) {
    console.error(JSON.stringify(error));
  }
}

/**
 * test run for standalone execution
 * @param {string} domain
 */
const run = async () => {
  const response = await getDomainList();
  console.error(response.map((x: any) => x.data.domainName));
};
