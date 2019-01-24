/// <reference types="Cypress" />

const CREATED_HTTP_STATUS = 201;
const EMAIL_INPUT_SELECTOR = 'input[name="email"]';
const ARTIST_NAME_INPUT_SELECTOR = 'input[name="name"]';
const PASSWORD_INPUT_SELECTOR = 'input[name="password"]';
const SUBMIT_SELECTOR = 'button[type="submit"]';

const PASSWORD = '11111111';

const SIGN_UP_URL = 'http://localhost/signup/';
const CREATE_ARTIST_ENDPOINT = '/v1/artists';

context('Sign up', () => {
  beforeEach(() => {
    cy.visit(SIGN_UP_URL);
  });

  it('flow works for a new user with default artist type', () => {
    cy.server();
    cy.route(CREATE_ARTIST_ENDPOINT).as('createArtist');

    const randomizer = Math.floor(Math.random() * 10000);
    const emailAddress = `signuptest+${randomizer}@opuslive.io`;

    cy.get(EMAIL_INPUT_SELECTOR).type(emailAddress);
    cy.get(ARTIST_NAME_INPUT_SELECTOR).type(`test artist ${randomizer}`);
    cy.get(PASSWORD_INPUT_SELECTOR).type(PASSWORD);
    cy.get(SUBMIT_SELECTOR).click();

    cy.wait('@createArtist').its('status').should('equal', CREATED_HTTP_STATUS);
  });
});
