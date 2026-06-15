import React from "react";

function Advantages() {
  const items = [
    { icon: "🌱", title: "Натуральні інгредієнти", description: "Лише молоко та закваски без домішок." },
    { icon: "🛡️", title: "Без консервантів", description: "Традиційне виробництво без хімії." },
    { icon: "🚚", title: "Швидка доставка", description: "Доставка за 24 години." },
    { icon: "🥇", title: "Якість підтверджена", description: "Сертифікати та нагороди якості." },
    { icon: "🤝", title: "Підтримка фермерів", description: "Співпраця з локальними господарствами." },
    { icon: "🌍", title: "Екологічність", description: "Мінімальний вплив на довкілля." },
    { icon: "👨‍👩‍👧‍👦", title: "Для всієї родини", description: "Безпечний продукт для всіх." },
    { icon: "💡", title: "Інновації", description: "Нові смаки та рецепти." }
  ];

  return (
    <section id="advantages" className="advantages-section">
      <h2 className="advantages-title">Наші переваги</h2>

      <div className="advantages-grid">
        {items.map((item, index) => (
          <div key={index} className="advantage-card">
            <div className="advantage-icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Advantages;