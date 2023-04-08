import { createSlice, nanoid } from "@reduxjs/toolkit";

const persistedTodos = localStorage.getItem('todos');

const initialState = {
  todos: JSON.parse(localStorage.getItem("todos")) || [],
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
      localStorage.setItem("todos", JSON.stringify(state.todos)); // Save state to localStorage
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      localStorage.setItem("todos", JSON.stringify(state.todos)); // Save state to localStorage
    },
    completeTodo: (state, action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = true;
        localStorage.setItem("todos", JSON.stringify(state.todos)); // Save state to localStorage
      }
    },
    unMark: (state, action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = false;
        localStorage.setItem("todos", JSON.stringify(state.todos)); // Save state to localStorage
      }
    },
    editTodo: (state, action) => {
      const { id, title } = action.payload;
      const todo = state.todos.find((todo) => todo.id === id);
      if (todo) {
        todo.title = title;
        localStorage.setItem("todos", JSON.stringify(state.todos)); // Save state to localStorage
      }
    },
  },
});

export const { addTodo, removeTodo, completeTodo, unMark, editTodo } =
  todoSlice.actions;

export default todoSlice.reducer;
