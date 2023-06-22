import { useNavigate } from 'react-router-dom';
import { handleLogin } from '../src/components/Login';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('Handle Login', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const benutzer = [
    { nutzername: 'user1', passwort: 'pass1' },
    { nutzername: 'user2', passwort: 'pass2' },
  ];

  test('should handle login with correct credentials', () => {
    const navigateMock = jest.fn();
    useNavigate.mockReturnValue(navigateMock);

    handleLogin('user1', 'pass1', benutzer, navigateMock, jest.fn());

    expect(navigateMock).toHaveBeenCalledWith('/hilfsanzeigen');
    // Weitere Assertions für localStorage.setItem
  });

  test('should handle login with incorrect credentials', () => {
    const navigateMock = jest.fn();
    const setShowPopupMock = jest.fn();

    handleLogin('wronguser', 'wrongpass', benutzer, navigateMock, setShowPopupMock);

    expect(navigateMock).not.toHaveBeenCalled();
    expect(setShowPopupMock).toHaveBeenCalledWith(true);
  });

  test('should handle login with empty fields', () => {
    const navigateMock = jest.fn();
    const setShowPopupMock = jest.fn();

    handleLogin('', '', benutzer, navigateMock, setShowPopupMock);

    expect(navigateMock).not.toHaveBeenCalled();
    expect(setShowPopupMock).toHaveBeenCalledWith(true);
  });

  test('should handle login with correct username but incorrect password', () => {
    const navigateMock = jest.fn();
    const setShowPopupMock = jest.fn();

    handleLogin('user1', 'wrongpass', benutzer, navigateMock, setShowPopupMock);

    expect(navigateMock).not.toHaveBeenCalled();
    expect(setShowPopupMock).toHaveBeenCalledWith(true);
  });

  test('should handle login with incorrect username but correct password', () => {
    const navigateMock = jest.fn();
    const setShowPopupMock = jest.fn();

    handleLogin('wronguser', 'pass1', benutzer, navigateMock, setShowPopupMock);

    expect(navigateMock).not.toHaveBeenCalled();
    expect(setShowPopupMock).toHaveBeenCalledWith(true);
  });

  test('should handle login with correct username but empty password field', () => {
    const navigateMock = jest.fn();
    const setShowPopupMock = jest.fn();

    handleLogin('user1', '', benutzer, navigateMock, setShowPopupMock);

    expect(navigateMock).not.toHaveBeenCalled();
    expect(setShowPopupMock).toHaveBeenCalledWith(true);
  });

  test('should handle login with empty username field but correct password', () => {
    const navigateMock = jest.fn();
    const setShowPopupMock = jest.fn();

    handleLogin('', 'pass1', benutzer, navigateMock, setShowPopupMock);

    expect(navigateMock).not.toHaveBeenCalled();
    expect(setShowPopupMock).toHaveBeenCalledWith(true);
  });
});
