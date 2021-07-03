import "./styles.css";

export const TextInput = ({ searchValue, handleChange }) => (
  <input
    className="text-input"
    type="search"
    value={searchValue}
    onChange={handleChange}
  />
);