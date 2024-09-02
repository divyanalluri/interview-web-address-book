import { render, screen, fireEvent } from '@testing-library/react';
import ContactView from '../ContactView';
import { Contact } from 'types/ContactTypes';

describe('ContactView component', () => {
    const mockOnClickBackButton = jest.fn();
    const mockOnDeleteContact = jest.fn();

    const selectedContact: Contact = {
        "id": 1,
        "name": "Adam Wright",
        "phoneNumber": "123-456-7890",
        "department": "Engineering",
        "email": "adam.wright@example.com",
    }

    it('should call onDeleteContact when the Delete button is clicked', () => {
        const { getByText } = render(
            <ContactView
                selectedContact={selectedContact}
                onClickBackButton={mockOnClickBackButton}
                onDeleteContact={mockOnDeleteContact}
            />
        );

        fireEvent.click(getByText('Delete Contact'));

        expect(mockOnDeleteContact).toHaveBeenCalledWith(selectedContact.id);
        expect(mockOnDeleteContact).toHaveBeenCalledTimes(1);
    });

    it('should call onClickBackButton when the back button is clicked', () => {
        render(
            <ContactView
                selectedContact={selectedContact}
                onClickBackButton={mockOnClickBackButton}
                onDeleteContact={mockOnDeleteContact}
            />
        );

        fireEvent.click(screen.getAllByLabelText(/Back Button/i)[0]);

        expect(mockOnClickBackButton).toHaveBeenCalledTimes(1);
    });
});
