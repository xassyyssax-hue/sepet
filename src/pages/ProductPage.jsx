import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import products from '../data/products.json';
import ProductDetail from '../components/products/ProductDetail.jsx';
import ProductCard from '../components/products/ProductCard.jsx';
import Button from '../components/ui/Button.jsx';
import Toast from '../components/ui/Toast.jsx';
import { useCart } from '../contexts/CartContext.jsx';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((item) => item.id === id);
  const related = useMemo(() => products.filter((item) => item.category === product?.category && item.id !== product?.id).slice(0, 3), [product]);
  const { addToCart } = useCart();
  const [toast, setToast] = useState(null);

  if (!product) {
    return (
      <div className="page">
        <p>Ürün bulunamadı.</p>
        <Button as={Link} to="/menu">
          Menüye Dön
        </Button>
      </div>
    );
  }

  const handleAdd = (options) => {
    addToCart(product.id, options);
    setToast('Ürün sepetinize eklendi.');
  };

  return (
    <div className="page product-page">
      <Button variant="ghost" onClick={() => navigate(-1)}>
        ← Geri
      </Button>
      <ProductDetail product={product} onAdd={handleAdd} />

      {related.length > 0 && (
        <section className="home-section">
          <header>
            <h2>Benzer Ürünler</h2>
          </header>
          <div className="product-grid">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      )}
      <Toast message={toast} onDismiss={() => setToast(null)} />
    </div>
  );
};

export default ProductPage;
