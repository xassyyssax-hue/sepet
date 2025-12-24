import { Link } from 'react-router-dom';

const CartEmpty = () => (
  <div className="cart-empty">
    <p>Sepetiniz boş gibi görünüyor.</p>
    <Link to="/menu" className="btn btn--primary btn--md">
      Menüye Dön
    </Link>
  </div>
);

export default CartEmpty;
