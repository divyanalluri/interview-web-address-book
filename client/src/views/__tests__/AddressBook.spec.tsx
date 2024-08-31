import '@testing-library/jest-dom';
import { render, screen, waitFor, act, fireEvent } from '@testing-library/react';
import AddressBook from '../AddressBook';
import { ContactsService } from '../../services/ContactsService';

jest.mock('../../services/ContactsService');

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
            people: [{ name: 'John Doe' }, { name: 'Jane Smith' }],
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
            people: [{ name: 'B' }, { name: 'A' }],
        });

        await act(async () => {
            render(<AddressBook />);
        });

        let items = screen.getAllByRole('listitem');
        expect(items[0]).toHaveTextContent('A');
        expect(items[1]).toHaveTextContent('B');

        fireEvent.click(screen.getByRole('button', { name: /sort/i }));

        items = await screen.findAllByRole('listitem');

        expect(items[0]).toHaveTextContent('B');
        expect(items[1]).toHaveTextContent('A');
    });

    it('clicking on a contact updates selected contact', async () => {
        (ContactsService.getContacts as jest.Mock).mockResolvedValue({
            people: [{ name: 'John Doe' }, { name: 'Jane Smith' }],
        });

        await act(async () => {
            render(<AddressBook />);
        });

        fireEvent.click(screen.getByText('John Doe'));
        expect(screen.queryAllByText('John Doe').length).toBeGreaterThan(1);
    });
});