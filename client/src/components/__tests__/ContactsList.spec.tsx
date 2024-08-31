import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import ContactsList from '../ContactsList';
import { Contact } from 'types/ContactTypes';

describe('ContactsList Component', () => {
    const contacts: { [key: string]: Contact[] } = {
        A: [
            {
                "id": 23,
                "name": "Amelia Clark",
                "education": [
                    {
                        "id": 1,
                        "institution": "University of Toronto",
                        "startYear": 2004,
                        "endYear": 2008,
                        "degree": "Bachelor's, Computer Science"
                    }
                ]
            }
        ]
    }
    const mockFn = jest.fn();

    beforeEach(() => mockFn.mockClear());

    it('renders contact names and the letter headers', () => {
        render(<ContactsList contacts={contacts} onClickContact={mockFn} />);

        expect(screen.getByText('A')).toBeInTheDocument();
        expect(screen.getByText('Amelia Clark')).toBeInTheDocument();
    });

    it('calls onclick when contact is clicked', () => {
        render(<ContactsList contacts={contacts} onClickContact={mockFn} />);

        const instance = screen.getByText('Amelia Clark');
        fireEvent.click(instance);
        expect(mockFn).toHaveBeenCalledTimes(1);
    });

});