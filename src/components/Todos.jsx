import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addTodo, removeTodo } from "../features/todoSlice";
import { nanoid } from "@reduxjs/toolkit";

function Todos() {
  const todos = useSelector((state) => state.todos.todos);
  const [inputTask, setInputTask] = useState("");
  const dispatch = useDispatch();
  return (
    <div>
      {todos.map((todo) => (
        <div key={todo.id}>
          <p>{todo.text}</p>
          <button onClick={() => dispatch(removeTodo(todo.id))}>
            Remove Todo
          </button>
        </div>
      ))}
      <div>
        <input
          type="text"
          placeholder="Enter Task"
          value={inputTask}
          onChange={(event) => setInputTask(event.target.value)}
        />
        <button
          onClick={() => {
            dispatch(
              addTodo({
                id: nanoid(),
                text: inputTask, 
                completed: false,
              })
            );
            setInputTask(""); 
          }}
        >
          Add ToDo
        </button>
      </div>
    </div>
  );
}

export default Todos;
