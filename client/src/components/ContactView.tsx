import React from 'react';
import { Contact } from 'types/ContactTypes';
import Profile from './Profile';
import CareerDetails from './CareerDetails';

const ContactView: React.FC<{
    contact: Contact
}> = ({ contact }) => {
    const { education, workExperience } = contact
    return <div className="app-person-profile-container">
        <div className="app-person-profile docs-highlight docs-blue" data-intro="Person Profile" data-position="bottom">
            <Profile info={contact} />
            <CareerDetails details={education} about="education" />
            <CareerDetails details={workExperience} about="work-experience" />
        </div>
    </div>
}

export default ContactView;