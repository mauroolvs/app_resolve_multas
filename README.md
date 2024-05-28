# App Resolve Multas
APP criado no stack MERN, com código gerado pelo chatGPT e Blackbox AI.

# Passo 1: Configurar o Projeto.
1. Inicializar um novo projeto MERN stack.
- Criar um novo diretório para o projeto:
mkdir resolve-multas-website
cd resolve-multas-website

2. Inicializar um novo projeto Node.js:
npm init -y

3. Configurar o servidor.
- Criar um diretório para o servidor:
mkdir server
cd server

- Inicializar um novo projeto Node.js no diretório do servidor:
npm init -y

4. Instalar os pacotes necessários:
npm install express mongoose body-parser cors dotenv
npm install nodemon --save-dev

5. Criar a configuração básica do servidor.
- Criar um arquivo chamado server.js no diretório server e adicionar o seguinte código:
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Conectar ao MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Rota básica
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

- Criar um arquivo .env no diretório server e adicionar sua URI do MongoDB:
MONGO_URI=your_mongodb_connection_string

6. Configurar o Nodemon para desenvolvimento.
- Adicionar os seguintes scripts ao package.json no diretório server:
"scripts": {
  "start": "node server.js",
  "server": "nodemon server.js"
}

# Passo 2: Criar a Lógica do Backend para Manipulação de E-mails.
1. Criar um modelo para subscrições de e-mail.
- Criar um diretório models no diretório server.
- Criar um arquivo chamado Subscription.js no diretório models e adicionar o seguinte código:
const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Subscription', SubscriptionSchema);

2. Criar rotas para manipulação de subscrições.
- Criar um diretório routes no diretório server.
- Criar um arquivo chamado subscriptions.js no diretório routes e adicionar o seguinte código:
const express = require('express');
const router = express.Router();
const Subscription = require('../models/Subscription');

// Rota POST para adicionar uma subscrição
router.post('/subscribe', async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: 'Please provide both name and email' });
  }

  try {
    const newSubscription = new Subscription({ name, email });
    await newSubscription.save();
    res.status(201).json({ message: 'Subscription successful' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

3. Integrar rotas no servidor.
- Modificar server.js para incluir as rotas de subscrição:
const subscriptionRoutes = require('./routes/subscriptions');
app.use('/api/subscriptions', subscriptionRoutes);

# Passo 3: Configurar o Frontend
1. Configurar um novo app React.
- Voltar ao diretório raiz do projeto:
cd ..

- Criar uma nova aplicação React:
npx create-react-app client

2. Instalar Axios para fazer requisições à API:
cd client
npm install axios

3. Criar a estrutura básica e componentes.
- No diretório src, criar os seguintes componentes:
Hero.js
Features.js
Pricing.js
Subscription.js
Footer.js
WhatsappButton.js
Navbar.js

4. Criar a seção hero (Hero.js):
import React from 'react';

const Hero = () => {
  return (
    <section className="hero">
      <div className="container">
        <h1>Bem-vindo ao Nosso Serviço</h1>
        <p>Sua satisfação é nossa prioridade.</p>
        <div className="cta-buttons">
          <button>Começar</button>
          <button>Saber Mais</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;

5. Criar a seção de features (Features.js):
import React from 'react';

const Features = () => {
  const features = [
    { title: 'Recurso 1', description: 'Descrição do Recurso 1' },
    { title: 'Recurso 2', description: 'Descrição do Recurso 2' },
    { title: 'Recurso 3', description: 'Descrição do Recurso 3' }
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

6. Criar a seção de preços (Pricing.js):
import React from 'react';

const Pricing = () => {
  const plans = [
    { name: 'Básico', price: 'R$10/mês', features: ['Recurso A', 'Recurso B'] },
    { name: 'Padrão', price: 'R$20/mês', features: ['Recurso A', 'Recurso B', 'Recurso C'] },
    { name: 'Premium', price: 'R$30/mês', features: ['Recurso A', 'Recurso B', 'Recurso C', 'Recurso D'] }
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
              <button>Escolher Plano</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;

7. Criar a seção de inscrição (Subscription.js):
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
      setMessage('Falha na subscrição do e-mail!');
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

8. Criar o rodapé (Footer.js):
import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; 2024 Sua Empresa. Todos os direitos reservados.</p>
        <div className="social-media-links">
          <a href="#facebook">Facebook</a>
          <a href="#twitter">Twitter</a>
          <a href="#instagram">Instagram</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

9. Criar o botão do WhatsApp (WhatsappButton.js):
import React from 'react';

const WhatsappButton = () => {
  return (
    <a href="https://wa.me/seunumerodowhatsapp" className="whatsapp-button">
      <img src="path_to_whatsapp_icon.png" alt="WhatsApp" />
    </a>
  );
};

export default WhatsappButton;

10. Criar o menu hamburger (Navbar.js):
import React, { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          <a href="/">Logo</a>
        </div>
        <div className={`menu ${isOpen ? 'open' : ''}`}>
          <a href="#hero">Início</a>
          <a href="#features">Recursos</a>
          <a href="#pricing">Preços</a>
          <a href="#subscription">Inscreva-se</a>
        </div>
        <div className="hamburger" onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

11. Combinar todos os componentes no App.js:
import React from 'react';
import Hero from './components/Hero';
import Features from './components/Features';
import Pricing from './components/Pricing';
import Subscription from './components/Subscription';
import Footer from './components/Footer';
import WhatsappButton from './components/WhatsappButton';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <Features />
      <Pricing />
      <Subscription />
      <Footer />
      <WhatsappButton />
    </div>
  );
};

export default App;

# Passo 4: Estilizar a Aplicação (CSS)
1. Criar um arquivo CSS (por exemplo, App.css) e importá-lo no App.js:
/* Estilos básicos para os componentes */

body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 0;
}

.hero {
  background: #f4f4f4;
  padding: 50px 0;
  text-align: center;
}

.cta-buttons button {
  margin: 10px;
  padding: 10px 20px;
  font-size: 16px;
}

.features,
.pricing,
.subscription {
  padding: 50px 0;
  text-align: center;
}

.features-cards,
.pricing-plans {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.card,
.plan {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin: 10px;
  padding: 20px;
  width: 300px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.footer {
  background: #222;
  color: #fff;
  padding: 20px 0;
  text-align: center;
}

.footer .social-media-links a {
  color: #fff;
  margin: 0 10px;
  text-decoration: none;
}

.whatsapp-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #25D366;
  padding: 10px;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.whatsapp-button img {
  width: 24px;
  height: 24px;
}

.navbar {
  background: #333;
  color: #fff;
  padding: 10px 0;
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 1000;
}

.navbar .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar .logo a {
  color: #fff;
  text-decoration: none;
  font-size: 24px;
}

.navbar .menu {
  display: flex;
  align-items: center;
}

.navbar .menu a {
  color: #fff;
  text-decoration: none;
  margin: 0 10px;
}

.navbar .hamburger {
  display: none;
  flex-direction: column;
  cursor: pointer;
}

.navbar .hamburger .bar {
  width: 25px;
  height: 3px;
  background: #fff;
  margin: 3px 0;
}

@media (max-width: 768px) {
  .navbar .menu {
    display: none;
    flex-direction: column;
    width: 100%;
    position: absolute;
    top: 60px;
    left: 0;
    background: #333;
  }

  .navbar .menu.open {
    display: flex;
  }

  .navbar .hamburger {
    display: flex;
  }
}

2. Importar o CSS no App.js:
import './App.css';

# Passo 5: Executar a Aplicação
1. Iniciar o servidor backend:
cd server
npm run server

2. Iniciar a aplicação React:
cd ../client
npm start
