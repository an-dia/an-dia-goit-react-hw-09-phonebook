import s from './ContactItem.module.css';
import Button from '@material-ui/core/Button';

const ContactItem = ({ name, number, onDeleteContact }) => {
  return (
    <>
      <li className={s.listItem}>
        <p className={s.text}>
          {name} : {number}
        </p>
        <Button variant="contained" color="secondary" onClick={onDeleteContact}>
          Delete
        </Button>
      </li>
    </>
  );
};

export default ContactItem;
