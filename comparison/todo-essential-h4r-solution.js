// working, though styleless, essential H4R ToDo app
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useRedux, Provider } from "hooks-for-redux";

const getUniqueId = list =>
  list.length > 0 ? Math.max(...list.map(t => t.id)) + 1 : 1;

const [useList, { addItem, deleteItem }] = useRedux("list", [], {
  addItem: (list, item) => [...list, { ...item, id: getUniqueId(list) }],
  deleteItem: (list, item) => list.filter(todo => todo.id !== item.id)
});

const ToDoItem = ({ item }) =>
  <li>
    {item.text}
    <button onClick={() => deleteItem(item)}>{" - "}</button>
  </li>

const ToDo = () => {
  const [text, setText] = useState("");

  const createNewToDoItem = () => {
    if (!text) return alert("Please enter a text!");
    addItem({ text });
    setText("");
  };

  return <div>
    <ul>
      {useList().map(item => (
        <ToDoItem key={item.id} item={item} />
      ))}
    </ul>

    <input
      type="text"
      value={text}
      onChange={e => setText(e.target.value)}
      onKeyPress={e => e.key === "Enter" && createNewToDoItem()}
    />
    <button onClick={createNewToDoItem}>{" + "}</button>
  </div>
};

ReactDOM.render(<Provider><ToDo /></Provider>, document.getElementById("root"));