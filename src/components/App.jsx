import { nanoid } from 'nanoid';
import React from 'react';
import { ContactList } from './ContactsList/ContactList';
import { styled } from 'styled-components';
import { ContactForm } from './ContactsForm/ContactForm';
import { Filter } from './Filter/Filter';
import { Title, Wrapper } from './App.styled';

export class App extends React.Component {
  state = {
    contacts: [
      { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
      { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
      { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
      { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  //Додаємо контакт
  addNewContact = newContact => {
    const { contacts } = this.state;
    const checkContact = contacts.find(
      contact => contact.name === newContact.name
    );
    checkContact
      ? alert(`${newContact.name} is already in contact`)
      : this.setState(prev => ({
          contacts: [...prev.contacts, newContact],
        }));

    // if (contacts.find(contact => contact.name === newContact.name)) {
    //   alert(`${newContact.name} is already in contact`);
    //   return;
    // }
    // this.setState(prev => ({
    //   contacts: [...prev.contacts, newContact],
    // }));
  };
  //вводимо в інтуп фільтра
  hendleFilterInput = value => {
    this.setState({ filter: value });
  };
  //фільтруємо
  getFilteredContact = () => {
    const { contacts, filter } = this.state;
    if (!filter) {
      return contacts;
    }
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };
  //видаляємо
  hendleDeleteContact = id => {
    this.setState(prev => ({
      contacts: prev.contacts.filter(contact => contact.id !== id),
    }));
    console.log('Delete me');
  };
  render() {
    const { filter } = this.state;
    const filteredContact = this.getFilteredContact(filter);
    return (
      <Wrapper>
        <Title>Phonebook</Title>
        <ContactForm newContact={this.addNewContact} />
        <h2>Contacts</h2>
        <Filter filter={filter} onFilterInput={this.hendleFilterInput} />
        <ContactList
          contacts={filteredContact}
          onDelete={this.hendleDeleteContact}
        />
      </Wrapper>
    );
  }
}
