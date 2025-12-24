import { formatPrice } from '../../utils/currency.jsx';
import Button from '../ui/Button.jsx';

const CartSummary = ({
  totals,
  actionLabel = 'Siparişi Tamamla',
  onSubmit,
  disabled,
  showAction = true,
}) => (
  <div className="cart-summary">
    <div className="cart-summary__row">
      <span>Ara Toplam</span>
      <strong>{formatPrice(totals.subtotal)}</strong>
    </div>
    <div className="cart-summary__row">
      <span>KDV (8%)</span>
      <strong>{formatPrice(totals.tax)}</strong>
    </div>
    {totals.discount > 0 && (
      <div className="cart-summary__row cart-summary__row--success">
        <span>İndirim</span>
        <strong>-{formatPrice(totals.discount)}</strong>
      </div>
    )}
    <div className="cart-summary__total">
      <span>Toplam</span>
      <strong>{formatPrice(totals.total)}</strong>
    </div>
    {showAction && (
      <Button type="button" size="lg" onClick={onSubmit} disabled={disabled}>
        {actionLabel}
      </Button>
    )}
  </div>
);

export default CartSummary;
