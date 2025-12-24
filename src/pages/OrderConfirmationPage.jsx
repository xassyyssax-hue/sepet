import { Link, useLocation, useNavigate } from 'react-router-dom';
import { estimateDeliveryTime } from '../utils/order.jsx';
import CartSummary from '../components/cart/CartSummary.jsx';
import { formatPrice } from '../utils/currency.jsx';
import Button from '../components/ui/Button.jsx';

const OrderConfirmationPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const order = state?.order;

  if (!order) {
    return (
      <div className="page">
        <p>Sipariş bilgileriniz bulunamadı.</p>
        <Link to="/" className="btn btn--primary btn--md">
          Ana Sayfa
        </Link>
      </div>
    );
  }

  return (
    <div className="page order-confirmation">
      <div className="card">
        <p className="eyebrow">Siparişiniz alındı!</p>
        <h1>#{order.orderNumber}</h1>
        <p>Tahmini teslimat süresi {estimateDeliveryTime()}</p>
        <div className="order-items">
          {order.items.map((item) => (
            <div key={`${item.productId}-${item.name}`}>
              <strong>
                {item.quantity}x {item.name}
              </strong>
              <p>{formatPrice(item.price)}</p>
            </div>
          ))}
        </div>
        <CartSummary totals={{ subtotal: order.subtotal, tax: order.tax, discount: order.discount, total: order.total }} showAction={false} />
        <div className="order-confirmation__actions">
          <Button as={Link} to="/siparislerim" variant="secondary">
            Siparişlerimi Görüntüle
          </Button>
          <Button variant="ghost" onClick={() => navigate('/')}>
            Ana Sayfa
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
