import React from 'react';
import { mount } from '@cypress/react18';
import { MemoryRouter } from 'react-router-dom';
import Hilfsanzeigen from './Hilfsanzeigen';
import "../App.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

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
    cy.viewport(375, 790)
    // Überprüfe, ob die Komponente erfolgreich gerendert wurde
    cy.get('.hilfsanzeigen-page').should('exist');
  });

  it('displays help offers based on selected location', () => {
    cy.viewport(375, 790)
    // Wähle einen Standort aus der Standortauswahl
    cy.get('.search-container input[type="search"]').type('Karlsruhe{enter}');

    // Überprüfe, ob nur die Hilfsanzeigen mit dem ausgewählten Standort angezeigt werden
    cy.get('.hilfen .card li .stadt').each((hilfe) => {
      cy.wrap(hilfe).should('contain', 'Karlsruhe');
    });
  });

  it('displays help offers based on selected category', () => {
    cy.viewport(375, 790)
    // Wähle eine Kategorie aus der Kategorienauswahl
    cy.get('.category-container select').select('Garten');

    // Überprüfe, ob nur die Hilfsanzeigen mit der ausgewählten Kategorie angezeigt werden
    cy.get('.hilfen .card li ul div li .category').each((kategorie) => {
      cy.wrap(kategorie).should('contain', 'Garten');
    });
  });

  it('displays help offers based on selected category and location', () => {
    cy.viewport(375, 790)
    // Wähle eine Kategorie aus der Kategorienauswahl
    cy.get('.category-container select').select('Garten');

    // Wähle einen Standort aus der Standortauswahl
    cy.get('.search-container input[type="search"]').type('Karlsruhe{enter}');

    // Überprüfe, ob nur die Hilfsanzeigen mit der ausgewählten Kategorie angezeigt werden
    cy.get('.hilfen .card li ul div li .category').each((kategorie) => {
      cy.wrap(kategorie).should('contain', 'Garten');

    });

    // Überprüfe, ob nur die Hilfsanzeigen mit dem ausgewählten Standort angezeigt werden
    cy.get('.hilfen .card li .stadt').each((hilfe) => {
    cy.wrap(hilfe).should('contain', 'Karlsruhe');
    });
  });

});
