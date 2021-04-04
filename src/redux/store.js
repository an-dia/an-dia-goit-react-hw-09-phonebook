import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
// import logger from 'redux-logger';
import storage from 'redux-persist/lib/storage';
import { contactsReducer } from './contacts';
import { authReducer } from './auth';

const myMiddleware = store => next => action => {
  // console.log('My middleware', action);

  //передаёт управление экшенам дальше по цепочке
  next(action);
};

// console.log(getDefaultMiddleware());
const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
  myMiddleware,
  // logger,
];

const authPersistConfig = {
  key: 'authToken',
  storage,
  whitelist: ['token'],
  // blacklist: ['user', 'error'],
};

//development or production
// console.log(process.env.NODE_ENV);
const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    contacts: contactsReducer,
  },
  middleware,
  // devTools: process.env.NODE_ENV === 'development',
});

const persistor = persistStore(store);

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default { store, persistor };
