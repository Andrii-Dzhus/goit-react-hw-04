import css from "./SearchBar.module.css";
import { Field, Form, Formik } from "formik";
import { toast } from "react-hot-toast";

export default function SearchBar({ onSearch }) {
  return (
    <header className={css.header}>
      <Formik
        initialValues={{ topic: "" }}
        onSubmit={(values, actions) => {
          if (values.topic.trim() === "") {
            toast.error("Please enter a search term!", {
              style: {
                borderRadius: "10px",
                background: "#333",
                color: "#fff",
              },
            });
            return;
          }
          onSearch(values.topic);
          actions.resetForm();
        }}
      >
        <Form className={css.form}>
          <Field
            name="topic"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            className={css.input}
          />
          <button type="submit" className={css.button}>
            Search
          </button>
        </Form>
      </Formik>
    </header>
  );
}
