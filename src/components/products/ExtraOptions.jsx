const ExtraOptions = ({ options, selected = [], onToggle }) => (
  <div className="extra-options">
    {options.map((option) => (
      <label key={option.name} className="extra-options__item">
        <input
          type="checkbox"
          checked={selected.includes(option.name)}
          onChange={() => onToggle(option.name)}
        />
        <span>
          {option.name}
          <small>+{option.price}₺</small>
        </span>
      </label>
    ))}
  </div>
);

export default ExtraOptions;
