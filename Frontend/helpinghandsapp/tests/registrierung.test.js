import { handleRegistration } from '../src/components/Registrierung';
describe('handleRegistration', () => {
    let mockEvent;
    let mockBenutzer;
    let mockNavigate;
    let mockSetShowPopup;
    let mockSetShowPopup2;

    beforeEach(() => {
        mockEvent = {
            preventDefault: jest.fn(),
        };
        mockBenutzer = [
            { nutzername: 'existingUsername', email: 'existingEmail@example.com' },
        ];
        mockNavigate = jest.fn();
        mockSetShowPopup = jest.fn();
        mockSetShowPopup2 = jest.fn();
    });

    it('should show popup if all fields are empty', () => {
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
            mockNavigate,
            mockSetShowPopup,
            mockSetShowPopup2
        );

        expect(mockSetShowPopup).toHaveBeenCalledWith(true);
        expect(mockSetShowPopup2).not.toHaveBeenCalled();
    });
});
