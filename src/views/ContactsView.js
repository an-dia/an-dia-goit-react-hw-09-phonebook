import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';
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

class ContactsView extends Component {
  static propTypes = {
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

  componentDidMount() {
    this.props.fetchContacts();
  }

  render() {
    return (
      <Container>
        <div className={s.wrapper}>
          {this.props.error ? (
            <Alert />
          ) : // <h1 style={{ color: 'red' }}>Error: {this.props.error}</h1>
          null}
          <Title title="Phonebook" level={1} />
          {/* <CSSTransition in={true} appear={true} timeout={500} classNames={appearFormStyles} unmountOnExit> */}
          <ContactForm />
          {/* </CSSTransition> */}
          <Title title="Contacts" level={2} />
          <CSSTransition
            in={this.props.contacts.length > 1}
            classNames={searchFadeStyles}
            timeout={250}
            unmountOnExit
            onExit={() => this.props.clearFilter()}
          >
            <Filter />
          </CSSTransition>
          {this.props.isLoadingContacts && <LoaderSpinner />}
          <CSSTransition
            in={
              this.props.visibleContacts.length !== 0 ||
              this.props.contacts.length > 1
            }
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
}

const mapStateToProps = state => ({
  // console.log(state)
  contacts: contactsSelectors.getContacts(state),
  filter: contactsSelectors.getFilter(state),
  isLoadingContacts: contactsSelectors.getLoading(state),
  error: contactsSelectors.getError(state),
  visibleContacts: contactsSelectors.getVisibleContacts(state),
});

const mapDispatchToProps = dispatch => ({
  fetchContacts: () => dispatch(contactsOperations.fetchContacts()),
  clearFilter: () => dispatch(changeFilter('')),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactsView);
