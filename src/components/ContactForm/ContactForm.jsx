import css from "./ContactForm.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { nanoid } from "nanoid";
import { useId } from "react";
import * as Yup from "yup";

const ContactsSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  number: Yup.string()
    .min(9, "Введіть номер у форматі 111-11-11")
    .max(9, "Введіть номер у форматі 111-11-11")
    .matches(/^\d{3}-\d{2}-\d{2}$/, "Введіть номер у форматі 111-11-11")
    .required("Required"),
});

export default function ContactForm({ onAdd }) {
  const newContactId = nanoid();
  const nameId = useId();
  const numberId = useId();
  const handleSubmit = (values, actions) => {
    values.id = newContactId;
    onAdd(values);
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{ name: "", number: "" }}
      onSubmit={handleSubmit}
      validationSchema={ContactsSchema}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor={nameId} className={css.label}>
            Name:
          </label>
          <Field type="text" name="name" className={css.input} id={nameId} />
          <ErrorMessage name="name" component="div" className={css.error} />
        </div>
        <div className={css.formGroup}>
          <label htmlFor={numberId} className={css.label}>
            Phone:
          </label>
          <Field type="tel" name="number" className={css.input} id={numberId} />
          <ErrorMessage name="number" component="div" className={css.error} />
        </div>
        <button type="submit" className={css.button}>
          Submit
        </button>
      </Form>
    </Formik>
  );
}
