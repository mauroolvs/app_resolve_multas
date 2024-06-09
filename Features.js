import React from 'react';

const Features = () => {
  const features = [
    { title: 'Indicação do Condutor', description: 'Se dirigia o veículo de outra pessoa e quer assumir os pontos.' },
    { title: 'Conversão de Multa', description: 'Possibilidade de conversão de multa em advertência, sem precisar pagar a multa.' },
    { title: 'Recurso de Infração', description: 'Recursos aos Órgãos Autuadores, JARI e CETRAN.' }
  ];

  return (
    <section className="features">
      <div className="container">
        <h2>Recursos</h2>
        <div className="features-cards">
          {features.map((feature, index) => (
            <div key={index} className="card">
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <button>Saber Mais</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
