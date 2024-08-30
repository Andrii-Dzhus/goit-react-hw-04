import css from "./ErrorMessage.module.css";

export default function ErrorMessage() {
  return (
    <div className={css.errorContainer}>
      <p className={css.errorMessage}>Something went wrong :(</p>
    </div>
  );
}
