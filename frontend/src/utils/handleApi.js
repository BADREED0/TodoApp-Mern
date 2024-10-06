import axios, { Axios } from 'axios';

const API_URL = 'http://127.0.0.1:5000'

export const getAllTodo = (setTodo) => {
  axios.get(API_URL)
    .then( ({data}) => {
      setTodo(data)
      console.log('Data => ',data)
    })
    .catch( (error) => {
      console.log(error)
    })
}

export const addTodo = (text, setText, setTodo) => {
  axios.post(API_URL, {text: text})
    .then((data)=>{
      setText('')
      getAllTodo(setTodo)
      console.log('AddTodo response => ', data)
    }
    )
    .catch( (error) => {
      console.log(error)
    })
}

export const UpdateTodo = (todoId, text, setText, setTodo, setIsUpdating) => {
  axios.put(`${API_URL}/${todoId}`, { text: text }) // Inclure l'ID dans l'URL
    .then((data) => {
      setText('');
      getAllTodo(setTodo);  // Rafraîchir la liste des tâches après la mise à jour
      setIsUpdating(false); // Sortir du mode mise à jour
    })
    .catch((error) => {
      console.log(error);
    });
};

export const deleteTodoF = (id, setTodo) => {
  axios.delete(`${API_URL}/${id}`)
    .then( (data) => {
      getAllTodo(setTodo)
      console.log(data)
    })
    .catch( (error) => {
      console.log(error)
    })
}
