import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import OnScreenKeyboard from "../components/OnScreenKeyboard";
import "./LoginPage.css";

const LoginPage = () => {
  const [username_or_email, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(username_or_email, password);
      alert("Login bem-sucedido!");
      navigate("/");
    } catch (error) {
      setPassword("");
      if (error.response) {
        alert("Falha no login: " + error.response.data.message);
      } else {
        alert("Não foi possível conectar ao servidor.");
      }
    }
  };

  const handleKeyboardInput = (key) => {
    if (key === "Backspace") {
      setPassword((currentPassword) => currentPassword.slice(0, -1));
    } else if (key === "Clear") {
      setPassword("");
    } else {
      setPassword((currentPassword) => currentPassword + key);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="login">Email ou Nome de Usuário</label>
          <input
            id="login"
            type="text"
            className="form-input"
            value={username_or_email}
            onChange={(e) => setEmailOrUsername(e.target.value)}
            placeholder="Digite seu email ou usuário"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Senha (use o teclado virtual)</label>
          <input
            id="password"
            type="password"
            className="form-input"
            value={password}
            placeholder="Clique nas teclas abaixo"
            readOnly
            required
          />
        </div>

        <OnScreenKeyboard onKeyPress={handleKeyboardInput} />

        <button type="submit" className="submit-button login-submit-button">
          Entrar
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
