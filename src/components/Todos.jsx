import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  removeTodo,
  addTodo,
  completeTodo,
  unMark,
} from "../features/todoSlice";

import "react-tippy/dist/tippy.css";

import { Tooltip } from "react-tippy";

// Icons
import { FaPlus } from "react-icons/fa";

import { MdDelete, MdModeEditOutline, MdCheck, MdRemoveDone } from "react-icons/md";

// Actual App
function Todos() {
  const todos = useSelector((state) => state.todos.todos);
  const dispatch = useDispatch();
  const [inputTask, setInputTask] = useState("");

  const handleInputTask = (event) => {
    setInputTask(event.target.value);
  };

  const handleAddTodo = () => {
    if (inputTask !== "") {
      dispatch(addTodo(inputTask));
    }
    setInputTask("");
  };

  const handleCompleteTodo = (id) => {
    dispatch(completeTodo(id));
  };

  const handleUnMarkTodo = (id) => {
    dispatch(unMark(id));
  };

  return (
    <div className="h-screen font-mono flex flex-col justify-center items-center bg-[#01011F] text-[#0A120B] gap-[30px] border-[3px] border-[#5E8BFF]">
      {/* Todo Lines area */}
      <div className="flex flex-col gap-[8px]">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="flex gap-[12px] justify-center items-center"
          >
            {/* Todo Title */}
            <h1
              className={`${
                todo.completed
                  ? "bg-[#A8D672] line-through italic"
                  : "bg-[#F7D44C]"
              } text-[#0A120B] text-[18px] flex items-center justify-center rounded-[15px] h-[100px] w-[300px] font-extrabold pt-[10px]`}
            >
              {todo.title}
            </h1>
            <div className="flex gap-[12px] justify-center items-center">
             {/* Mark Complete button */}
             <Tooltip
              title={todo.completed ? "Mark as incomplete" : "Mark as complete"}
              position="bottom"
              trigger="mouseenter"
            >
              <button
                onClick={() => {
                  if (todo.completed) {
                    handleUnMarkTodo(todo.id);
                  } else {
                    handleCompleteTodo(todo.id);
                  }
                }}
              > 
              {todo.completed ? 
              <MdRemoveDone className="bg-[#F7D44C] text-[#ffffff] w-[22px] h-[25px] rounded-[100%] p-[2px]" /> 
              : <MdCheck className="bg-[#A8D672] text-[#ffffff] w-[22px] h-[25px] rounded-[100%] p-[2px]" />}
              </button>
            </Tooltip>

            {/* Task remove button */}
            <Tooltip
              title="Remove task from list"
              position="bottom"
              trigger="mouseenter"
            >
              <button onClick={() => dispatch(removeTodo(todo.id))}>
                <MdDelete className="text-[#ffffff] bg-[#EA7A53] w-[25px] h-[25px] rounded-[100%] p-[2px]" />
              </button>
            </Tooltip>

            {/* Edit Task Button */}

            <Tooltip title="Edit Task" position="bottom" trigger="mouseenter">
              <button onClick={() => dispatch(removeTodo(todo.id))}>
                <MdModeEditOutline className="text-[#ffffff] bg-[#99B7DD] w-[25px] h-[25px] rounded-[100%] p-[2px]" />
              </button>
            </Tooltip>
            </div>
           
          </div>
        ))}
      </div>
    {/* Task input */}
      <div className="flex gap-[20px] justify-center items-center">
        <Tooltip title="Enter task here" position="bottom" trigger="mouseenter">
          <input
            className="outline-none text-[#0A120B] text-[18px] text-center items-center font-[600] rounded-[15px] h-[50px] w-[300px] bg-[#ffffff] border-none"
            type="text"
            placeholder="Enter Task"
            value={inputTask}
            onChange={handleInputTask}
          />
        </Tooltip>
        {/* Add task button */}
        <Tooltip title="Add task" position="bottom" trigger="mouseenter">
          <button onClick={handleAddTodo}>
            <FaPlus className="text-[#ffffff] w-[80px] h-[80px] rounded-[100%] bg-[#5E8BFF] p-[20px]" />
          </button>
        </Tooltip>
      </div>
    </div>
  );
}

export default Todos;
