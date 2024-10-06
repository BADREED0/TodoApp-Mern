import { useEffect, useState } from "react";
import Todo from "./components/Todo";
import { getAllTodo, addTodo, UpdateTodo, deleteTodoF } from './utils/handleApi';

function App() {
  const [todo, setTodo] = useState([]);
  const [text, setText] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [todoId, setTodoId] = useState('');

  // Fonction pour passer en mode mise à jour
  const updateMode = (task) => {
    setIsUpdating(true);
    setText(task.text); // Remplir l'input avec le texte de la tâche
    setTodoId(task._id); // Définir l'ID de la tâche à mettre à jour
  };

  const deleteTodo = (task) => {
    deleteTodoF(task._id, setTodo)
  }

  useEffect(() => {
    getAllTodo(setTodo);
  }, []);

  return (
    <div className="App">
      <div className="container">
        <h1>ToDo App</h1>
        <div className="top">
          <input
            type="text"
            placeholder={isUpdating ? "Update Todo..." : "Add Todo..."}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div
            className="add"
            onClick={
              isUpdating
                ? () => UpdateTodo(todoId, text, setText, setTodo, setIsUpdating)
                : () => addTodo(text, setText, setTodo)
            }
          >
            {isUpdating ? "Update" : "Add"}
          </div>
        </div>
        <div className="lists">
          {todo.map((task) => {
            return (
              <div key={task._id}>
                <Todo 
                  text={task.text} 
                  updateMode={() => updateMode(task) }
                  deleteTodo={() => deleteTodo(task) }
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
