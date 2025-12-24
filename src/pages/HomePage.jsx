import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import products from '../data/products.json';
import categories from '../data/categories.json';
import SearchBar from '../components/ui/SearchBar.jsx';
import Button from '../components/ui/Button.jsx';
import ProductCard from '../components/products/ProductCard.jsx';

const HomePage = () => {
  const navigate = useNavigate();
  const [term, setTerm] = useState('');

  const featuredProducts = useMemo(() => products.filter((product) => product.isPopular).slice(0, 4), []);
  const dayDeal = useMemo(() => products.reduce((best, product) => (product.discount > (best?.discount || 0) ? product : best), products[0]), []);

  const handleSearch = () => {
    const query = term.trim();
    navigate(query ? `/menu?search=${encodeURIComponent(query)}` : '/menu');
  };

  return (
    <div className="page home-page">
      <section className="hero">
        <div>
          <p className="eyebrow">Rumeli mutfağının en sevilenleri</p>
          <h1>Favori restoranından <span>tek tıkla</span> sipariş ver.</h1>
          <p>
            Menümüzü keşfet, sepetini oluştur ve siparişini canlı olarak takip et. 20+ kategori, taze içerikler ve
            özel kampanyalar seni bekliyor.
          </p>
          <div className="hero__actions">
            <Button as={Link} to="/menu" size="lg">
              Menüye Göz At
            </Button>
            <div className="hero__search">
              <SearchBar value={term} onChange={setTerm} placeholder="Burger, pizza veya içecek ara..." />
              <Button type="button" variant="secondary" onClick={handleSearch}>
                Ara
              </Button>
            </div>
          </div>
        </div>
        <div className="hero__badge">
          <strong>%{dayDeal.discount || 20}</strong>
          <p>Günün kampanyası</p>
        </div>
      </section>

      <section className="home-section">
        <header>
          <h2>Kategorilere Hızlı Erişim</h2>
        </header>
        <div className="category-cards">
          {categories.map((category) => (
            <Link key={category.id} to={`/menu?category=${category.id}`} className="category-card">
              <span className="category-card__icon" aria-hidden="true">
                {category.icon}
              </span>
              <div>
                <strong>{category.name}</strong>
                <p>{category.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-section">
        <header>
          <h2>Günün Fırsatı</h2>
          <Button as={Link} to={`/urun/${dayDeal.id}`} variant="ghost">
            İncele
          </Button>
        </header>
        <div className="deal-card">
          <img src={dayDeal.image} alt={dayDeal.name} />
          <div>
            <h3>{dayDeal.name}</h3>
            <p>{dayDeal.description}</p>
            <p>
              Bugüne özel <strong>-%{dayDeal.discount || 15}</strong> indirimle hemen sepetine ekle.
            </p>
          </div>
        </div>
      </section>

      <section className="home-section">
        <header>
          <h2>Popüler Ürünler</h2>
          <Button as={Link} to="/menu" variant="outline" size="sm">
            Tümünü Gör
          </Button>
        </header>
        <div className="product-grid">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
