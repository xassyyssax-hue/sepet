import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div className="page not-found">
    <h1>404</h1>
    <p>Aradığınız sayfa bulunamadı.</p>
    <Link to="/" className="btn btn--primary btn--md">
      Ana Sayfa
    </Link>
  </div>
);

export default NotFoundPage;
