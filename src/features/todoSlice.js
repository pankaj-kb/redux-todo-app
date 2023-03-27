import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  todos: [
    { id: nanoid(), title: "Make this app responsive", completed: true },
    {
      id: nanoid(),
      title: "Add local storage to this app",
      completed: false,
    },
  ], //Storing todos as in array
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const todo = {
        id: nanoid(),
        title: action.payload,
        completed: false,
      };
      state.todos.push(todo);
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    completeTodo: (state, action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = true;
      }
    },
    unMark: (state, action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = false;
      }
    },
    editTodo: (state, action) => {},
  },
});

export const { addTodo, removeTodo, completeTodo, unMark, editTodo } = todoSlice.actions;

export default todoSlice.reducer;
