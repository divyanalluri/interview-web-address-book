import React from 'react';
import { Contact } from 'types/ContactTypes';

const ContactsList: React.FC<{
    contacts: { [key: string]: Contact[] };
    onClickContact: (contact: Contact) => void
}> = ({ contacts, onClickContact }) => {

    return <div className='app-directory-container'>
        {Object.keys(contacts).map((letter) => (
            <React.Fragment key={letter}>
                <h2 className="app-directory-separator">{letter}</h2>
                <ul className="contacts-list">
                    {contacts[letter].map((person) => (
                        <li
                            className="app-directory-item"
                            key={person.id}
                            tabIndex={0}
                            onClick={() => onClickContact(person)}
                        >
                            {person.name}
                        </li>
                    ))}
                </ul>
            </React.Fragment>
        ))}
    </div>;
}

export default ContactsList;