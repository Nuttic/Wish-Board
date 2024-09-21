/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */

// import axios from 'axios';
import React, { useContext } from 'react';
import axiosInstance from '../../../services/axiosInstanse';
import { AppContext } from '../../../app/provider/AppContext';
// import Button, { ThemeButton } from '../../../shared/ui/Button/Button';
import type { Wish } from '../types/wish';
import './wishItem.css'
import WishUpdateForm from './WishUpdateForm';


type WishProps = {
  wish: Wish
}

function WishItem({wish}: WishProps): JSX.Element {
  const { setWishes, user } = useContext(AppContext);


  const handleDelete = async (): Promise<void> => {
    const response = await axiosInstance.delete(`/wishes/${wish.id}`)
    if (response.status === 200 && response.data.message === 'success') {
        setWishes((prev) => prev.filter((wsh: Wish) => wsh.id !== wish.id));
    }
  };

  return (
    <>
    <div className="wish-item" >
      <h1>{wish.title}</h1>
      <p>{wish.description}</p>
    </div>
  {user && user.id === wish.userId && (
    <div>
       <WishUpdateForm wish={wish}/>
      <button className="delete-button"  onClick={handleDelete}>Delete</button>
      </div>
    )}
    
    </>
  );
}

export default WishItem;