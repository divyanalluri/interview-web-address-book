import React from 'react';
import { Contact } from 'types/ContactTypes';
import Profile from './Profile';
import { EDUCATION, WORK_EXPERIENCE } from '../constants/Contact';
import CareerDetails from './CareerDetails';

const ContactView: React.FC<{
    selectedContact: Contact,
    onClickBackButton: () => void,
    onDeleteContact: (id: number) => void
}> = ({ selectedContact, onClickBackButton, onDeleteContact }) => {
    const { education, workExperience } = selectedContact;

    return <div className="app-person-profile-container">
        <button
            id="back-button"
            className="position-absolute d-block d-md-none btn btn-primary"
            aria-label="Back Button"
            onClick={onClickBackButton}
        >
            <i className="bi bi-arrow-left"></i>
        </button>
        <div className="app-person-profile">
            <Profile info={selectedContact} />
            <CareerDetails details={education} about={EDUCATION} />
            <CareerDetails details={workExperience} about={WORK_EXPERIENCE} />
        </div>
        <button type="button" className="btn btn-danger" onClick={() => onDeleteContact(selectedContact.id)}>
            Delete Contact
        </button>
    </div>
}

export default ContactView;