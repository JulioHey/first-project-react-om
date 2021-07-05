import P from 'prop-types';

import './styles.css';

export const TextInput = ({ searchValue, handleChange }) => (
  <input
    className="text-input"
    type="search"
    value={searchValue}
    onChange={handleChange}
    placeholder="Type your search"
  />
);

TextInput.propTypes = {
  searchValue: P.string,
  handleChange: P.func.isRequired,
};
