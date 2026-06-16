import React from "react";

function Footer() {
  return (
    <footer id="footer" className="footer">
      <div className="footer-container">
        <h3 className="footer-title">Наша місія</h3>

        <p className="footer-text">
          Ми прагнемо дарувати людям натуральний продукт, який приносить радість
          і гармонію у кожен дім. Виробництво нашого сиру — це не лише бізнес,
          а й любов до традицій, природи та справжнього смаку.
        </p>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Cheese Brand</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;