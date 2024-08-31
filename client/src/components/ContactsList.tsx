import React from 'react';
import { Contact } from 'types/ContactTypes';

const ContactsList: React.FC<{
    contacts: { [key: string]: Contact[] };
    onClickContact: (contact: Contact) => void
}> = ({ contacts, onClickContact }) => {

    return <div className='app-directory-container'>
        {Object.keys(contacts).map((letter) => (
            <React.Fragment key={letter}>
                <div className="app-directory-separator">{letter}</div>
                {contacts[letter].map((person) => (
                    <div
                        className="app-directory-item"
                        key={person.id}
                        onClick={() => onClickContact(person)}
                    >
                        {person.name}
                    </div>
                ))}
            </React.Fragment>
        ))}
    </div>;
}

export default ContactsList;