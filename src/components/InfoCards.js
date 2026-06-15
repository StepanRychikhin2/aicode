import React from "react";

function InfoCards() {
  return (
    <section id="about" className="info-section">
      <h2 className="info-main-title">Про нас</h2>

      <div className="info-grid">
        <div className="info-card">
          <h3>🏭 Про нашу фабрику</h3>
          <p>
            Наша фабрика розташована в екологічно чистому регіоні, де природа
            дарує найкращі умови для виробництва молока та сиру. Ми поєднуємо
            традиційні рецепти з сучасними технологіями.
          </p>
        </div>

        <div className="info-card">
          <h3>🌿 Місце виробництва</h3>
          <p>
            Сир виготовляється у мальовничому містечку, оточеному зеленими
            луками та фермерськими господарствами з натуральними умовами.
          </p>
        </div>

        <div className="info-card">
          <h3>🧀 Наші сири</h3>
          <p>
            Ми пропонуємо широкий асортимент: тверді, м’які та козячі сири з
            унікальним смаком і натуральним складом.
          </p>
        </div>
      </div>
    </section>
  );
}

export default InfoCards;