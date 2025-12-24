import Button from './Button.jsx';

const QuantitySelector = ({ value, min = 1, onChange }) => {
  const handleDecrease = () => {
    if (value <= min) return;
    onChange(value - 1);
  };

  const handleIncrease = () => onChange(value + 1);

  return (
    <div className="quantity-selector">
      <Button type="button" variant="ghost" size="sm" aria-label="Azalt" onClick={handleDecrease}>
        -
      </Button>
      <span className="quantity-selector__value">{value}</span>
      <Button type="button" variant="ghost" size="sm" aria-label="Arttır" onClick={handleIncrease}>
        +
      </Button>
    </div>
  );
};

export default QuantitySelector;
