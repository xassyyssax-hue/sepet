import { useState } from 'react';
import Button from '../ui/Button.jsx';

const CouponInput = ({ onApply, helperText }) => {
  const [code, setCode] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!code) return;
    onApply(code);
    setCode('');
  };

  return (
    <form className="coupon-input" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Kupon kodu"
        value={code}
        onChange={(event) => setCode(event.target.value.toUpperCase())}
      />
      <Button type="submit" variant="outline">
        Uygula
      </Button>
      {helperText && <small className="coupon-input__helper">{helperText}</small>}
    </form>
  );
};

export default CouponInput;
