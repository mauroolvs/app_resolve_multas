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
          <a href="/">Resolve Multas</a>
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
