import css from "./SearchBox.module.css";

export default function SearchBox({ value, onFilter }) {
  return (
    <div className={css.con}>
      <p>Find contact by name</p>
      <input
        type="text"
        value={value}
        onChange={evt => onFilter(evt.target.value)}
      />
    </div>
  );
}
