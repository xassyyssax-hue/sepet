import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import products from '../data/products.json';
import CategoryFilter from '../components/products/CategoryFilter.jsx';
import SearchBar from '../components/ui/SearchBar.jsx';
import ProductList from '../components/products/ProductList.jsx';

const sortProducts = (items, sortBy) => {
  switch (sortBy) {
    case 'price-asc':
      return [...items].sort((a, b) => a.price - b.price);
    case 'price-desc':
      return [...items].sort((a, b) => b.price - a.price);
    case 'newest':
      return [...items].sort((a, b) => Number(b.isNew) - Number(a.isNew));
    default:
      return [...items].sort((a, b) => Number(b.isPopular) - Number(a.isPopular));
  }
};

const MenuPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [sortBy, setSortBy] = useState('popular');

  useEffect(() => {
    const params = {};
    if (search) params.search = search;
    if (category) params.category = category;
    setSearchParams(params, { replace: true });
  }, [search, category, setSearchParams]);

  const filtered = useMemo(() => {
    let items = products;
    if (category) {
      items = items.filter((product) => product.category === category);
    }
    if (search) {
      const term = search.toLowerCase();
      items = items.filter(
        (product) =>
          product.name.toLowerCase().includes(term) || product.description.toLowerCase().includes(term),
      );
    }
    return sortProducts(items, sortBy);
  }, [search, category, sortBy]);

  return (
    <div className="page menu-page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Menü</p>
          <h1>Lezzet kategorilerini keşfet</h1>
        </div>
        <div className="menu-controls">
          <SearchBar value={search} onChange={setSearch} />
          <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
            <option value="popular">Popüler</option>
            <option value="price-asc">Fiyat Artan</option>
            <option value="price-desc">Fiyat Azalan</option>
            <option value="newest">Yeni Gelenler</option>
          </select>
        </div>
      </header>

      <div className="filter-toolbar">
        <button type="button" className={!category ? 'is-active' : ''} onClick={() => setCategory('')}>
          Tümü
        </button>
        <CategoryFilter selected={category} onSelect={(id) => setCategory((prev) => (prev === id ? '' : id))} />
      </div>

      <ProductList products={filtered} />
    </div>
  );
};

export default MenuPage;
