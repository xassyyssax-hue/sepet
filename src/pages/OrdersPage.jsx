import { Link, useNavigate } from 'react-router-dom';
import { useOrders } from '../contexts/OrdersContext.jsx';
import { useCart } from '../contexts/CartContext.jsx';
import { formatPrice } from '../utils/currency.jsx';
import Button from '../components/ui/Button.jsx';

const OrdersPage = () => {
  const { orders } = useOrders();
  const { setCartItemsFromOrder } = useCart();
  const navigate = useNavigate();

  const handleReorder = (order) => {
    setCartItemsFromOrder(order.items);
    navigate('/sepet');
  };

  return (
    <div className="page orders-page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Siparişlerim</p>
          <h1>Geçmiş siparişlerin</h1>
        </div>
      </header>
      {orders.length === 0 ? (
        <div className="card">
          <p>Henüz hiç sipariş vermediniz.</p>
          <Button as={Link} to="/menu">
            Menüye Git
          </Button>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <article key={order.id} className="card order-card">
              <div className="order-card__header">
                <div>
                  <strong>{order.orderNumber}</strong>
                  <p>{new Date(order.date).toLocaleDateString('tr-TR')}</p>
                </div>
                <span className={`status status--${order.status.toLowerCase().replace(/\s+/g, '-')}`}>
                  {order.status}
                </span>
              </div>
              <ul>
                {order.items.map((item, index) => (
                  <li key={`${item.productId}-${index}`}>
                    {item.quantity}x {item.name} {item.size && `(${item.size})`}
                  </li>
                ))}
              </ul>
              <div className="order-card__footer">
                <strong>{formatPrice(order.total)}</strong>
                <Button size="sm" onClick={() => handleReorder(order)}>
                  Tekrar Sipariş Ver
                </Button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
