import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import CartIcon from '../cart/CartIcon.jsx';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="navbar">
      <div className="navbar__brand">
        <Link to="/">Rumeli<span>Sepeti</span></Link>
      </div>
      <button className="navbar__toggle" type="button" aria-label="Menüyü Aç/Kapat" onClick={() => setIsOpen((prev) => !prev)}>
        ☰
      </button>
      <nav className={`navbar__links ${isOpen ? 'is-open' : ''}`}>
        <NavLink to="/" end onClick={closeMenu}>
          Ana Sayfa
        </NavLink>
        <NavLink to="/menu" onClick={closeMenu}>
          Menü
        </NavLink>
        <NavLink to="/siparislerim" onClick={closeMenu}>
          Siparişlerim
        </NavLink>
      </nav>
      <CartIcon />
    </header>
  );
};

export default Navbar;
