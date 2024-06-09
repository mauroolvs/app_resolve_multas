import React, { useState } from 'react';
import axios from 'axios';

const Subscription = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/subscriptions/subscribe', { name, email });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Falha na inscrição');
    }
  };

  return (
    <section className="subscription">
      <div className="container">
        <h2>Inscreva-se na nossa Newsletter</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Inscrever-se</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </section>
  );
};

export default Subscription;
