import categories from '../../data/categories.json';

const CategoryFilter = ({ selected, onSelect }) => (
  <div className="category-filter">
    {categories.map((category) => (
      <button
        key={category.id}
        type="button"
        className={selected === category.id ? 'is-active' : ''}
        onClick={() => onSelect(category.id)}
      >
        <span className="category-filter__icon" aria-hidden="true">
          {category.icon}
        </span>
        <span>
          <strong>{category.name}</strong>
          <small>{category.description}</small>
        </span>
      </button>
    ))}
  </div>
);

export default CategoryFilter;
