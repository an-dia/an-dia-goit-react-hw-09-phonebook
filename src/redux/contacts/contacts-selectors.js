import { createSelector } from '@reduxjs/toolkit';

const getLoading = state => state.contacts.loading;
const getContacts = state => state.contacts.items; //getAllContacts
const getError = state => state.contacts.error;

const getFilter = state => state.contacts.filter;

// const getVisibleContacts = state => {
//   const contacts = getContacts(state);
//   console.log('contacts', contacts);
//   const filter = getFilter(state);
//   console.log('filter', filter);
//   const normalizedFilter = filter.toLowerCase();

//   return contacts.filter(({ name }) =>
//     name.toLowerCase().includes(normalizedFilter));
// };

//Мемоизированный селектор
const getVisibleContacts = createSelector(
  [getContacts, getFilter],
  (contacts, filter) => {
    const normalizedFilter = filter.toLowerCase();
    let list = contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter),
    );
    // if (!list.length) list = contacts;
    return list;
  },
);

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  getLoading,
  getContacts,
  getError,
  getFilter,
  getVisibleContacts,
};
