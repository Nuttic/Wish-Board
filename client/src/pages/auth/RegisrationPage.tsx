// src/components/Register.tsx
import React, { useState, SetStateAction, useContext } from 'react';
import axiosInstance from '../../services/axiosInstanse';
import { AppContext } from '../../app/provider/AppContext';



function RegistrationPage(): JSX.Element {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const {setUser} = useContext(AppContext)

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  const handleSubmit = async (e: React.FormEvent) => {
   try {
    e.preventDefault();
    const response = await axiosInstance.post('/auth/registration', {name, email, password})
    if(response.status === 201){
      setUser(response.data.user)
    }
   } catch (response) {
    console.log(response);
    
   }
    // Обработка успешной регистрации (например, редирект на страницу входа)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}  />
      <input type="email" placeholder="Email"  value={email} onChange={(e) => setEmail(e.target.value)}  />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}  />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationPage;