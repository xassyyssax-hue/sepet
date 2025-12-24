import { Outlet } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';

const Layout = () => (
  <div className="layout">
    <Navbar />
    <main className="layout__content">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default Layout;
