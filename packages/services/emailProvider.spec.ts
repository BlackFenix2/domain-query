import getEmailProvider from './emailProvider';

describe('getEmailProvider', () => {
  it('should return google', () => {
    const MX = ['aspmx.l.google.com', 'alt1.aspmx.l.google.com', 'alt2.aspmx.l.google.com', 'alt3.aspmx.l.google.com', 'alt4.aspmx.l.google.com'];

    const result = getEmailProvider(MX);

    expect(result).toBe('Google Workspace');
  });

  it('should return microsoft', () => {
    const MX = 'popmenu-com.mail.protection.outlook.com';

    const result = getEmailProvider(MX);

    expect(result).toBe('Microsoft 365');
  });

  it('should return rackspace', () => {
    const MX = 'mx1.emailsrvr.com';

    const result = getEmailProvider(MX);

    expect(result).toBe('Rackspace');
  });

  it('should return unknown string on invalid MX records', () => {
    const MX = 'dwadwdwa';

    expect(getEmailProvider(MX)).toBe('unknown');
  });

  it('should throw an error on invalid input', () => {
    const MX = 334 as any;

    expect(() => getEmailProvider(MX)).toThrowError('invalid input');
  });
});
