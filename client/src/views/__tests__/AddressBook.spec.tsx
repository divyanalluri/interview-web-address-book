import '@testing-library/jest-dom';
import { render, screen, waitFor, act, fireEvent } from '@testing-library/react';
import AddressBook from '../AddressBook';
import { ContactsService } from '../../services/ContactsService';
import * as Utils from '../../utils/ScreenUtils';

jest.mock('../../services/ContactsService');
jest.mock('../../utils/ScreenUtils', () => ({
    isMobile: jest.fn().mockReturnValue(true),
}));

const people = [{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Smith' }]
describe('AddressBook Component', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    })
    it('renders no contacts available message when no contacts', async () => {
        (ContactsService.getContacts as jest.Mock).mockResolvedValue({ people: [] });
        await act(async () => {
            render(<AddressBook />);
        });
        expect(await screen.queryAllByText('No contacts to display').length).toBeGreaterThan(0);
    });

    it('renders Address book when contacts are available', async () => {
        (ContactsService.getContacts as jest.Mock).mockResolvedValue({
            people: [{
                "id": 1,
                "name": "Adam Wright",
                "profile_photo_url": "https://example.com/photos/adam_wright.jpg",
                "phoneNumber": "123-456-7890",
                "department": "Engineering",
                "email": "adam.wright@example.com",
            },]
        });
        await act(async () => {
            render(<AddressBook />);
        });

        expect(screen.queryAllByText('Adam Wright').length).toBeGreaterThan(0);
    });

    it('search input filters contacts', async () => {
        (ContactsService.getContacts as jest.Mock).mockResolvedValue({
            people,
        });

        await act(async () => {
            render(<AddressBook />);
        });

        await waitFor(() => expect(screen.getByText('John Doe')).toBeInTheDocument());
        fireEvent.change(screen.getByPlaceholderText('Search for contacts...'), { target: { value: 'Jane' } });
        expect(screen.queryByText('John Doe')).toBeNull();
        expect(screen.queryAllByText('Jane Smith').length).toBeGreaterThan(0);
    });

    it('sort button toggles order', async () => {
        (ContactsService.getContacts as jest.Mock).mockResolvedValue({
            people: [{ id: 1, name: 'B' }, { id: 2, name: 'A' }],
        });

        await act(async () => {
            render(<AddressBook />);
        });

        let items = screen.getAllByRole('listitem');
        expect(items[0]).toHaveTextContent('A');
        expect(items[1]).toHaveTextContent('B');

        fireEvent.click(screen.getAllByLabelText(/Toggle sort order/i)[0]);

        items = await screen.findAllByRole('listitem');

        expect(items[0]).toHaveTextContent('B');
        expect(items[1]).toHaveTextContent('A');
    });

    it('clicking on a contact updates selected contact', async () => {
        (ContactsService.getContacts as jest.Mock).mockResolvedValue({
            people,
        });

        await act(async () => {
            render(<AddressBook />);
        });

        fireEvent.click(screen.getByText('John Doe'));
        expect(screen.queryAllByText('John Doe').length).toBeGreaterThan(1);
    });

    it('onClickContact hides contact list and shows contact details', async () => {
        (Utils.isMobile as jest.Mock).mockReturnValue(true);
        (ContactsService.getContacts as jest.Mock).mockResolvedValue({
            people,
        });
        const { container } = await act(async () => {
            return render(<AddressBook />);
        });

        fireEvent.click(screen.getByText('John Doe'));

        const contactList = container.querySelector('#contact-list-navigation');
        const contactDetails = container.querySelector('#contact-details');

        expect(contactList).toHaveClass('d-none');
        expect(contactDetails).not.toHaveClass('d-none');
    });

    it('onClickBackButton shows contact list and hides contact details on mobile', async () => {
        (Utils.isMobile as jest.Mock).mockReturnValue(true);
        (ContactsService.getContacts as jest.Mock).mockResolvedValue({
            people
        });

        const { container } = await act(async () => {
            return render(<AddressBook />);
        });

        const contactList = container.querySelector('#contact-list-navigation');
        const contactDetails = container.querySelector('#contact-details');

        fireEvent.click(screen.getByText('John Doe'));
        expect(contactList).toHaveClass('d-none');
        expect(contactDetails).not.toHaveClass('d-none');

        fireEvent.click(screen.getAllByLabelText(/Back Button/i)[0]);

        expect(contactList).not.toHaveClass('d-none');
        expect(contactDetails).toHaveClass('d-none');
    });

    it('should call deleteContact when the Delete button is clicked', async () => {
        (ContactsService.getContacts as jest.Mock).mockResolvedValue({
            people
        });
        (ContactsService.deleteContact as jest.Mock).mockResolvedValue({});
        const { getByText } = await act(async () => {
            return render(<AddressBook />);
        });
        fireEvent.click(screen.getByText('Jane Smith'));
        fireEvent.click(getByText('Delete Contact'));
        await waitFor(() => {
            expect(screen.queryByText('Jane Smith')).toBeNull();
        });

        expect(ContactsService.deleteContact).toHaveBeenCalledWith(2);
    });
});