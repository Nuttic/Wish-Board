// src/components/Login.tsx
import { AppContext } from '../../app/provider/AppContext';
import axiosInstance from '../../services/axiosInstanse';

import React, { useContext, useState } from 'react';



function LoginPage(): JSX.Element {

  const {setUser} = useContext(AppContext)
 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    try {
     e.preventDefault();
     const response = await axiosInstance.post('/auth/login', { email, password})
     if(response.status === 200){
      console.log(response.data);
      
       setUser(response.data.user)
     }
    } catch (response) {
     console.log(response);
     
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <h2>Авторизация</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
       
      />
      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
       
      />
      <button type="submit">Войти</button>
    </form>
  );
};

export default LoginPage
