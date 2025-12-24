import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CheckoutForm from '../components/forms/CheckoutForm.jsx';
import CartSummary from '../components/cart/CartSummary.jsx';
import { useCart } from '../contexts/CartContext.jsx';
import { useOrders } from '../contexts/OrdersContext.jsx';

const initialForm = {
  firstName: '',
  lastName: '',
  phone: '',
  address: {
    city: '',
    district: '',
    neighborhood: '',
    detail: '',
  },
  deliveryTime: 'Hemen',
  scheduledDate: '',
  paymentMethod: 'Kapıda Kart',
  note: '',
};

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, totals, clearCart } = useCart();
  const { addOrder } = useOrders();
  const [formData, setFormData] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [isTablet, setIsTablet] = useState(false);
  const [isPhone, setIsPhone] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const tabletQuery = window.matchMedia('(max-width: 768px)');
    const phoneQuery = window.matchMedia('(max-width: 520px)');

    const updateLayout = () => {
      setIsTablet(tabletQuery.matches);
      setIsPhone(phoneQuery.matches);
    };

    updateLayout();
    tabletQuery.addEventListener?.('change', updateLayout);
    phoneQuery.addEventListener?.('change', updateLayout);

    return () => {
      tabletQuery.removeEventListener?.('change', updateLayout);
      phoneQuery.removeEventListener?.('change', updateLayout);
    };
  }, []);

  if (items.length === 0) {
    return (
      <div className="page">
        <p>Sepetiniz boş. Sipariş oluşturmak için menüye dönün.</p>
        <Link to="/menu" className="btn btn--primary btn--md">
          Menüye Git
        </Link>
      </div>
    );
  }

  const validate = () => {
    if (!formData.firstName || !formData.lastName || !formData.phone) {
      setErrors({ general: 'Lütfen zorunlu alanları doldurun.' });
      return false;
    }
    const cleanedPhone = formData.phone.replace(/\s+/g, '');
    const phoneRegex = /^(?:\+?90)?0?[0-9]{10}$/;
    if (!phoneRegex.test(cleanedPhone)) {
      setErrors({ general: 'Telefon formatı hatalı.' });
      return false;
    }
    if (!formData.address.city || !formData.address.detail) {
      setErrors({ general: 'Adres bilgilerini doldurmalısınız.' });
      return false;
    }
    setErrors({});
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    const orderPayload = {
      items: items.map((item) => ({
        productId: item.productId,
        name: item.name,
        quantity: item.quantity,
        size: item.size,
        extras: item.extras.map((extra) => extra.name),
        note: item.note,
        price: item.unitPrice,
      })),
      address: formData.address,
      paymentMethod: formData.paymentMethod,
      deliveryTime: formData.deliveryTime,
      note: formData.note,
      subtotal: totals.subtotal,
      tax: totals.tax,
      discount: totals.discount,
      total: totals.total,
    };

    const order = addOrder(orderPayload);
    clearCart();
    setSubmitting(false);
    navigate('/siparis-onay', { state: { order } });
  };

  return (
    <div className={`page checkout-layout${isTablet ? ' is-tablet' : ''}${isPhone ? ' is-phone' : ''}`}>
      <CheckoutForm
        formData={formData}
        onUpdate={setFormData}
        onSubmit={handleSubmit}
        submitting={submitting}
        errors={errors}
      />
      <div className="card">
        <h3>Sipariş Özeti</h3>
        <ul className="order-summary-list">
          {items.map((item) => (
            <li key={item.cartItemId}>
              <strong>
                {item.quantity}x {item.name}
              </strong>
              <p>
                {item.size || 'Standart'} · {item.extras.map((extra) => extra.name).join(', ') || 'Ekstra seçilmedi'}
              </p>
            </li>
          ))}
        </ul>
        <CartSummary totals={totals} showAction={false} />
      </div>
    </div>
  );
};

export default CheckoutPage;
