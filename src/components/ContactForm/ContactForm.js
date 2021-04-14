import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import contactsOperations from '../../redux/contacts/contacts-operations';
import s from './ContactForm.module.css';
import shortid from 'shortid';
import Alert from '../Alert';
import contactsSelectors from '../../redux/contacts/contacts-selectors';
// import TextField from '@material-ui/core/TextField';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const contacts = useSelector(contactsSelectors.getContacts);

  const inputNameId = shortid.generate();
  const inputNumberId = shortid.generate();

  const showAlert = useCallback(text => {
    reset();
    setMessage(text);
    setTimeout(() => setMessage(null), 2000);
  }, []);

  const onSubmit = useCallback(
    (name, number) => dispatch(contactsOperations.addContact(name, number)),
    [dispatch],
  );

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();

      if (name === '') {
        showAlert('Please enter your contact name!');
        return;
      }

      if (number === '') {
        showAlert('Please enter the contact phone number!');
        return;
      }

      if (contacts.some(contact => contact.name === name)) {
        showAlert(`${name} is already in contacts`);
        return;
      }
      onSubmit(name, number);
      reset();
    },
    [showAlert, name, number, onSubmit, contacts],
  );

  const reset = () => {
    setName('');
    setNumber('');
  };

  const handlerChange = useCallback(e => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  }, []);

  return (
    <>
      <Alert message={message} />

      <form className={s.form} onSubmit={handleSubmit}>
        <label className={s.label} htmlFor={inputNameId}>
          <span>Name</span>
        </label>
        <input
          className={s.input}
          placeholder="Name"
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          required
          id={inputNameId}
          value={name}
          onChange={handlerChange}
        />
        {/* <TextField
          className={s.label}
          id={inputNameId}
          label="Name"
          type="text"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          required
          autoComplete="current-name"
          variant="outlined"
          value={name}
          name="name"
          onChange={handlerChange}
        /> */}
        <label className={s.label} htmlFor={inputNumberId}>
          <span>Number</span>
        </label>
        <input
          className={s.input}
          placeholder="Number"
          id={inputNumberId}
          type="tel"
          pattern="(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})"
          title="Номер телефона должен состоять из 11-12 цифр и может содержать цифры, пробелы, тире, пузатые скобки и может начинаться с +"
          required
          value={number}
          name="number"
          onChange={handlerChange}
        />
        {/* <TextField
          className={s.label}
          id={inputNumberId}
          label="Number"
          type="tel"
          pattern="(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})"
          title="Номер телефона должен состоять из 11-12 цифр и может содержать цифры, пробелы, тире, пузатые скобки и может начинаться с +"
          required
          autoComplete="current-number"
          variant="outlined"
          value={number}
          name="number"
          onChange={handlerChange}
        /> */}
        <Button variant="contained" color="primary" type="submit">
          Add contact
        </Button>
      </form>
    </>
  );
}
