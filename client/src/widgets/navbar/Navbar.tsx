import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import  axiosInstance, {setAccessToken} from '../../services/axiosInstanse';
import { AppContext } from '../../app/provider/AppContext';


function Navbar(): JSX.Element {

    const {user, setUser} = useContext(AppContext)

  const onHandleLogout = async() => {
    try {

      const response = await axiosInstance.delete('/auth/logout')
      if(response.status === 200){
        setUser(undefined)
        setAccessToken('')
        return
      }
      
    } catch (error) {
      console.log(error);
      
    }
  }

  console.log(user);
  

  return (
   <nav>
         {user && (<span className='navbar'>{`Добро пожаловать, ${user.name}`}</span>)}
        <NavLink className='navbar' to='/'>На главную</NavLink>
        {!user &&(<NavLink className='navbar' to='/registration'>Регистрация</NavLink>)}
        {!user &&(<NavLink className='navbar' to='/login'>Войти</NavLink>)}
        {user && ( <NavLink className='navbar' to={'/'} onClick={onHandleLogout}>Выйти</NavLink>)}
        
    </nav>
  )
}

export default Navbar;
// aria-disabled="true" className="nav-link disabled"