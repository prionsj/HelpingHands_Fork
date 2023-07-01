import { handleRegistration } from '../src/components/Registrierung';
import 'jest-localstorage-mock';
import { useNavigate } from 'react-router-dom';
import fetchMock from 'jest-fetch-mock';

// Mock für die Verwendung von useNavigate
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

// Testfall für die Funktion handleRegistration
describe('handleRegistration', () => {
  let mockEvent;
  let mockBenutzer;
  let mockSetShowPopup;
  let mockSetShowPopup2;
  let navigateMock;

  // Vorbereitung der Testumgebung vor jedem Testfall
  beforeEach(() => {
    // Erstellen eines Mock-Event-Objekts mit einer Mock-Funktion für 'preventDefault'
    mockEvent = {
      preventDefault: jest.fn(),
    };

    // Erstellen eines Mock-Arrays mit einem vorhandenen Benutzer
    mockBenutzer = [
      { nutzername: 'existingUsername', email: 'existingEmail@example.com' },
    ];

    // Erstellen von Mock-Funktionen
    mockSetShowPopup = jest.fn();
    mockSetShowPopup2 = jest.fn();
    navigateMock = jest.fn();

    // Die Mock-Funktion 'navigateMock' wird als Rückgabewert für 'useNavigate' festgelegt
    useNavigate.mockReturnValue(navigateMock);
  });

  // Nach jedem Testfall werden alle Mock-Funktionen zurückgesetzt
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Vor dem ersten Testfall wird die Mock-Funktionalität für Fetch aktiviert
  beforeAll(() => {
    fetchMock.enableMocks();
  });

  // Nach dem letzten Testfall wird die Mock-Funktionalität für Fetch deaktiviert
  afterAll(() => {
    fetchMock.disableMocks();
  });

  // Überprüft, ob das Popup angezeigt wird, wenn alle Felder leer sind
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

    // Überprüft, ob navigateMock nicht aufgerufen wurde
    expect(navigateMock).not.toHaveBeenCalled();
    // Überprüft, ob mockSetShowPopup mit dem Wert true aufgerufen wurde
    expect(mockSetShowPopup).toHaveBeenCalledWith(true);
    // Überprüft, ob mockSetShowPopup2 nicht aufgerufen wurde
    expect(mockSetShowPopup2).not.toHaveBeenCalled();
  });

  // Überprüft, ob zur Startseite navigiert wird, wenn die Registrierung erfolgreich ist
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

    // Überprüft, ob navigateMock mit dem Wert '/' aufgerufen wurde
    expect(navigateMock).toHaveBeenCalledWith('/');
  });

  // Überprüft, ob ein Popup angezeigt wird, wenn der Benutzername bereits vergeben ist
  it('should show popup if username is already taken', () => {

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
    
    // Überprüft, ob navigateMock nicht aufgerufen wurde
    expect(navigateMock).not.toHaveBeenCalled();
    // Überprüft, ob mockSetShowPopup2 mit dem Wert true aufgerufen wurde
    expect(mockSetShowPopup2).toHaveBeenCalledWith(true);
    // Überprüft, ob mockSetShowPopup nicht aufgerufen wurde  
    expect(mockSetShowPopup).not.toHaveBeenCalled();
});

// Überprüft, ob ein Popup angezeigt wird, wenn die E-Mail-Adresse bereits registriert ist
it('should show popup if email is already registered', () => {

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

    // Überprüft, ob navigateMock nicht aufgerufen wurde
    expect(navigateMock).not.toHaveBeenCalled();
    // Überprüft, ob mockSetShowPopup2 mit dem Wert true aufgerufen wurde
    expect(mockSetShowPopup2).toHaveBeenCalledWith(true);
    // Überprüft, ob mockSetShowPopup nicht aufgerufen wurde
    expect(mockSetShowPopup).not.toHaveBeenCalled();
});

// Überprüft, ob ein Popup angezeigt wird, wenn Benutzername und E-Mail-Adresse bereits vergeben sind
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
    'existingEmail@example.com', // Vorhandene E-Mail-Adresse
    '1234567890',
    'existingUsername', // Vorhandener Benutzername
    'password123',
    navigateMock,
    mockSetShowPopup,
    mockSetShowPopup2
  );

  // Überprüft, ob navigateMock nicht aufgerufen wurde
  expect(navigateMock).not.toHaveBeenCalled();
  // Überprüft, ob mockSetShowPopup nicht aufgerufen wurde
  expect(mockSetShowPopup).not.toHaveBeenCalled();
  // Überprüft, ob mockSetShowPopup2 mit dem Wert true aufgerufen wurde
  expect(mockSetShowPopup2).toHaveBeenCalledWith(true);

});

// Überprüft, ob ein Popup angezeigt wird, wenn das E-Mail-Feld leer gelassen wurde
it('should show popup if email field is left empty', () => {
  
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

  // Überprüft, ob navigateMock nicht aufgerufen wurde
  expect(navigateMock).not.toHaveBeenCalled();
  // Überprüft, ob mockSetShowPopup mit dem Wert true aufgerufen wurde  
  expect(mockSetShowPopup).toHaveBeenCalledWith(true);
  // Überprüft, ob mockSetShowPopup2 nicht aufgerufen wurde
  expect(mockSetShowPopup2).not.toHaveBeenCalled();
});

// Überprüft, ob ein Popup angezeigt wird, wenn das Nutzername-Feld leer gelassen wurde
it('should show popup if username field is left empty', () => {

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

  // Überprüft, ob navigateMock nicht aufgerufen wurde
  expect(navigateMock).not.toHaveBeenCalled();
  // Überprüft, ob mockSetShowPopup mit dem Wert true aufgerufen wurde
  expect(mockSetShowPopup).toHaveBeenCalledWith(true);
  // Überprüft, ob mockSetShowPopup2 nicht aufgerufen wurde
  expect(mockSetShowPopup2).not.toHaveBeenCalled();
});

// Überprüft, ob ein Popup angezeigt wird, wenn das Passwort-Feld leer gelassen wurde
it('should show popup if password field is left empty', () => {

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

  // Überprüft, ob navigateMock nicht aufgerufen wurde
  expect(navigateMock).not.toHaveBeenCalled();
  // Überprüft, ob mockSetShowPopup mit dem Wert true aufgerufen wurde
  expect(mockSetShowPopup).toHaveBeenCalledWith(true);
  // Überprüft, ob mockSetShowPopup2 nicht aufgerufen wurde
  expect(mockSetShowPopup2).not.toHaveBeenCalled();
});

// Überprüft, ob ein Popup angezeigt wird, wenn das Name-Feld leer gelassen wurde
it('should show popup if name field is left empty', () => {

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

  // Überprüft, ob navigateMock nicht aufgerufen wurde
  expect(navigateMock).not.toHaveBeenCalled();
  // Überprüft, ob mockSetShowPopup mit dem Wert true aufgerufen wurde
  expect(mockSetShowPopup).toHaveBeenCalledWith(true);
  // Überprüft, ob mockSetShowPopup2 nicht aufgerufen wurde
  expect(mockSetShowPopup2).not.toHaveBeenCalled();
});

});
