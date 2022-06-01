interface EmailProvider {
  name: string;
  mxRecords: string[];
}

const EMAIL_PROVIDERS: EmailProvider[] = [
  {
    name: 'Google Workspace',
    mxRecords: ['aspmx.l.google.com', 'alt1.aspmx.l.google.com', 'alt2.aspmx.l.google.com', 'alt3.aspmx.l.google.com', 'alt4.aspmx.l.google.com'],
  },

  {
    name: 'Microsoft 365',
    mxRecords: ['mail.protection.outlook.com'],
  },
  {
    name: 'Rackspace',
    mxRecords: ['mx1.emailsrvr.com', 'mx2.emailsrvr.com'],
  },

  {
    name: 'GoDaddy',
    mxRecords: ['mailstore1.secureserver.net', 'smtp.secureserver.net'],
  },
];

export default function getEmailProvider(mx: string | string[] = []): string {
  try {
    const result = EMAIL_PROVIDERS.find((provider) =>
      typeof mx === 'string'
        ? provider.mxRecords.includes(
            // juryrig to validate Microsoft 365 MX records (domain-com.mail.protection.outlook.com)
            mx.includes('mail.protection.outlook.com') ? 'mail.protection.outlook.com' : mx
          )
        : provider.mxRecords.some((mxRecord) => mx.includes(mxRecord))
    );

    if (!result) {
      return 'unknown';
    }

    return result.name;
  } catch {
    throw new Error('invalid input');
  }
}
