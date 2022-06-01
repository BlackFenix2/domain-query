declare namespace Cypress {
  interface Chainable<Subject> {
    generateFixture: () => void; // more DRY than the following:
    // myCustomCommand(value: string): Cypress.Chainable<JQuery>
  }
}
