import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import s from './Filter.module.css';
// import shortid from 'shortid';
import { contactsSelectors, changeFilter } from '../../redux/contacts';
import TextField from '@material-ui/core/TextField';

export default function Filter() {
  const dispatch = useDispatch();
  const value = useSelector(contactsSelectors.getFilter);

  const onChange = useCallback(
    event => dispatch(changeFilter(event.target.value)),
    [dispatch],
  );

  return (
    <div className={s.filterWrapper}>
      <span className={s.text}>Find contacts by name</span>
      <TextField
        className={s.label}
        id="outlined-search"
        label="Search"
        type="search"
        // autoComplete="current-password"
        variant="outlined"
        value={value}
        name="value"
        onChange={onChange}
      />
    </div>
  );
}

Filter.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};
