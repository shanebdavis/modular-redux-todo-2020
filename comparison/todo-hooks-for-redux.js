// 85 lines of code after removing comments & inter-file spacing
//**********************************************
// src/components/ToDo.js
//**********************************************
import React, { useState } from "react";
import ReduxLogo from "../assets/redux.png";
import { ToDoItem } from "./ToDoItem";
import "./ToDo.css";
import { addItem, useList } from "../redux/list";

export const ToDo = () => {
  const list = useList();
  const [text, setText] = useState("");

  const createNewToDoItem = () => {
    if (!text) return alert("Please enter a text!");
    addItem({ text });
    setText("");
  };

  return (
    <div className="ToDo">
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
  );
};

//**********************************************
// src/components/ToDoItem.js
//**********************************************
import React from "react";
import "./ToDoItem.css";
import { deleteItem } from "../redux/list";

export const ToDoItem = ({ item }) =>
  <div className="ToDoItem">
    <p className="ToDoItem-Text">{item.text}</p>
    <button className="ToDoItem-Delete" onClick={() => deleteItem(item)}>
      -
    </button>
  </div>

//**********************************************
// src/redux/list.js
//**********************************************
import { useRedux } from "hooks-for-redux";

const getUniqueId = list =>
  list.length > 0 ? Math.max(...list.map(t => t.id)) + 1 : 1;

export const [useList, { addItem, deleteItem }] = useRedux(
  "list",
  [
    { id: 1, text: "clean the house" },
    { id: 2, text: "buy milk" }
  ],
  {
    addItem: (list, item) => [...list, { ...item, id: getUniqueId(list) }],
    deleteItem: (list, item) => list.filter(todo => todo.id !== item.id)
  }
);

//**********************************************
// src/App.js
//**********************************************
import React from "react";
import { ToDo } from "./components/ToDo";
import "./App.css";

export const App = () => <ToDo />;

//**********************************************
// src/index.js
//**********************************************
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "hooks-for-redux";
import { App } from "./App";

ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById("root")
);
