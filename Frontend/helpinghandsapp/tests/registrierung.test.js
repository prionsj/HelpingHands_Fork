import { handleRegistration } from '../src/components/Registrierung';
import 'jest-localstorage-mock';
import { useNavigate } from 'react-router-dom';
import fetchMock from 'jest-fetch-mock';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('handleRegistration', () => {
  let mockEvent;
  let mockBenutzer;
  let mockSetShowPopup;
  let mockSetShowPopup2;
  let navigateMock;

  beforeEach(() => {
    mockEvent = {
      preventDefault: jest.fn(),
    };
    mockBenutzer = [
      { nutzername: 'existingUsername', email: 'existingEmail@example.com' },
    ];
    mockSetShowPopup = jest.fn();
    mockSetShowPopup2 = jest.fn();
    navigateMock = jest.fn();
    useNavigate.mockReturnValue(navigateMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(() => {
    fetchMock.enableMocks();
  });

  afterAll(() => {
    fetchMock.disableMocks();
  });

  test('should show popup if all fields are empty', () => {
    handleRegistration(
      mockEvent,
      mockBenutzer,
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      navigateMock,
      mockSetShowPopup,
      mockSetShowPopup2
    );

    expect(navigateMock).not.toHaveBeenCalled();
    expect(mockSetShowPopup).toHaveBeenCalledWith(true);
    expect(mockSetShowPopup2).not.toHaveBeenCalled();
  });

  test('should navigate to home page if registration is successful', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}));

    await handleRegistration(
      mockEvent,
      mockBenutzer,
      'Vorname',
      'Nachname',
      'Adresse',
      'Stadt',
      'Bundesland',
      '12345',
      '1234567890',
      'newUsername',
      'newEmail@example.com',
      'password123',
      navigateMock,
      mockSetShowPopup,
      mockSetShowPopup2
    );

    expect(navigateMock).toHaveBeenCalledWith('/');
  });

  it('should show popup if username is already taken', () => {
    // Testfall: Der eingegebene Benutzername existiert bereits
    handleRegistration(
        mockEvent,
        mockBenutzer,
        'Vorname',
        'Nachname',
        'Straße',
        'hausnummer',
        'Postleitzahl',
        'Stadt',
        'newEmail@example.com',
        '1234567890',
        'existingUsername', // Username (bereits vorhanden)
        'password123',
        navigateMock,
        mockSetShowPopup,
        mockSetShowPopup2
    );
    expect(navigateMock).not.toHaveBeenCalled();
    expect(mockSetShowPopup2).toHaveBeenCalledWith(true);
    expect(mockSetShowPopup).not.toHaveBeenCalled();
});

it('should show popup if email is already registered', () => {
    // Testfall: Die eingegebene E-Mail-Adresse ist bereits registriert
    handleRegistration(
        mockEvent,
        mockBenutzer,
        'Vorname',
        'Nachname',
        'Straße',
        'hausnummer',
        'Postleitzahl',
        'Stadt',
        'existingEmail@example.com', // E-Mail-Adresse (bereits registriert)
        '1234567890',
        'newUsername',
        'password123',
        navigateMock,
        mockSetShowPopup,
        mockSetShowPopup2
    );
    expect(navigateMock).not.toHaveBeenCalled();
    expect(mockSetShowPopup2).toHaveBeenCalledWith(true);
    expect(mockSetShowPopup).not.toHaveBeenCalled();
});

it('should show popup if username and email are already taken', () => {
  handleRegistration(
    mockEvent,
    mockBenutzer,
    'Vorname',
    'Nachname',
    'Straße',
    'hausnummer',
    'Postleitzahl',
    'Stadt',
    'existingEmail@example.com', // Existing email
    '1234567890',
    'existingUsername', // Existing username
    'password123',
    navigateMock,
    mockSetShowPopup,
    mockSetShowPopup2
  );

  expect(navigateMock).not.toHaveBeenCalled();
  expect(mockSetShowPopup).not.toHaveBeenCalled();
  expect(mockSetShowPopup2).toHaveBeenCalledWith(true);

});
it('should show popup if email field is left empty', () => {
  // Testfall: Das E-Mail-Feld wurde leer gelassen
  handleRegistration(
    mockEvent,
    mockBenutzer,
    'Vorname',
    'Nachname',
    'Straße',
    'hausnummer',
    'Postleitzahl',
    'Stadt',
    '', // Leer gelassene E-Mail
    '1234567890',
    'newUsername',
    'password123',
    navigateMock,
    mockSetShowPopup,
    mockSetShowPopup2
  );
  expect(navigateMock).not.toHaveBeenCalled();
  expect(mockSetShowPopup).toHaveBeenCalledWith(true);
  expect(mockSetShowPopup2).not.toHaveBeenCalled();
});

it('should show popup if username field is left empty', () => {
  // Testfall: Das Nutzername-Feld wurde leer gelassen
  handleRegistration(
    mockEvent,
    mockBenutzer,
    'Vorname',
    'Nachname',
    'Straße',
    'hausnummer',
    'Postleitzahl',
    'Stadt',
    'newEmail@example.com',
    '1234567890',
    '', // Leer gelassener Nutzername
    'password123',
    navigateMock,
    mockSetShowPopup,
    mockSetShowPopup2
  );
  expect(navigateMock).not.toHaveBeenCalled();
  expect(mockSetShowPopup).toHaveBeenCalledWith(true);
  expect(mockSetShowPopup2).not.toHaveBeenCalled();
});

it('should show popup if password field is left empty', () => {
  // Testfall: Das Passwort-Feld wurde leer gelassen
  handleRegistration(
    mockEvent,
    mockBenutzer,
    'Vorname',
    'Nachname',
    'Straße',
    'hausnummer',
    'Postleitzahl',
    'Stadt',
    'newEmail@example.com',
    '1234567890',
    'newUsername',
    '', // Leer gelassenes Passwort
    navigateMock,
    mockSetShowPopup,
    mockSetShowPopup2
  );
  expect(navigateMock).not.toHaveBeenCalled();
  expect(mockSetShowPopup).toHaveBeenCalledWith(true);
  expect(mockSetShowPopup2).not.toHaveBeenCalled();
});

it('should show popup if name field is left empty', () => {
  // Testfall: Das Name-Feld wurde leer gelassen
  handleRegistration(
    mockEvent,
    mockBenutzer,
    '', // Leer gelassener Vorname
    '',
    'Straße',
    'hausnummer',
    'Postleitzahl',
    'Stadt',
    'newEmail@example.com',
    '1234567890',
    'newUsername',
    'password123',
    navigateMock,
    mockSetShowPopup,
    mockSetShowPopup2
  );
  expect(navigateMock).not.toHaveBeenCalled();
  expect(mockSetShowPopup).toHaveBeenCalledWith(true);
  expect(mockSetShowPopup2).not.toHaveBeenCalled();
});

});
