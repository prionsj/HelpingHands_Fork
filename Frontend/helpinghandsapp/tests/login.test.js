import { useNavigate } from 'react-router-dom';
import { handleLogin } from '../src/components/Login';
import 'jest-localstorage-mock';

// Mock für die Verwendung von useNavigate
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

// Testfall für die Funktion handleLogin
describe('Handle Login', () => {
  // Wird nach jedem Test ausgeführt, um Mocks zu löschen
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Testdaten für Benutzer
  const benutzer = [
    { nutzername: 'user1', passwort: 'pass1' },
    { nutzername: 'user2', passwort: 'pass2' },
  ];

  // Testfälle für verschiedene Login-Szenarien

  // Testfall für den erfolgreichen Login mit korrekten Anmeldedaten
  test('should handle login with correct credentials', () => {
    // Mock-Funktionen und -Event erstellen
    const navigateMock = jest.fn(); 
    useNavigate.mockReturnValue(navigateMock);

    const eventMock = { preventDefault: jest.fn() };

    // Login mit korrekten Anmeldedaten durchführen
    handleLogin(eventMock, 'user1', 'pass1', benutzer, navigateMock, jest.fn());

    // Überprüfen, ob eventMock.preventDefault aufgerufen wurde
    expect(eventMock.preventDefault).toHaveBeenCalled();
    // Überprüfen, ob navigateMock mit '/hilfsanzeigen' aufgerufen wurde
    expect(navigateMock).toHaveBeenCalledWith('/hilfsanzeigen');
    // Zusätzliche Assertions für localStorage.setItem können hier ergänzt werden
  });

  // Testfall für den Login mit falschen Anmeldedaten
  test('should handle login with incorrect credentials', () => {
    // Mock-Funktionen erstellen
    const navigateMock = jest.fn();
    const setShowPopupMock = jest.fn();

    // Mock-Event erstellen
    const eventMock = { preventDefault: jest.fn() };

    // Login mit falschen Anmeldedaten durchführen
    handleLogin(eventMock, 'wronguser', 'wrongpass', benutzer, navigateMock, setShowPopupMock);

    // Überprüfen, ob eventMock.preventDefault aufgerufen wurde
    expect(eventMock.preventDefault).toHaveBeenCalled();
    // Überprüfen, ob navigateMock nicht aufgerufen wurde
    expect(navigateMock).not.toHaveBeenCalled();
    // Überprüfen, ob setShowPopupMock mit true aufgerufen wurde
    expect(setShowPopupMock).toHaveBeenCalledWith(true);
  });

  // Testfall für den Login mit leeren Feldern
  test('should handle login with empty fields', () => {
    // Mock-Funktionen erstellen
    const navigateMock = jest.fn();
    const setShowPopupMock = jest.fn();

    // Mock-Event erstellen
    const eventMock = { preventDefault: jest.fn() };

    // Login mit leeren Feldern durchführen
    handleLogin(eventMock, '', '', benutzer, navigateMock, setShowPopupMock);

    // Überprüfen, ob eventMock.preventDefault aufgerufen wurde
    expect(eventMock.preventDefault).toHaveBeenCalled();
    // Überprüfen, ob navigateMock nicht aufgerufen wurde
    expect(navigateMock).not.toHaveBeenCalled();
    // Überprüfen, ob setShowPopupMock mit true aufgerufen wurde
    expect(setShowPopupMock).toHaveBeenCalledWith(true);
  });

  // Testfall für den Login mit korrektem Benutzernamen, aber falschem Passwort
  test('should handle login with correct username but incorrect password', () => {
    // Mock-Funktionen erstellen
    const navigateMock = jest.fn();
    const setShowPopupMock = jest.fn();

    // Mock-Event erstellen
    const eventMock = { preventDefault: jest.fn() };

    // Login mit korrektem Benutzernamen, aber falschem Passwort durchführen
    handleLogin(eventMock, 'user1', 'wrongpass', benutzer, navigateMock, setShowPopupMock);

    // Überprüfen, ob eventMock.preventDefault aufgerufen wurde
    expect(eventMock.preventDefault).toHaveBeenCalled();
    // Überprüfen, ob navigateMock nicht aufgerufen wurde
    expect(navigateMock).not.toHaveBeenCalled();
    // Überprüfen, ob setShowPopupMock mit true aufgerufen wurde
    expect(setShowPopupMock).toHaveBeenCalledWith(true);
  });

  // Testfall für den Login mit falschem Benutzernamen, aber korrektem Passwort
  test('should handle login with incorrect username but correct password', () => {
    // Mock-Funktionen erstellen
    const navigateMock = jest.fn();
    const setShowPopupMock = jest.fn();

    // Mock-Event erstellen
    const eventMock = { preventDefault: jest.fn() };

    // Login mit falschem Benutzernamen, aber korrektem Passwort durchführen
    handleLogin(eventMock, 'wronguser', 'pass1', benutzer, navigateMock, setShowPopupMock);

    // Überprüfen, ob eventMock.preventDefault aufgerufen wurde
    expect(eventMock.preventDefault).toHaveBeenCalled();
    // Überprüfen, ob navigateMock nicht aufgerufen wurde
    expect(navigateMock).not.toHaveBeenCalled();
    // Überprüfen, ob setShowPopupMock mit true aufgerufen wurde
    expect(setShowPopupMock).toHaveBeenCalledWith(true);
  });

  // Testfall für den Login mit korrektem Benutzernamen, aber leerem Passwortfeld
  test('should handle login with correct username but empty password field', () => {
    // Mock-Funktionen erstellen
    const navigateMock = jest.fn();
    const setShowPopupMock = jest.fn();

    // Mock-Event erstellen
    const eventMock = { preventDefault: jest.fn() };

    // Login mit korrektem Benutzernamen, aber leerem Passwortfeld durchführen
    handleLogin(eventMock, 'user1', '', benutzer, navigateMock, setShowPopupMock);

    // Überprüfen, ob eventMock.preventDefault aufgerufen wurde
    expect(eventMock.preventDefault).toHaveBeenCalled();
    // Überprüfen, ob navigateMock nicht aufgerufen wurde
    expect(navigateMock).not.toHaveBeenCalled();
    // Überprüfen, ob setShowPopupMock mit true aufgerufen wurde
    expect(setShowPopupMock).toHaveBeenCalledWith(true);
  });

  // Testfall für den Login mit leerem Benutzernamenfeld, aber korrektem Passwort
  test('should handle login with empty username field but correct password', () => {
    // Mock-Funktionen erstellen
    const navigateMock = jest.fn();
    const setShowPopupMock = jest.fn();

    // Mock-Event erstellen
    const eventMock = { preventDefault: jest.fn() };

    // Login mit leerem Benutzernamenfeld, aber korrektem Passwort durchführen
    handleLogin(eventMock, '', 'pass1', benutzer, navigateMock, setShowPopupMock);

    // Überprüfen, ob eventMock.preventDefault aufgerufen wurde
    expect(eventMock.preventDefault).toHaveBeenCalled();
    // Überprüfen, ob navigateMock nicht aufgerufen wurde
    expect(navigateMock).not.toHaveBeenCalled();
    // Überprüfen, ob setShowPopupMock mit true aufgerufen wurde
    expect(setShowPopupMock).toHaveBeenCalledWith(true);
  });

});
