import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  removeTodo,
  addTodo,
  completeTodo,
  unMark,
  editTodo,
} from "../features/todoSlice";

import "react-tippy/dist/tippy.css";

import { Tooltip } from "react-tippy";

// Icons
import { FaPlus } from "react-icons/fa";

import {
  MdDelete,
  MdModeEditOutline,
  MdCheck,
  MdRemoveDone,
  MdOutlineCancel,
} from "react-icons/md";
import { nanoid } from "@reduxjs/toolkit";

// Actual App
function Todos() {
  const todos = useSelector((state) => state.todos.todos);
  const dispatch = useDispatch();
  const [inputTask, setInputTask] = useState("");
  const [editID, setEditID] = useState("");
  const [newTitle, setNewTitle] = useState("");

  const handleInputTask = (event) => {
    setInputTask(event.target.value);
    setNewTitle("");
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
  const handleEditTodo = (event, id) => {
    event.preventDefault();
    const newTitle = event.target.elements.editedTask.value.trim();
    if (newTitle !== "") {
      dispatch(editTodo({ id: id, title: newTitle }));
      setNewTitle("");
      setEditID(0);
    }
  };

  const handleCancelClick = () => {
    setEditID(0);
  };

  // Actual Render

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-[#5B6270] text-[#0A120B]">
      {/* Todo Lines area */}
      <div
        className="bg-[#313642] flex flex-col gap-[18px] absolute top-[10%] border-none h-[590px] w-[400px] pt-[2%] pb-[20px] max-h-[590px] scrollbar-none overflow-y-scroll rounded-[20px]"
      >
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="flex flex-col gap-[12px] justify-center items-center"
          >
            {editID !== todo.id ? (
              <>
                {/* Todo Title */}
                <h1
                  className={`${todo.completed
                    ? "bg-[#63B4FF] line-through"
                    : "bg-[#F8AA4C]"
                    } text-[#0A120B] text-[18px] rounded-[10px] h-[80%] w-[250px] font-extrabold p-[1%] text-center focus:outline-none`}
                >
                  {todo.title}
                </h1>

                <div className="flex flex-row gap-[12px] ml-[50%]">
                  {/* Mark Complete button */}
                  <Tooltip
                    title={
                      todo.completed ? "Mark as incomplete" : "Mark as complete"
                    }
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
                      {todo.completed ? (
                        <MdRemoveDone className="bg-[#F7D44C] text-[#ffffff] w-[25px] h-[25px] rounded-[100%] p-[2px]" />
                      ) : (
                        <MdCheck className="bg-[#A8D672] text-[#ffffff] w-[25px] h-[25px] rounded-[100%] p-[2px]" />
                      )}
                    </button>
                  </Tooltip>

                  {/* Task Edit Button */}

                  <Tooltip
                    title="Edit Task"
                    position="bottom"
                    trigger="mouseenter"
                  >
                    <button onClick={() => setEditID(todo.id)}>
                      <MdModeEditOutline
                        className="text-[#ffffff] bg-[#99B7DD] w-[25px] 
                  h-[25px] rounded-[100%] p-[2px]"
                      />
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
                </div>
              </>
            ) : (
              <form onSubmit={(event) => handleEditTodo(event, todo.id)} 
              className="flex flex-col gap-[12px] h-[100%] w-[250px]">
                <input
                  className="bg-[#FF7360] text-[#0A120B] text-[18px] rounded-[10px] h-[70px] w-[100%] font-extrabold p-[1%] focus:outline-none"
                  type="text"
                  name="editedTask"
                  defaultValue={todo.title}
                />
                <div className="flex flex-row justify-center items-center gap-[12px] ml-[90%]">
                  <button type="submit">
                    <FaPlus className="text-[#ffffff] bg-[#5E8BFF] w-[23px] h-[23px] rounded-[100%] p-[2px]" />
                  </button>
                  <button onClick={handleCancelClick}>
                  <MdOutlineCancel className="text-[#ffffff] bg-[#EA7A53] w-[25px] h-[25px] rounded-[100%] p-[2px]" />
                  </button>
                </div>
              </form>
            )}
          </div>
        ))}
      </div>

      {/* Task input */}
      <div className="flex flex-col gap-[20px] justify-center items-center absolute bottom-[12%] bg-[#313642] h-[100px] pt-[50px] pl-[10px] pr-[10px] rounded-[20px]">
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
            <FaPlus className="text-[#ffffff] h-[100%] w-[200%] rounded-[100%] bg-[#5E8BFF] p-[5px]" />
          </button>
        </Tooltip>
      </div>
    </div>
  );
}

export default Todos;
