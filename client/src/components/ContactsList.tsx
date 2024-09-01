import React from 'react';
import { Contact } from 'types/ContactTypes';

const ContactsList: React.FC<{
    contacts: { [key: string]: Contact[] };
    onClickContact: (contact: Contact) => void
}> = ({ contacts, onClickContact }) => {

    const handleKeyDown = (event: React.KeyboardEvent<HTMLLIElement>, person: Contact) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            onClickContact(person);
        }
    };

    return <div className='app-directory-container'>
        {Object.keys(contacts).map((letter) => (
            <React.Fragment key={letter}>
                <h2 className="app-directory-separator">{letter}</h2>
                <ul className="contacts-list">
                    {contacts[letter].map((person) => (
                        <li
                            className="app-directory-item"
                            key={person.id}
                            title={person.name}
                            tabIndex={0}
                            onClick={() => onClickContact(person)}
                            onKeyDown={(event) => handleKeyDown(event, person)}
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