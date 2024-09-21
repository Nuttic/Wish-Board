import React, { useContext, useState, useEffect } from 'react';
import {  Route, Routes } from 'react-router-dom';
import RegistrationPage from '../../pages/auth/RegisrationPage';
import LoginPage from '../../pages/auth/LoginPage';
import MainPage from '../../pages/main/MainPage';
import { User } from '../../entities/User/types/user';
import Navbar from '../../widgets/navbar/Navbar';
import { AppContext } from './AppContext';
import { Wish } from '../../entities/Wish/types/wish';
import axiosInstance from '../../services/axiosInstanse';
// import WishListPage from '../../pages/WishListPage';

function AppRoutes(): JSX.Element {

  // const {user, setUser, wishes, setWishes} = useContext(AppContext)
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [user, setUser] = useState<User | undefined>(undefined);
  const getAllBooks = async () => {
    try {
      const response = await axiosInstance.get('/wishes')
      if (response.status === 200) {
        setWishes(response.data.wishes);
      }
    } catch ( response : any) {
      // попадают 400 и 500
      console.log(response.data.message);
    }
  };

  const checkUser = async() => {
    try {
      const response = await axiosInstance.get('/tokens/refresh')
      
      if(response.status === 200){
        setUser(response.data.user)
      }
    } catch (message: any) {
      console.log(message);
    }
  }

  useEffect(() => {
    checkUser()
    getAllBooks()
  }, [])


  
  return (
    <>
        <AppContext.Provider value={ {user, setUser, wishes, setWishes }}>
             <Navbar/>
      <Routes>
       
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path='/' element={<MainPage/>}/>
      </Routes>
        </AppContext.Provider>
     
      </>
  );
};


export default AppRoutes