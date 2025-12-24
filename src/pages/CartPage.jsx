import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext.jsx';
import CartItem from '../components/cart/CartItem.jsx';
import CartSummary from '../components/cart/CartSummary.jsx';
import CartEmpty from '../components/cart/CartEmpty.jsx';
import CouponInput from '../components/forms/CouponInput.jsx';

const CartPage = () => {
  const navigate = useNavigate();
  const { items, totals, updateQuantity, removeItem, applyCoupon, coupon } = useCart();
  const [couponMessage, setCouponMessage] = useState('');

  if (items.length === 0) {
    return (
      <div className="page">
        <CartEmpty />
      </div>
    );
  }

  const handleApplyCoupon = (code) => {
    const result = applyCoupon(code);
    setCouponMessage(result.message);
  };

  return (
    <div className="page cart-page">
      <div className="cart-list">
        {items.map((item) => (
          <CartItem key={item.cartItemId} item={item} onQuantityChange={updateQuantity} onRemove={removeItem} />
        ))}
      </div>
      <div className="card">
        <h3>Kupon / İndirim</h3>
        <CouponInput onApply={handleApplyCoupon} helperText={coupon ? `Aktif kupon: ${coupon.code}` : couponMessage} />
        <CartSummary totals={totals} onSubmit={() => navigate('/siparis')} />
      </div>
    </div>
  );
};

export default CartPage;
