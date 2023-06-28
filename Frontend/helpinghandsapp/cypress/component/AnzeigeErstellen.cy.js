import React from 'react';
import { mount } from '@cypress/react18';
import { MemoryRouter } from 'react-router-dom';
import AnzeigeErstellen from '../../src/components/AnzeigeErstellen';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import '../../src/App.css';

describe('testing AnzeigeErstellen component', () => {
  beforeEach(() => {
    cy.viewport(375, 790);
    mount(
      <MemoryRouter>
        <AnzeigeErstellen />
      </MemoryRouter>
    );
    cy.wait(5000);
  });

  it('renders the AnzeigeErstellen component', () => {
    // Überprüfe, ob die Komponente erfolgreich gerendert wurde
    cy.get('.helping-form').should('exist');
  });

  it('submits the form with all valid data', () => {
    // Fülle das Formular mit gültigen Daten aus
    cy.get('.title-input').type('Hilfe benötigt');
    cy.get('.category').select('Garten');
    cy.get('.place-input').type('Berlin');
    cy.get('.time-input').type('Sommerferien');
    cy.get('.description-input').type('Ich brauche Hilfe in meinem Garten.');

    // Überprüfe, ob das Formular erfolgreich abgeschickt wird
    cy.intercept('POST', 'http://localhost:3000/hilfsanzeige').as('submitForm');
    cy.get('.submit-button button').click({ force: true });
    cy.wait('@submitForm').then((interception) => {
      // Assertions zur Netzwerkanfrage hier
      expect(interception.request.method).to.equal('POST');
      expect(interception.request.url).to.include('/hilfsanzeige');
    });
  });

  it('submits the form with needed valid data', () => {
    // Fülle das Formular mit gültigen Daten aus
    cy.get('.title-input').type('Babysitter');
    cy.get('.category').select('Betreuung');
    cy.get('.place-input').type('Hannover');
    cy.get('.time-input').type('Morgen');

    // Überprüfe, ob das Formular erfolgreich abgeschickt wird
    cy.intercept('POST', 'http://localhost:3000/hilfsanzeige').as('submitForm');
    cy.get('.submit-button button').click({ force: true });
    cy.wait('@submitForm').then((interception) => {
      // Assertions zur Netzwerkanfrage hier
      expect(interception.request.method).to.equal('POST');
      expect(interception.request.url).to.include('/hilfsanzeige');
    });
  });

  it('does not display error popup when all required fields are filled', () => {
    // Fülle alle erforderlichen Felder aus
    cy.get('.title-input').type('Hilfe benötigt');
    cy.get('.category').select('Garten');
    cy.get('.place-input').type('Berlin');
    cy.get('.time-input').type('Sommerferien');
    cy.get('.description-input').type('Ich brauche Hilfe in meinem Garten.');
  
    // Überprüfe, ob das Popup nicht angezeigt wird
    cy.get('.popup').should('not.exist');
  });
  

  it('displays error popup with invalid form data', () => {
    // Lasse das Formular leer

    // Überprüfe, ob das Formular nicht abgeschickt wird
    cy.intercept('POST', 'http://localhost:3000/hilfsanzeige').as('submitForm');
    cy.get('.submit-button button').click({ force: true });


    // Warte auf das Popup-Element und überprüfe, ob es existiert
    cy.wait(1000);
    cy.get('.popup').should('exist');
  });

  it('displays error popup when only the title field is filled', () => {
    // Fülle nur das Titel-Feld aus
    cy.get('.title-input').type('Hilfe benötigt');

    // Überprüfe, ob das Formular nicht abgeschickt wird
    cy.intercept('POST', 'http://localhost:3000/hilfsanzeige').as('submitForm');
    cy.get('.submit-button button').click({ force: true });
  
    // Überprüfe, ob das Popup angezeigt wird
    cy.wait(1000);
    cy.get('.popup').should('exist');
  });

  it('displays error popup when only the location field is filled', () => {
    // Fülle nur das Standort-Feld aus
    cy.get('.place-input').type('Berlin');
  
    // Überprüfe, ob das Formular nicht abgeschickt wird
    cy.intercept('POST', 'http://localhost:3000/hilfsanzeige').as('submitForm');
    cy.get('.submit-button button').click({ force: true });
    
    // Überprüfe, ob das Popup angezeigt wird
    cy.wait(1000);
    cy.get('.popup').should('exist');
  });

  it('displays error popup when only the description field is filled', () => {
    // Fülle nur das Beschreibung-Feld aus
    cy.get('.description-input').type('Ich brauche Hilfe in meinem Garten.');
  
    // Überprüfe, ob das Formular nicht abgeschickt wird
    cy.intercept('POST', 'http://localhost:3000/hilfsanzeige').as('submitForm');
    cy.get('.submit-button button').click({ force: true });
    
    // Überprüfe, ob das Popup angezeigt wird
    cy.wait(1000);
    cy.get('.popup').should('exist');
  });

  it('closes the popup when the close button is clicked', () => {
    // Fülle das Formular mit gültigen Daten aus
    cy.get('.title-input').type('Hilfe benötigt');
    cy.get('.time-input').type('Sommerferien');
    cy.get('.description-input').type('Ich brauche Hilfe in meinem Garten.');
  
    // Klicke auf den Submit-Button
    cy.get('.submit-button button').click({ force: true });
  
    // Überprüfe, ob das Popup angezeigt wird
    cy.get('.popup').should('exist');
  
    // Klicke auf das Schließen-Symbol (Kreuz)
    cy.get('.popup .close-button').click();
  
    // Überprüfe, ob das Popup geschlossen ist
    cy.get('.popup').should('not.exist');
  });
  
});
