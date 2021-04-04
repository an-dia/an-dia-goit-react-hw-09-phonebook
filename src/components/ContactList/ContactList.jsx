import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { contactsOperations, contactsSelectors } from '../../redux/contacts';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import s from './ContactList.module.css';
import fadeStyles from '../../transitionsStyles/fade.module.css';
import ContactItem from '../ContactItem';

export default function ContactList() {
  const dispatch = useDispatch();
  const contacts = useSelector(contactsSelectors.getVisibleContacts);

  const onDeleteContact = useCallback(
    id => {
      dispatch(contactsOperations.deleteContact(id));
    },
    [dispatch],
  );

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
}

ContactList.propTypes = {
  onDeleteContact: PropTypes.func,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
  ),
};
