import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addTodo, removeTodo, editTodo } from "../features/todoSlice";

function Todos() {
  const todos = useSelector((state) => state.todos.todos);
  const dispatch = useDispatch();
  const [newTodo, setNewTodo] = useState("");
  const [editing, setEditing] = useState(null);
  const [editText, setEditText] = useState("");

  const handleAddTodo = () => {
    dispatch(addTodo(newTodo));
    setNewTodo("");
  };

  const handleEdit = (id, text) => {
    setEditing(id);
    setEditText(text);
  };

  const handleSave = (id) => {
    dispatch(editTodo({ id, text: editText }));
    setEditing(null);
    setEditText("");
  };

  return (
    <div>
      {todos.map((todo) => (
        <div key={todo.id}>
          {editing === todo.id ? (
            <>
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
              <button onClick={() => handleSave(todo.id)}>Save</button>
            </>
          ) : (
            <>
              <p>{todo.text}</p>
              <button onClick={() => handleEdit(todo.id, todo.text)}>
                Edit
              </button>
              <button onClick={() => dispatch(removeTodo(todo.id))}>X</button>
            </>
          )}
        </div>
      ))}
      <div>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add new Task"
        />
        <button onClick={handleAddTodo}>Add Task</button>
      </div>
    </div>
  );
}

export default Todos;
