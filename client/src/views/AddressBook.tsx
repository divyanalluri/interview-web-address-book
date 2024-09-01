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
    const [selectedContact, setSelectedContact] = useState<Contact>();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await ContactsService.getContacts();
                const sortedContacts = data.people?.sort((a, b) => a.name.localeCompare(b.name));
                if (sortedContacts && sortedContacts.length > 0) {
                    setContacts(sortedContacts);
                    setSelectedContact(sortedContacts[0]);
                }
            } catch (error) {
                setError(error instanceof Error ? error.message : "Unknown Error");
            }
        }
        loadData();
    }, []);

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

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value)
    }

    const onClickContact = (contact: Contact) => {
        setSelectedContact(contact);
        const contactDetailsElement = document.getElementById('contact-details');
        contactDetailsElement?.focus();
        if (isMobile()) {
            const contactList = document.getElementById('contact-list-navigation');
            contactList?.classList.add('d-none');
            contactDetailsElement?.classList.remove('d-none');
        }
    }

    const onClickBackButton = () => {
        const contactList = document.getElementById('contact-list-navigation');
        const contactDetailsElement = document.getElementById('contact-details');
        contactList?.classList.remove('d-none');
        contactDetailsElement?.classList.add('d-none');
    }

    if (error) {
        throw new Error(`Error: ${error}`);
    }

    return <div className='container'>
        <div className='row'>
            <div className='col-md-5 col-xl-3' id="contact-list-navigation">
                <div className='d-flex align-items-center position-fixed'>
                    <input type="search" className='form-control' aria-label="Search for contacts" placeholder='Search for contacts...' value={searchValue} onChange={onInputChange} />
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
            <div tabIndex={-1} className='d-none d-md-block col-sm-7 col-xl-9' aria-live="polite" id="contact-details">
                {selectedContact && <ContactView selectedContact={selectedContact} onClickBackButton={onClickBackButton} />}
            </div>
        </div>
    </div>;
}

export default AddressBook;