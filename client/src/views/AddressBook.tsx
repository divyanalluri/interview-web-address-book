import React, { useEffect, useMemo, useState } from 'react';
import ContactsList from "../components/ContactsList";
import ContactView from "../components/ContactView";
import { Contact } from 'types/ContactTypes';
import { ContactsService } from '../services/ContactsService';
import { SORT_ORDER, SortOrderType } from '../constants/Contact';
import { isMobile } from '../utils/ScreenUtils';

const AddressBook: React.FC = () => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [searchValue, setSearchValue] = useState<string>("");
    const [sortOrder, setSortOrder] = useState<SortOrderType>(SORT_ORDER.ASC);
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await ContactsService.getContacts();
                const sortedContacts = data.people?.sort((a, b) => a.name.localeCompare(b.name));
                if (sortedContacts) {
                    setContacts(sortedContacts);
                }
            } catch (error) {
                setError(error instanceof Error ? error.message : "Unknown Error");
            }
        }
        loadData();
    }, []);

    const onDeleteContact = async (id: number) => {
        try {
            await ContactsService.deleteContact(id);

            setContacts(prevContacts => {
                const updatedContacts = prevContacts.filter(contact => contact.id !== id);
                setSelectedContact(null);
                return updatedContacts;
            });
        } catch (error) {
            setError(error instanceof Error ? error.message : "Unknown Error");
        }
    };

    const filteredSortedContacts = useMemo(() => {
        if (!searchValue.trim() && sortOrder === SORT_ORDER.ASC) return contacts;

        const filteredValues = contacts.filter(person => person.name.toLowerCase().includes(searchValue.toLowerCase().trim()));
        return filteredValues.sort((a, b): number => {
            return sortOrder === SORT_ORDER.ASC ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
        });
    }, [contacts, searchValue, sortOrder])

    const groupedContacts = useMemo(() => {
        if (filteredSortedContacts.length > 0) {
            return filteredSortedContacts.reduce((acc: { [key: string]: Contact[] }, person) => {
                const letter = person.name[0].toUpperCase();
                if (!acc[letter]) acc[letter] = [];
                acc[letter].push(person);
                return acc;
            }, {});
        }
    }, [filteredSortedContacts])

    const onToggleSort = () => {
        setSortOrder(prevOrder => prevOrder === SORT_ORDER.ASC ? SORT_ORDER.DESC : SORT_ORDER.ASC);
    };

    const onClickContact = (contact: Contact) => {
        setSelectedContact(contact);
        const contactDetailsElement = document.getElementById('contact-details');
        contactDetailsElement?.focus();
    }

    if (error) {
        throw new Error(`Error: ${error}`);
    }

    return <div className='container'>
        <div className='row'>
            <div className={`${selectedContact && isMobile() ? 'd-none' : ''} col-md-5 col-xl-3`} id="contact-list-navigation">
                <div className='d-flex align-items-center position-fixed'>
                    <input
                        type="search"
                        className='form-control'
                        aria-label="Search for contacts"
                        placeholder='Search for contacts...'
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <button
                        className="btn btn-primary"
                        aria-label="Toggle sort order"
                        onClick={onToggleSort}
                    >
                        <i className={`bi bi-sort-alpha-${sortOrder === SORT_ORDER.ASC ? 'down' : 'down-alt'} fs-4`}></i>
                    </button>
                </div>
                {groupedContacts && Object.keys(groupedContacts)?.length > 0 ?
                    <ContactsList contacts={groupedContacts as { [key: string]: Contact[] }} onClickContact={onClickContact} />
                    : <div className='no-contacts-text'> No contacts to display</div>}
            </div>
            <div
                tabIndex={-1}
                className={`${!selectedContact ? 'd-none' : ''} d-md-block col-sm-7 col-xl-9`}
                id="contact-details"
            >
                {selectedContact ?
                    <ContactView
                        selectedContact={selectedContact}
                        onClickBackButton={() => setSelectedContact(null)}
                        onDeleteContact={onDeleteContact}
                    />
                    : <div className='d-flex align-items-center justify-content-center no-contact-view'>Please select contact to view the details !</div>}
            </div>
        </div>
    </div>;
}

export default AddressBook;