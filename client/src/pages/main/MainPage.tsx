import React, { Dispatch, SetStateAction, useContext } from 'react';
import { AppContext } from '../../app/provider/AppContext';
import WishItem from '../../entities/Wish/ui/WishItem'
import WishFormAdd from '../../entities/Wish/ui/WIshFormAdd';




function MainPage(): JSX.Element {

  const {wishes, user} = useContext(AppContext)

  return (
    <div className="MainPage">
      <h1>Hello wolves</h1>
      <div className='wish-list'>
      {user && (<WishFormAdd/>)}
     {wishes && wishes.map((wish) => <WishItem key={wish.id} wish={wish}/>)}
     </div>

    </div>
  );
}

export default MainPage;