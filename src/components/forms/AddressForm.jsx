const AddressForm = ({ address, onChange }) => (
  <div className="form-grid">
    <label>
      İl
      <input
        type="text"
        value={address.city}
        onChange={(event) => onChange({ ...address, city: event.target.value })}
        required
      />
    </label>
    <label>
      İlçe
      <input
        type="text"
        value={address.district}
        onChange={(event) => onChange({ ...address, district: event.target.value })}
        required
      />
    </label>
    <label>
      Mahalle
      <input
        type="text"
        value={address.neighborhood}
        onChange={(event) => onChange({ ...address, neighborhood: event.target.value })}
        required
      />
    </label>
    <label className="form-grid__full">
      Açık Adres
      <textarea
        rows="3"
        value={address.detail}
        onChange={(event) => onChange({ ...address, detail: event.target.value })}
        required
      />
    </label>
  </div>
);

export default AddressForm;
