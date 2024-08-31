import React, { useEffect, useState } from 'react';
import ContactsList from "../components/ContactsList";
import ContactView from "../components/ContactView";
import { Contact } from 'types/ContactTypes';
import { ContactsService } from '../services/ContactsService';

const AddressBook: React.FC = () => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [groupedContacts, setGroupedContacts] = useState<{ [key: string]: Contact[] }>({});
    const [activeContact, setActiveContact] = useState<Contact>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await ContactsService.getContacts();
                setContacts(data.people);
            } catch (error) {
                setError(error instanceof Error ? error.message : "Unknown Error");
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);

    useEffect(() => {
        if (contacts.length > 0) {
            const sortedContacts = contacts?.sort((a, b) => a.name.localeCompare(b.name));
            const groupedContacts = sortedContacts
                .reduce((acc: { [key: string]: Contact[] }, person) => {
                    const letter = person.name[0];
                    if (!acc[letter]) acc[letter] = [];
                    acc[letter].push(person);
                    return acc;
                }, {});
            setGroupedContacts(groupedContacts);
            setActiveContact(sortedContacts[0]);
        }
    }, [contacts])

    const onClickContact = (contact: Contact) => {
        setActiveContact(contact)
    }
    
    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }
    return <div className='container'>
        {contacts.length > 0 ? <div className='row'>
            <div className='col-sm-4 col-xl-2'>
                <ContactsList contacts={groupedContacts} onClickContact={onClickContact} />
            </div>
            <div className='col-sm-8 col-xl-10'>
                {activeContact && <ContactView contact={activeContact} />}
            </div>
        </div> : <div> No contacts to display</div>}
    </div>;
}

export default AddressBook;