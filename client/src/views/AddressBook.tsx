import React, { useEffect, useMemo, useState } from 'react';
import ContactsList from "../components/ContactsList";
import ContactView from "../components/ContactView";
import { Contact } from 'types/ContactTypes';
import { ContactsService } from '../services/ContactsService';

const AddressBook: React.FC = () => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [selectedContact, setSelectedContact] = useState<Contact>();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await ContactsService.getContacts();
                const sortedContacts = data.people?.sort((a, b) => a.name.localeCompare(b.name));
                setContacts(sortedContacts);
                setSelectedContact(sortedContacts[0]);
            } catch (error) {
                setError(error instanceof Error ? error.message : "Unknown Error");
            }
        }
        loadData();
    }, []);

    const groupedContacts = useMemo(() => {
        if (contacts.length > 0) {
            return contacts
                .reduce((acc: { [key: string]: Contact[] }, person) => {
                    const letter = person.name[0];
                    if (!acc[letter]) acc[letter] = [];
                    acc[letter].push(person);
                    return acc;
                }, {});
        }
    }, [contacts])

    const onClickContact = (contact: Contact) => {
        setSelectedContact(contact)
    }

    if (error) {
        return <p>Error: {error}</p>;
    }
    return <div className='container'>
        {contacts.length > 0 ? <div className='row'>
            <div className='col-sm-4 col-xl-2'>
                <ContactsList contacts={groupedContacts as { [key: string]: Contact[] }} onClickContact={onClickContact} />
            </div>
            <div className='col-sm-8 col-xl-10'>
                {selectedContact && <ContactView selectedContact={selectedContact} />}
            </div>
        </div> : <div> No contacts to display</div>}
    </div>;
}

export default AddressBook;