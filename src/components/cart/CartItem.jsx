import QuantitySelector from '../ui/QuantitySelector.jsx';
import Button from '../ui/Button.jsx';
import { formatPrice } from '../../utils/currency.jsx';

const CartItem = ({ item, onQuantityChange, onRemove }) => (
  <div className="cart-item">
    <img src={item.image} alt={item.name} />
    <div className="cart-item__details">
      <div className="cart-item__header">
        <h4>{item.name}</h4>
        <Button variant="ghost" size="sm" onClick={() => onRemove(item.cartItemId)}>
          Kaldır
        </Button>
      </div>
      <p className="cart-item__meta">
        {item.size && <span>{item.size}</span>}
        {item.extras?.length > 0 && (
          <span>Ekstralar: {item.extras.map((extra) => extra.name).join(', ')}</span>
        )}
        {item.note && <span>Not: {item.note}</span>}
      </p>
      <div className="cart-item__footer">
        <QuantitySelector value={item.quantity} onChange={(value) => onQuantityChange(item.cartItemId, value)} />
        <strong>{formatPrice(item.unitPrice * item.quantity)}</strong>
      </div>
    </div>
  </div>
);

export default CartItem;
