const sampleDomains = ['google.com', 'youtube.com', 'facebook.com', 'twitter.com', 'instagram.com', 'popmenu.com'];

describe('Query Domain', () => {
  // clear session storage

  before(() => {
    // visit page and clear session storage
    cy.visit('http://localhost:3000').then((win) => {
      win.sessionStorage.clear();
    });
  });

  // get input field as alias
  beforeEach(() => {
    // get alias
    cy.get('input[type=text]').as('input');
  });

  afterEach(() => {
    cy.get('@input').clear();
  });
  context('User is trying to query a single domain name', () => {
    it('should fail validation when submiting a blank value', () => {
      cy.get('@input').type('{enter}');
      cy.url().should('include', '');
      cy.get('#domain-search-helper-text').should('contain', 'Please enter a valid domain name');
    });

    it('should fail validation when submiting a domain name with invalid characters', () => {
      cy.get('@input').type('domain+_').type('{enter}');
      cy.get('@input').click();
      cy.url().should('include', '');
      cy.get('#domain-search-helper-text').should('contain', 'Please enter a valid domain name');
    });
    it('should return null when the domain name does not exist', () => {
      //intercept api
      cy.intercept('GET', '/api/whois/*', {
        statusCode: 200,
        fixture: 'whois-empty.json',
      }).as('whoisapi');

      cy.intercept('GET', '/api/dns/*', {
        statusCode: 200,
        fixture: 'dns-empty.json',
      }).as('dnsapi');

      cy.get('@input').type('hkefefnej.com').type('{enter}');

      cy.wait('@dnsapi').then((xhr) => {
        expect(xhr.response?.statusCode).to.eq(200);
        expect(xhr.response?.body.ip.responseCode).to.eq('NAME_ERROR');
      });

      cy.wait('@whoisapi').then((xhr) => {
        expect(xhr.response?.statusCode).to.eq(200);
        expect(xhr.response?.body.domainName).to.eq('');
      });
      cy.url().should('include', '');
    });

    it('should query a domain name', () => {
      cy.intercept('GET', '/api/whois/*', {
        statusCode: 200,
        fixture: 'whois.json',
      }).as('whoisapi');

      cy.intercept('GET', '/api/dns/*', {
        statusCode: 200,
        fixture: 'dns.json',
      }).as('dnsapi');

      cy.get('@input').type('example.com').type('{enter}');

      cy.wait('@dnsapi').then((xhr) => {
        expect(xhr.response?.statusCode).to.eq(200);
        expect(xhr.response?.body.ip.responseCode).to.eq('NO_ERROR');
      });

      cy.wait('@whoisapi').then((xhr) => {
        expect(xhr.response?.statusCode).to.eq(200);
        expect(xhr.response?.body.domainName).to.eq('example.com');
      });
      cy.url().should('include', '');
    });
  });

  context('User is trying to query a recent domain', () => {
    it('should delete recent domain queries', () => {
      cy.get('[data-testid="DeleteIcon"]').each(($el, index, $list) => {
        cy.get('[data-testid="DeleteIcon"]').first().click();
      });
    });

    // query sample domain names for recent items
    sampleDomains.forEach((domain) => {
      it(`should query the domain name ${domain}`, () => {
        // dynamic fixture for whois
        cy.fixture('whois.json').then((whois) => {
          whois.domainName = domain;
          cy.intercept('GET', '/api/whois/*', {
            statusCode: 200,
            body: whois,
          }).as('whoisapi');
        });

        cy.intercept('GET', '/api/dns/*', {
          statusCode: 200,
          fixture: 'dns.json',
        }).as('dnsapi');
        cy.get('@input').type(domain).type('{enter}');

        cy.wait('@dnsapi').then((xhr) => {
          expect(xhr.request.url).to.include(domain);
          expect(xhr.response?.statusCode).to.eq(200);
          expect(xhr.response?.body.ip.responseCode).to.eq('NO_ERROR');
        });

        cy.wait('@whoisapi').then((xhr) => {
          expect(xhr.request.url).to.include(domain);
          expect(xhr.response?.statusCode).to.eq(200);
          expect(xhr.response?.body.domainName).to.eq(domain);
        });
        cy.url().should('include', '');
      });
    });

    it(`should have ${sampleDomains.length} recent domain queries`, () => {
      cy.get('[data-testid="DeleteIcon"]').should('have.length', sampleDomains.length);
    });
  });
});

export {};
