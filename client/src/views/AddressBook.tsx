import React, { useEffect, useMemo, useState } from 'react';
import ContactsList from "../components/ContactsList";
import ContactView from "../components/ContactView";
import { Contact } from 'types/ContactTypes';
import { ContactsService } from '../services/ContactsService';

const AddressBook: React.FC = () => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [searchValue, setSearchValue] = useState<string>("");
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [selectedContact, setSelectedContact] = useState<Contact>();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await ContactsService.getContacts();
                const sortedContacts = data.people?.sort((a, b) => a.name.localeCompare(b.name));
                setContacts(sortedContacts);
                if (sortedContacts.length > 0) setSelectedContact(sortedContacts[0]);
            } catch (error) {
                setError(error instanceof Error ? error.message : "Unknown Error");
            }
        }
        loadData();
    }, []);

    const filteredSortedContacts = useMemo(() => {
        if (!searchValue && sortOrder == 'asc') return contacts;

        const filteredValues = contacts.filter(person => person.name.toLowerCase().includes(searchValue.toLowerCase()));
        return filteredValues.sort((a, b): number => {
            return sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
        });
    }, [contacts, searchValue, sortOrder])

    const groupedContacts = useMemo(() => {
        if (contacts.length > 0) {
            return filteredSortedContacts?.reduce((acc: { [key: string]: Contact[] }, person) => {
                const letter = person.name[0];
                if (!acc[letter]) acc[letter] = [];
                acc[letter].push(person);
                return acc;
            }, {});
        }
    }, [contacts, filteredSortedContacts])

    const onToggleSort = () => {
        setSortOrder(prevOrder => prevOrder === 'asc' ? 'desc' : 'asc');
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value)
    }

    const onClickContact = (contact: Contact) => {
        setSelectedContact(contact)
    }

    if (error) {
        throw new Error(`Error: ${error}`);
    }

    return <div className='container'>
        {contacts.length > 0 ? <div className='row'>
            <div className='contacts-list'>
                <div>
                    <input type="search" className='form-control' aria-label="Search for contacts" placeholder='Search for contacts...' value={searchValue} onChange={onInputChange} />
                    <button
                        className="sort-button text-nowrap"
                        aria-label="Toggle sort order"
                        onClick={onToggleSort}
                    >
                        {sortOrder === 'asc' ? '↓' : '↑'}
                    </button>
                </div>
                <ContactsList contacts={groupedContacts as { [key: string]: Contact[] }} onClickContact={onClickContact} />
            </div>
            <div className='col-sm-8 col-xl-10'>
                {selectedContact && <ContactView selectedContact={selectedContact} />}
            </div>
        </div> : <div> No contacts to display</div>}
    </div>;
}

export default AddressBook;