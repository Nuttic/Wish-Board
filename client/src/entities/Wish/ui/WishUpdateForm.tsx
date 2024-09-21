import React, { useContext, useState } from 'react';


import axiosInstance from '../../../services/axiosInstanse';
import { AppContext } from '../../../app/provider/AppContext';
import { Wish } from '../types/wish';


type WishProps = {
    wish: Wish
  }

function WishUpdateForm({wish}: WishProps): JSX.Element {

    const {setWishes} = useContext(AppContext)

    const [title, setTitle] = useState(wish.title);
    const [description, setDescription] = useState(wish.description);
    const [status, setStatus] = useState(wish.status)
    const [deadLine, setDeadline] = useState(wish.deadLine)
    const [error, setError] = useState('')
   
  const onHandleSubmit = async (e: React.FormEvent ) => {
    try {
      setError(''); 
      e.preventDefault();

      if(title.trim() !== '' && description.trim() !== '' && deadLine && status){
      const response = await axiosInstance.put(`/wishes/${wish.id}`, {
        title,
        description,
        status,
        deadLine
    
      });

      console.log(123, response);
      
      if (response.status === 200) {
        setWishes((prev) =>
          prev.map((i) =>
            i.id === response.data.wish.id ? response.data.wish : i
          )
        );
      }
    } else {
      setError('Пожалуйста, заполните все поля.');
  }
    } catch ({ response }: any) {
      console.log(response.data.message);
    }
  };

  return (
    <>
    {error && <p className="error-message">{error}</p>} 
      <form onSubmit={onHandleSubmit} className="book-form">
      <input
        type='text'
        value={title}
        placeholder='Название'
        onChange={(e) => setTitle(e.target.value)}
       className="form-input"
      />
      <input
        type='text'
        value={description}
        placeholder='Описание'
        onChange={(e) => setDescription(e.target.value)}
       className="form-input"
      />
        <input
        type='date'
        value={deadLine.toString()}
        placeholder='Dead line'
        onChange={(e) => setDeadline(new Date(e.target.value))}
       className="form-input"
      />
      <select 
      onChange={(e) => setStatus(Boolean(e.target.value))}>
        <option>Choose the status</option>
        <option value={1}>Completed</option>
        <option value={0}>Not completed</option>
         </select>
      <button type='submit' className="form-button">Обновить</button>
    </form>
    </>
  );
}

export default WishUpdateForm;