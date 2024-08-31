import React from 'react';
import { Contact } from 'types/ContactTypes';
import Profile from './Profile';
import { EDUCATION, WORK_EXPERIENCE } from '../constants/Contact';
import CareerDetails from './CareerDetails';

const ContactView: React.FC<{
    selectedContact: Contact
}> = ({ selectedContact }) => {
    const { education, workExperience } = selectedContact
    return <div className="app-person-profile-container">
        <div className="app-person-profile docs-highlight docs-blue" data-intro="Person Profile" data-position="bottom">
            <Profile info={selectedContact} />
            <CareerDetails details={education} about={EDUCATION} />
            <CareerDetails details={workExperience} about={WORK_EXPERIENCE} />
        </div>
    </div>
}

export default ContactView;