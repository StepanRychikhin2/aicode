import React from "react";

function Header() {
  return (
    <header className="header">
      <a href="#hero" className="logo">GC Cheese</a>

      <nav>
        <ul className="nav-list">
          <li><a href="#products">Каталог</a></li>
          <li><a href="#about">Про нас</a></li>
          <li><a href="#footer">Контакти</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;