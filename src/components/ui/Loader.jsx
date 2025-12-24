const Loader = ({ label = 'Yükleniyor...' }) => (
  <div className="loader">
    <span className="loader__spinner" aria-hidden />
    <span>{label}</span>
  </div>
);

export default Loader;
