const SearchBar = ({ value, onChange, placeholder = 'Ürün ara...' }) => (
  <div className="search-bar">
    <span className="search-bar__icon" aria-hidden="true">
      🔍
    </span>
    <input
      className="search-bar__input"
      type="text"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
    />
  </div>
);

export default SearchBar;
