import React, { useEffect, useState } from "react";
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
  const dispatch = useDispatch();

  const todos = useSelector((state) => state.todos.todos);

  const [inputTask, setInputTask] = useState("");

  const [editID, setEditID] = useState("");

  const handleInputTask = (event) => {
    setInputTask(event.target.value);
    // setNewTitle("");
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
      // setNewTitle("");
      setEditID(0);
    }
  };

  const handleCancelClick = () => {
    setEditID(0);
  };

  const handleProfileLink = (event) => {
    window.open(
      "https://www.linkedin.com/in/pankajkb/",
      "_blank",
      "noopener,noreferrer"
    );
  };

  // Actual Render

  return (
    <div
      className="bg-[#0D1449] h-screen flex flex-col justify-center 
    items-center text-[#0A120B]"
    >
      {/* Todo Lines area */}
      <div className="bg-[#0C9FFF] bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-5 border border-gray-100 flex flex-col gap-[18px] absolute top-[10%] border-none h-[590px] w-[400px] pt-[2%] pb-[20px] max-h-[590px] scrollbar-none overflow-y-scroll rounded-[20px]">
        {/* <div className="h-full w-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10 border border-gray-100"> */}
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="flex flex-col gap-[12px] justify-center items-center"
          >
            {editID !== todo.id ? (
              <>
                {/* Todo Title */}
                <h1
                  className={`${
                    todo.completed
                      ? "bg-[#88FFD4] line-through"
                      : "bg-[#FF4891]"
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
                        <MdRemoveDone className="text-[#ffffff] w-[25px] h-[25px] rounded-[100%]" />
                      ) : (
                        <MdCheck className="text-[#ffffff] w-[25px] h-[25px] rounded-[100%]" />
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
                        className="text-[#ffffff] w-[25px] 
                  h-[25px] rounded-[100%]"
                      />
                    </button>
                  </Tooltip>

                  {/* Task remove button */}
                  <Tooltip
                    title="Delete Task"
                    position="bottom"
                    trigger="mouseenter"
                  >
                    <button onClick={() => dispatch(removeTodo(todo.id))}>
                      <MdDelete className="text-[#ffffff] w-[25px] h-[25px] rounded-[100%]" />
                    </button>
                  </Tooltip>
                </div>
              </>
            ) : (
              <form
                onSubmit={(event) => handleEditTodo(event, todo.id)}
                className="flex flex-col gap-[12px] h-[100%] w-[250px]"
              >
                <textarea
                  className="bg-[#0C9FFF] text-[#0A120B] text-[18px] resize-none overflow-hidden rounded-[10px] h-[px] w-[100%] font-extrabold p-[1%] focus:outline-none"
                  type="text"
                  name="editedTask"
                  wrap="soft"
                  rows={Math.ceil(todo.title.length / 22)}
                  cols="5"
                  defaultValue={todo.title}
                />
                <div className="flex flex-row justify-center items-center gap-[12px] ml-[90%]">
                  <button type="submit">
                    <FaPlus className="text-[#ffffff] w-[23px] h-[23px] rounded-[100%]" />
                  </button>
                  <button onClick={handleCancelClick}>
                    <MdOutlineCancel className="text-[#ffffff] w-[25px] h-[25px] rounded-[100%]" />
                  </button>
                </div>
              </form>
            )}
          </div>
        ))}
      </div>

      {/* Task input */}
      <div className="flex flex-col gap-[20px] justify-center items-center absolute bottom-[12%] h-[100px] pt-[50px] pl-[10px] pr-[10px] rounded-[20px] bg-[#0C9FFF] bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10 border-none">
        <Tooltip title="Enter task here" position="bottom" trigger="mouseenter">
          <input
            className="outline-none text-[#0A120B] text-[18px] text-center items-center font-[600] rounded-[15px] h-[50px] w-[300px] bg-[#007BEE] border-none placeholder:text-[#1f1f1f]"
            type="text"
            placeholder="Enter Task"
            value={inputTask}
            onChange={handleInputTask}
          />
        </Tooltip>

        {/* Add task button */}
        <Tooltip title="Add task" position="bottom" trigger="mouseenter">
          <button onClick={handleAddTodo} className="focus:outline-none">
            <FaPlus className="text-[#ffffff] h-[100%] w-[200%] rounded-[100%] border-[#ffffff] p-[2px] border-[2px]" />
          </button>
        </Tooltip>
      </div>
      <h1
        onClick={handleProfileLink}
        className="text-[#ffffff] text-[18px] absolute bottom-[2%] hover:cursor-pointer"
      >
        Made with ❤️ by Pankaj
      </h1>
    </div>
  );
}

export default Todos;
