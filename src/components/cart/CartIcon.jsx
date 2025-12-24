import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext.jsx';
import Badge from '../ui/Badge.jsx';

const CartIcon = () => {
  const { items } = useCart();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <Link to="/sepet" className="cart-icon" aria-label="Sepetim">
      <span aria-hidden="true">🛒</span>
      <span>Sepet</span>
      {totalItems > 0 && <Badge variant="accent">{totalItems}</Badge>}
    </Link>
  );
};

export default CartIcon;
