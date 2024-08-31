import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Profile from '../Profile';
import { Contact } from 'types/ContactTypes';

describe('Profile Component', () => {
    const mockContact: Contact = {
        "id": 1,
        "name": "Adam Wright",
        "profile_photo_url": "https://example.com/photos/adam_wright.jpg",
        "phoneNumber": "123-456-7890",
        "department": "Engineering",
        "email": "adam.wright@example.com",
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

    it('renders the name, department and email properly', () => {
        render(<Profile info={mockContact} />);

        expect(screen.getByText('Adam Wright')).toBeInTheDocument();
        expect(screen.getByText('Engineering')).toBeInTheDocument();
        expect(screen.getByText('adam.wright@example.com')).toBeInTheDocument();
    });

    it('renders correctly even if department, email or phone number is missing', () => {
        const contactInfo: Contact = {
            ...mockContact,
            department: undefined,
            email: undefined,
            phoneNumber: undefined
        }
        render(<Profile info={contactInfo} />);

        expect(screen.getByText('Adam Wright')).toBeInTheDocument();
        expect(screen.queryByText('Engineering')).not.toBeInTheDocument();
        expect(screen.queryByText('adam.wright@example.com')).not.toBeInTheDocument();
        expect(screen.queryByText('123-456-7890')).not.toBeInTheDocument();
    });
});