import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../data_acess/user_api";
import "./RegisterPage.css";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const userData = { name, username, email, password };

    try {
      await register(userData);
      alert("Usuário registrado com sucesso! Faça o login para continuar.");
      navigate("/login");
    } catch (error) {
      if (error.response) {
        alert("Falha no registro: " + error.response.data.message);
      } else {
        alert("Não foi possível se conectar ao servidor.");
      }
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleRegister} className="register-form">
        <h2>Criar Conta</h2>
        <div className="form-group">
          <label>Nome Completo</label>
          <input
            type="text"
            className="form-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Nome de Usuário</label>
          <input
            type="text"
            className="form-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Senha</label>
          <input
            type="password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Registrar
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
