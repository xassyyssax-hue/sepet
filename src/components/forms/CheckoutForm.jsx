import AddressForm from './AddressForm.jsx';
import PaymentOptions from './PaymentOptions.jsx';
import Button from '../ui/Button.jsx';

const deliverySlots = [
  { value: 'Hemen', label: 'Hemen (40-50 dk)' },
  { value: '30 dk sonra', label: '30 dk sonra' },
  { value: 'Planlı Teslim', label: 'Planlı Teslim (Tarih/Saat)' },
];

const CheckoutForm = ({ formData, onUpdate, onSubmit, submitting, errors = {} }) => (
  <form className="checkout-form" onSubmit={onSubmit}>
    <section>
      <h3>Teslimat Bilgileri</h3>
      <div className="form-grid">
        <label>
          Ad
          <input
            type="text"
            value={formData.firstName}
            onChange={(event) => onUpdate({ ...formData, firstName: event.target.value })}
            required
          />
        </label>
        <label>
          Soyad
          <input
            type="text"
            value={formData.lastName}
            onChange={(event) => onUpdate({ ...formData, lastName: event.target.value })}
            required
          />
        </label>
        <label className="form-grid__full">
          Telefon
          <input
            type="tel"
            value={formData.phone}
            onChange={(event) => onUpdate({ ...formData, phone: event.target.value })}
            pattern="^(?:\\+?90)?0?[0-9]{10}$"
            placeholder="05xx xxx xx xx"
            required
          />
        </label>
      </div>
    </section>

    <section>
      <h3>Adres Bilgileri</h3>
      <AddressForm
        address={formData.address}
        onChange={(address) => onUpdate({ ...formData, address })}
      />
    </section>

    <section>
      <h3>Teslimat Zamanı</h3>
      <div className="delivery-options">
        {deliverySlots.map((slot) => (
          <label key={slot.value} className="delivery-options__item">
            <input
              type="radio"
              name="delivery"
              checked={formData.deliveryTime === slot.value}
              onChange={() => onUpdate({ ...formData, deliveryTime: slot.value })}
            />
            <span>{slot.label}</span>
          </label>
        ))}
        {formData.deliveryTime === 'Planlı Teslim' && (
          <input
            type="datetime-local"
            value={formData.scheduledDate}
            onChange={(event) => onUpdate({ ...formData, scheduledDate: event.target.value })}
            required
          />
        )}
      </div>
    </section>

    <section>
      <h3>Ödeme Yöntemi</h3>
      <PaymentOptions
        value={formData.paymentMethod}
        onChange={(method) => onUpdate({ ...formData, paymentMethod: method })}
      />
    </section>

    <section>
      <h3>Sipariş Notu</h3>
      <textarea
        rows="3"
        value={formData.note}
        onChange={(event) => onUpdate({ ...formData, note: event.target.value })}
        placeholder="Eklemek istediğiniz not var mı?"
      />
    </section>

    {errors.general && <p className="form-error">{errors.general}</p>}

    <Button type="submit" size="lg" disabled={submitting}>
      {submitting ? 'Gönderiliyor...' : 'Siparişi Onayla'}
    </Button>
  </form>
);

export default CheckoutForm;
