import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import s from './ContactList.module.css';
import fadeStyles from '../../transitionsStyles/fade.module.css';
import ContactItem from '../ContactItem';

const ContactList = ({ contacts, onDeleteContact }) => {
  return (
    <TransitionGroup component="ul" className={s.contactList}>
      {contacts.map(({ name, number, id }) => (
        <CSSTransition key={id} timeout={250} classNames={fadeStyles}>
          <ContactItem
            name={name}
            number={number}
            key={id}
            onDeleteContact={() => onDeleteContact(id)}
          />
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};

ContactList.propTypes = {
  onDeleteContact: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
  ),
};

export default ContactList;
