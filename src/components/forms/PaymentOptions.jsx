const METHODS = [
  { value: 'Kapıda Nakit', label: 'Kapıda Nakit' },
  { value: 'Kapıda Kart', label: 'Kapıda Kart' },
  { value: 'Online', label: 'Online Ödeme' },
];

const PaymentOptions = ({ value, onChange }) => (
  <div className="payment-options">
    {METHODS.map((method) => (
      <label key={method.value} className="payment-options__item">
        <input
          type="radio"
          name="payment"
          checked={value === method.value}
          onChange={() => onChange(method.value)}
        />
        <span>{method.label}</span>
      </label>
    ))}
  </div>
);

export default PaymentOptions;
