import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authSelectors, authActions } from '../../redux/auth';
import { contactsSelectors } from '../../redux/contacts';
import { CSSTransition } from 'react-transition-group';
import * as contactsAction from '../../redux/contacts';
import alertStyle from '../../transitionsStyles/fadeAlertStyle.module.css';
import PropTypes from 'prop-types';
import s from './Alert.module.css';

class Alert extends Component {
  static propTypes = {
    message: PropTypes.string,
    errorPb: PropTypes.object,
    errorAuth: PropTypes.string,
    clearErrorPb: PropTypes.func,
    clearErrorPAuth: PropTypes.func,
  };

  componentDidUpdate() {
    if (this.props.errorContacts) {
      setTimeout(() => {
        this.props.clearErrorContacts();
      }, 3000);
      return;
    }
    if (this.props.errorAuth) {
      setTimeout(() => {
        this.props.clearErrorAuth();
      }, 3000);
      return;
    }
  }

  render() {
    return (
      <CSSTransition
        in={this.props.message}
        classNames={alertStyle}
        timeout={250}
        unmountOnExit
      >
        <div className={s.Container}>
          <p className={s.Text}>{this.props.message}</p>
        </div>
      </CSSTransition>
    );
  }
}

const mapStateToProps = state => ({
  errorContacts: contactsSelectors.getError(state),
  errorAuth: authSelectors.getError(state),
});

const mapDispatchToProps = dispatch => ({
  clearErrorContacts: () => dispatch(contactsAction.clearError()),
  clearErrorAuth: () => dispatch(authActions.clearError()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Alert);

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
