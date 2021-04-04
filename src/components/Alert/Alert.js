import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authSelectors, authActions } from '../../redux/auth';
import { contactsSelectors } from '../../redux/contacts';
import { CSSTransition } from 'react-transition-group';
import * as contactsAction from '../../redux/contacts';
import alertStyle from '../../transitionsStyles/fadeAlertStyle.module.css';
import PropTypes from 'prop-types';
import s from './Alert.module.css';

export default function Alert({ message }) {
  const errorContacts = useSelector(contactsSelectors.getError);
  const errorAuth = useSelector(authSelectors.getError);

  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(contactsAction.clearError());
    }, 3000);
    return;
  }, [errorContacts, dispatch]);

  useEffect(() => {
    setTimeout(() => {
      dispatch(authActions.clearError());
    }, 3000);
    return;
  }, [errorAuth, dispatch]);

  return (
    <CSSTransition
      in={Boolean(message)}
      classNames={alertStyle}
      timeout={250}
      unmountOnExit
    >
      <div className={s.Container}>
        <p className={s.Text}>{message}</p>
      </div>
    </CSSTransition>
  );
}

Alert.propTypes = {
  message: PropTypes.string,
  errorContacts: PropTypes.object,
  errorAuth: PropTypes.string,
  clearErrorContacts: PropTypes.func,
  clearErrorPAuth: PropTypes.func,
};

// const Alert = ({ text }) => {
//   return (
//     <div className={s.Container}>
//       <p className={s.Text}>{text}</p>
//     </div>
//   );
// };

// Alert.propTypes = {
//   text: PropTypes.string.isRequired,
// };

// export default Alert;
