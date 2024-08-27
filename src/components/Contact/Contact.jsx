import css from "./Contact.module.css";
import { IoPerson, IoCall } from "react-icons/io5";

export default function Contact({ id, name, number, onDelete }) {
  return (
    <div className={css.contact}>
      <div className={css.contactInfo}>
        <div className={css.div}>
          <IoPerson />
          <p>{name}</p>
        </div>
        <div className={css.div}>
          <IoCall />
          <p>{number}</p>
        </div>
      </div>
      <button className={css.deleteButton} onClick={() => onDelete(id)}>
        Delete
      </button>
    </div>
  );
}
