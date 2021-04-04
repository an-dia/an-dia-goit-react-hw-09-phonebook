import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import { useDispatch, useSelector } from 'react-redux';
import Container from '../components/Container';
import Alert from '../components/Alert';
import fadeStyles from '../transitionsStyles/fade.module.css';
import searchFadeStyles from '../transitionsStyles/searchFadeStyles.module.css';
import s from './ContactsView.module.css';
import Title from '../components/Title';
import ContactForm from '../components/ContactForm';
import Filter from '../components/Filter';
import ContactList from '../components/ContactList';
import LoaderSpinner from '../components/Loader';
import {
  contactsOperations,
  contactsSelectors,
  changeFilter,
} from '../redux/contacts';

export default function ContactsView() {
  const dispatch = useDispatch();

  const contacts = useSelector(contactsSelectors.getContacts);
  const isLoadingContacts = useSelector(contactsSelectors.getLoading);
  const error = useSelector(contactsSelectors.getError);
  const visibleContacts = useSelector(contactsSelectors.getContacts);

  useEffect(() => {
    dispatch(contactsOperations.fetchContacts());
  }, [dispatch]);

  const clearFilter = () => dispatch(changeFilter(''));

  return (
    <Container>
      <div className={s.wrapper}>
        {error ? <Alert /> : null}
        <Title title="Phonebook" level={1} />
        <ContactForm />
        <Title title="Contacts" level={2} />
        <CSSTransition
          in={contacts.length > 1}
          classNames={searchFadeStyles}
          timeout={250}
          unmountOnExit
          onExit={() => clearFilter()}
        >
          <Filter />
        </CSSTransition>
        {isLoadingContacts && <LoaderSpinner />}
        <CSSTransition
          in={visibleContacts.length !== 0 || contacts.length > 1}
          classNames={fadeStyles}
          timeout={250}
          unmountOnExit
        >
          <ContactList />
        </CSSTransition>
      </div>
    </Container>
  );
}

ContactsView.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string,
      number: PropTypes.string,
    }),
  ),
  visibleContacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string,
      number: PropTypes.string,
    }),
  ),
  fetchContacts: PropTypes.func,
  clearFilter: PropTypes.func,
  isLoadingContacts: PropTypes.bool,
  error: PropTypes.string,
};
