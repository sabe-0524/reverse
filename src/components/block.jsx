import './block.css';

export default function Block({ value, handleValue }) {
    let color;
    if (value === true) {
        color = 'O';
    } else if (value === false) {
        color = 'X';
    } else {
        color = '.';
    }

  return (
    <button className="block" onClick={handleValue}>{color}</button>
  );
}