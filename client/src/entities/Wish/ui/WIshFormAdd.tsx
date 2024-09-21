import React, { useContext, useState } from'react';
import axiosInstance from '../../../services/axiosInstanse';
import { AppContext } from '../../../app/provider/AppContext';



function WishFormAdd(): JSX.Element {

 
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState(false)
  const [deadLine, setDeadline] = useState('')
  const [error, setError] = useState('')

  const {setWishes} = useContext(AppContext)
 
 


  
    const onHandleSubmit = async(e: React.FormEvent) => {
        try {
          setError(''); 
            e.preventDefault()
            if(title.trim() !== '' && description.trim() !== '' && deadLine.trim() !== '' && status){
                const response = await axiosInstance.post('/wishes', {  
                    title,
                    description,
                    status,
                    deadLine
                  })
                if(response.status === 201){
                    setWishes(prev => [...prev, response.data.wish])
                }
    

                setDescription('')
                setStatus(false)
                setDeadline('')
                setTitle('')
            } else {
              setError('Пожалуйста, заполните все поля.');
          }
           
    } catch (error) {
        console.log(error);
        
    }
       

    }

  return (
  <div className="book-form-container" >
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
        value={deadLine}
        placeholder='Dead line'
        onChange={(e) => setDeadline(e.target.value)}
       className="form-input"
      />
      <select 
      onChange={(e) => setStatus(Boolean(e.target.value))}>
        <option>Choose the status</option>
        <option value={1}>Completed</option>
        <option value={0}>Not completed</option>
         </select>
      <button type='submit' className="form-button">Добавить</button>
    </form>
    </div>
  );
}

export default WishFormAdd;      