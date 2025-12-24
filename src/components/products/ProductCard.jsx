import { Link } from 'react-router-dom';
import Badge from '../ui/Badge.jsx';
import Button from '../ui/Button.jsx';
import { formatPrice } from '../../utils/currency.jsx';
import { useCart } from '../../contexts/CartContext.jsx';

const fallbackImage =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600'><rect width='100%25' height='100%25' fill='%23f3f4f6'/><text x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%239ca3af' font-family='Arial' font-size='24'>Gorsel yok</text></svg>";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart(product.id, { size: product.sizes?.[0]?.name || null, extras: [], quantity: 1, note: '' });
  };

  return (
    <article className="product-card">
      <div className="product-card__media">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = fallbackImage;
          }}
        />
      </div>
      <div className="product-card__body">
        <div className="product-card__labels">
          {product.isPopular && <Badge variant="accent">Popüler</Badge>}
          {product.isNew && <Badge variant="success">Yeni</Badge>}
          {product.discount > 0 && <Badge variant="warning">-%{product.discount}</Badge>}
        </div>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <div className="product-card__footer">
          <span>{formatPrice(product.price)}</span>
          <div className="product-card__actions">
            <Button as={Link} to={`/urun/${product.id}`} size="sm" variant="outline">
              İncele
            </Button>
            <Button size="sm" onClick={handleAdd}>
              Sepete Ekle
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
