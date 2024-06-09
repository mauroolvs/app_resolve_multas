import React from 'react';

const Pricing = () => {
  const plans = [
    { name: 'Indicação de Condutor', price: 'R$9,90/mês', features: ['Indicação do Condutor'] },
    { name: 'Conversão de Multa', price: 'R$19,90/mês', features: ['Conversão de Multa'] },
    { name: 'Recurso de Infração', price: 'R$29,90/mês', features: ['Recurso de Infração'] }
  ];

  return (
    <section className="pricing">
      <div className="container">
        <h2>Preços</h2>
        <div className="pricing-plans">
          {plans.map((plan, index) => (
            <div key={index} className="plan">
              <h3>{plan.name}</h3>
              <p>{plan.price}</p>
              <ul>
                {plan.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
              <button>Escolher Serviço</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
