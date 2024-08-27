import { useState, useEffect } from "react";
import contactDate from "../../contact.json";
import ContactList from "../ContactList/ContactList";
import SearchBox from "../SearchBox/SearchBox";
import ContactForm from "../ContactForm/ContactForm";

export default function App() {
  const [contacts, setContacts] = useState(() => {
    const saveContacts = window.localStorage.getItem("contacts");
    return saveContacts !== null ? JSON.parse(saveContacts) : contactDate;
  });

  useEffect(() => {
    window.localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const [filter, setFilter] = useState("");

  const addContacts = newContacts => {
    setContacts(prevContacts => {
      return [...prevContacts, newContacts];
    });
  };

  const deleteContacts = contactId => {
    setContacts(prevContacts => {
      return prevContacts.filter(contact => contact.id !== contactId);
    });
  };

  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );
  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onAdd={addContacts} />
      <SearchBox value={filter} onFilter={setFilter} />
      <ContactList contacts={visibleContacts} onDelete={deleteContacts} />
    </div>
  );
}
