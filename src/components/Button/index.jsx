import P from 'prop-types';
import './styles.css';

export const Button = ({ text, onClick, disabled = false }) => {
  return (
    <button disabled={disabled} onClick={onClick} className="button" name={text}>
      {text}
    </button>
  );
};

Button.defaultProps = {
  disabled: false,
};

Button.propTypes = {
  text: P.string.isRequired,
  onClick: P.func.isRequired,
  disabled: P.bool,
};
