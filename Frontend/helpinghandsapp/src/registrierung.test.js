import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import Registrierung from './components/Registrierung.js';
import Modal from 'react-modal';

// Definiere hier das App-Element für react-modal
Modal.setAppElement(document.createElement('div'));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('Registrierung', () => {
  test('form submission with empty fields should show error popup', () => {
    render(
      <MemoryRouter>
        <Registrierung />
      </MemoryRouter>
    );

    const submitButton = screen.getByText('Registrieren');
    fireEvent.click(submitButton);

    const errorPopup = screen.getByText(
      'Für die Registrierung müssen alle Datenfelder ausgefüllt werden.'
    );
    expect(errorPopup).toBeInTheDocument();
  });

});
