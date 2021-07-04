import './styles.css';

export const Button = ({text, onClick, disabled}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="button"
      name={text}
    >
      {text}
    </button>
  )
}