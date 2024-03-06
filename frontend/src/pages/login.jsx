import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');

  const login = async () => {
    try {
      const response = await axios.post('http://localhost:3001/users/login', { email: loginEmail, password: loginPassword });
      if (response.status === 200) {
        console.log('Login successful:', response.data);
        sessionStorage.setItem('token', response.data.token);
        navigate('/home');
      } else {
        console.log('Error logging in:', response.data);
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const register = async () => {
    try {
      const response = await axios.post('http://localhost:3001/users/register', { name: registerName, email: registerEmail, password: registerPassword });
      if (response.status === 200) {
        setConfirmationMessage('Registration successful!');
      } else {
        setConfirmationMessage('Error registering.');
      }
    } catch (error) {
      setConfirmationMessage('Error registering.');
    }
  };

  const toggleRegister = () => {
    setShowRegister(!showRegister);
  };

  return (
    <div>
      <h2>Login</h2>
      <input type="email" placeholder="Email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
      <button onClick={login}>Login</button>

      {!showRegister && <button onClick={toggleRegister}>Register</button>}

      {showRegister && (
        <div>
          <h2>Register</h2>
          <input type="text" placeholder="Name" value={registerName} onChange={(e) => setRegisterName(e.target.value)} />
          <input type="email" placeholder="Email" value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} />
          <input type="password" placeholder="Password" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} />
          <button onClick={register}>Register</button>
          <p>{confirmationMessage}</p>
        </div>
      )}
    </div>
  );
};

export default LoginPage;