import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  removeTodo,
  completeTodo,
  unMark,
  editTodo
} from "./todoSlice";

function App() {
  const [todoInput, setTodoInput] = useState("");
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todo.todos);

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (todoInput) {
      dispatch(addTodo(todoInput));
      setTodoInput("");
    }
  };

  const handleRemoveTodo = (id) => {
    dispatch(removeTodo(id));
  };

  const handleCompleteTodo = (id) => {
    dispatch(completeTodo(id));
  };

  const handleUnMark = (id) => {
    dispatch(unMark(id));
  };

  const handleEditTodo = (id, title) => {
    setEditId(id);
    setEditTitle(title);
  };

  const handleSaveTodo = () => {
    dispatch(editTodo({
      id: editId,
      title: editTitle
    }));
    setEditId(null);
    setEditTitle("");
  };

  return (
    <div className="App">
      <h1>{editId === null ? "Todo List" : <input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />}</h1>
      {todos.map((todo) => (
        <div key={todo.id} className="todo">
          {editId !== todo.id ? (
            <>
              <div className={todo.completed ? "completed" : ""}>
                {todo.title}
              </div>
              <div className="buttons">
                {todo.completed ? (
                  <button onClick={() => handleUnMark(todo.id)}>Unmark</button>
                ) : (
                  <button onClick={() => handleCompleteTodo(todo.id)}>Mark</button>
                )}
                <button onClick={() => handleEditTodo(todo.id, todo.title)}>Edit</button>
                <button onClick={() => handleRemoveTodo(todo.id)}>Remove</button>
              </div>
            </>
          ) : (
            <div className="buttons">
              <button onClick={handleSaveTodo}>Save</button>
            </div>
          )}
        </div>
      ))}
      <form onSubmit={handleAddTodo}>
        <input
          type="text"
          placeholder="Add Todo"
          value={todoInput}
          onChange={(e) => setTodoInput(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default App;
