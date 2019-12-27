// non-working, psuedo-javascript, TODO app
// This file show the essential logic of the TODO app.

let list = [
  { id: 1, text: "clean the house" },
  { id: 2, text: "buy milk" }
];

const _addItem    = (list, item) => [...list, { ...item, id: uniqueId() }]
const _deleteItem = (list, item) => list.filter(todo => todo.id !== item.id)

const useState   = ()     => list // React hook stub
const deleteItem = (item) => null // dispatcher stub
const addItem    = (item) => null // dispatcher stub

const ToDoItem = ({ item }) =>
  <li>
    {item.text}
    <button onClick={ deleteItem }/>
  </li>

const ToDo = () =>
  <div>
    <ul>
      {useList().map(item => (
        <ToDoItem key={ item.id } item={ item } />
      ))}
    </ul>

    <input type="text"/>
    <button onClick={ addItem }/>
  </div>