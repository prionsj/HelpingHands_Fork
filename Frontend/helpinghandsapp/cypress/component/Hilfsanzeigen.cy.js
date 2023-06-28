import React from 'react';
import { mount } from '@cypress/react18';
import { MemoryRouter } from 'react-router-dom';
import Hilfsanzeigen from '../../src/components/Hilfsanzeigen';

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

import "../../src/App.css"

describe('testing filter function of <Hilfsanzeigen />', () => {

  beforeEach(() => {
    cy.viewport(375, 790)
    mount(
      <MemoryRouter>
        <Hilfsanzeigen />
      </MemoryRouter>
    );
  });

  it('renders the Hilfsanzeigen component', () => {
    // Überprüfe, ob die Komponente erfolgreich gerendert wurde
    cy.get('.hilfsanzeigen-page').should('exist');
  });

  it('displays help offers based on selected location', () => {
    // Überprüfe, ob es Anzeigen mit dem Standort "Karlsruhe" gibt
    cy.get('.hilfen .card li .stadt')
        .then((offersKarlsruhe) => {
          const amountOffersKarlsruhe = offersKarlsruhe.filter((_, offers) => {
            return Cypress.$(offers).text().includes('Karlsruhe');
          }).length;

          if (amountOffersKarlsruhe > 0) {
            // Wähle den Standort "Karlsruhe" aus
            cy.get('.search-container input[type="search"]').type('Karlsruhe{enter}');

            // Überprüfe, ob nur Anzeigen mit dem Standort "Karlsruhe" angezeigt werden
            cy.get('.hilfen .card li .stadt').each((hilfe) => {
              cy.wrap(hilfe).should('contain', 'Karlsruhe');
            });
          } else {
            cy.log('Keine Hilfsanzeigen mit dem Standort Karlsruhe gefunden.');
          }
        });
  });



  it('displays help offers based on selected category', () => {

    // Überprüfe, ob es Anzeigen mit der Kategorie "Garten" gibt
    cy.get('.hilfen .card li ul div li .category')
        .then((offersGarten) => {
          const amountOffersGarten = offersGarten.filter((_, offers) => {
            return Cypress.$(offers).text().includes('Garten');
          }).length;


          if (amountOffersGarten > 0) {
            // Wähle die Kategorie "Garten" aus der Kategorienauswahl
            cy.get('.category-container select').select('Garten');

            // Überprüfe, ob nur die Hilfsanzeigen mit der Kategorie "Garten" angezeigt werden
            cy.get('.hilfen .card li ul div li .category').each((kategorie) => {
              cy.wrap(kategorie).should('contain', 'Garten');
            });
          } else {
            cy.log('Keine Hilfsanzeigen mit der Kategorie Garten gefunden.');
          }
        });
  });

  it('displays help offers based on selected category and location', () => {
    // Überprüfe, ob es Anzeigen mit dem Standort "Karlsruhe" gibt
    cy.get('.hilfen .card li .stadt')
        .then((offersKarlsruhe) => {
          const amountOffersKarlsruhe = offersKarlsruhe.filter((_, offers) => {
            return Cypress.$(offers).text().includes('Karlsruhe');
          }).length;

          if (amountOffersKarlsruhe > 0) {
            // Wähle den Standort "Karlsruhe" aus
            cy.get('.search-container input[type="search"]').type('Karlsruhe{enter}');

            // Überprüfe, ob nur Anzeigen mit dem Standort "Karlsruhe" angezeigt werden
            cy.get('.hilfen .card li .stadt').each((hilfe) => {
              cy.wrap(hilfe).should('contain', 'Karlsruhe');
            });
          } else {
            cy.log('Keine Hilfsanzeigen mit dem Standort Karlsruhe gefunden.');
          }
        });


    // Überprüfe, ob es Anzeigen mit der Kategorie "Garten" gibt
    cy.get('.hilfen .card li ul div li .category')
        .then((offersGarten) => {
          const amountOffersGarten = offersGarten.filter((_, offers) => {
            return Cypress.$(offers).text().includes('Garten');
          }).length;


          if (amountOffersGarten > 0) {
            // Wähle die Kategorie "Garten" aus der Kategorienauswahl
            cy.get('.category-container select').select('Garten');

            // Überprüfe, ob nur die Hilfsanzeigen mit der Kategorie "Garten" angezeigt werden
            cy.get('.hilfen .card li ul div li .category').each((kategorie) => {
              cy.wrap(kategorie).should('contain', 'Garten');
            });
          } else {
            cy.log('Keine Hilfsanzeigen mit der Kategorie Garten gefunden.');
          }
        });
  });

});
