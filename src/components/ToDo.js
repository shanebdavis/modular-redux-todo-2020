import React, { useState } from "react";
import { ToDoItem } from "./ToDoItem";
import { addItem, useList } from "../redux/list";
import ReduxLogo from "../assets/redux.png";
import "./ToDo.css";

export const ToDo = () => {
  const list = useList();
  const [text, setText] = useState("");

  const createNewToDoItem = () => {
    if (!text) return alert("Please enter text!");
    addItem({ text });
    setText("");
  };

  return <div className="ToDo">
    <img className="Logo" src={ReduxLogo} alt="logo" />
    <h1 className="ToDo-Header">Redux To Do</h1>
    <div className="ToDo-Container">
      <div className="ToDo-Content">
        {list.map(item => (
          <ToDoItem key={item.id} item={item} />
        ))}
      </div>

      <div className="ToDoInput">
        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyPress={e => e.key === "Enter" && createNewToDoItem()}
        />
        <button className="ToDo-Add" onClick={createNewToDoItem}>
          +
          </button>
      </div>
    </div>
  </div>
};
