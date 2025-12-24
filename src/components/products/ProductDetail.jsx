import { useMemo, useState } from 'react';
import QuantitySelector from '../ui/QuantitySelector.jsx';
import ExtraOptions from './ExtraOptions.jsx';
import Button from '../ui/Button.jsx';
import { formatPrice } from '../../utils/currency.jsx';

const ProductDetail = ({ product, onAdd }) => {
  const [size, setSize] = useState(product.sizes?.[0]?.name || null);
  const [extras, setExtras] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState('');

  const toggleExtra = (extraName) => {
    setExtras((prev) => (prev.includes(extraName) ? prev.filter((item) => item !== extraName) : [...prev, extraName]));
  };

  const totalPrice = useMemo(() => {
    const sizePrice = product.sizes?.find((item) => item.name === size)?.price || 0;
    const extrasPrice = extras.reduce((sum, extraName) => {
      const extra = product.extras?.find((item) => item.name === extraName);
      return sum + (extra?.price || 0);
    }, 0);
    return (product.price + sizePrice + extrasPrice) * quantity;
  }, [extras, product.extras, product.price, product.sizes, quantity, size]);

  const handleSubmit = () => {
    onAdd({ size, extras, quantity, note });
    setQuantity(1);
    setExtras([]);
    setNote('');
  };

  return (
    <div className="product-detail">
      <div className="product-detail__media">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-detail__info">
        <h1>{product.name}</h1>
        <p className="product-detail__description">{product.description}</p>
        <div className="product-detail__nutrition">
          <span>{product.nutrition.calories} kcal</span>
          <span>Protein {product.nutrition.protein}g</span>
          <span>Karbonhidrat {product.nutrition.carbs}g</span>
          <span>Yağ {product.nutrition.fat}g</span>
        </div>

        {product.sizes?.length > 0 && (
          <div className="product-detail__section">
            <h4>Porsiyon Seçimi</h4>
            <div className="pill-options">
              {product.sizes.map((option) => (
                <button
                  key={option.name}
                  type="button"
                  className={size === option.name ? 'is-active' : ''}
                  onClick={() => setSize(option.name)}
                >
                  {option.name} {option.price > 0 && `(+${option.price}₺)`}
                </button>
              ))}
            </div>
          </div>
        )}

        {product.extras?.length > 0 && (
          <div className="product-detail__section">
            <h4>Ekstra Malzemeler</h4>
            <ExtraOptions options={product.extras} selected={extras} onToggle={toggleExtra} />
          </div>
        )}

        <div className="product-detail__section">
          <h4>Adet</h4>
          <QuantitySelector value={quantity} onChange={setQuantity} />
        </div>

        <label className="product-detail__note">
          Sipariş Notu
          <textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="Paket servis için not bırakabilirsiniz." />
        </label>

        <div className="product-detail__cta">
          <div>
            <small>Toplam</small>
            <strong>{formatPrice(totalPrice)}</strong>
          </div>
          <Button type="button" size="lg" onClick={handleSubmit}>
            Sepete Ekle
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
