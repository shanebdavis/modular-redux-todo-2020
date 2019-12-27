import { useState, useLayoutEffect } from "react"
import { store } from "./store"
const storeKey = "list"

// DEFINITION
const getUniqueId = list =>
  list.length > 0 ? Math.max(...list.map(t => t.id)) + 1 : 1;

const initialState = [
  { id: 1, text: "clean the house" },
  { id: 2, text: "buy milk" }
]

const reducers = {
  addItem: (list, item) => [...list, { ...item, id: getUniqueId(list) }],
  deleteItem: (list, item) => list.filter(todo => todo.id !== item.id)
}

store.injectReducer(storeKey, (state = initialState, { type, payload }) =>
  reducers[type] ? reducers[type](state, payload) : state
);

// HELPERS
const getList = () => store.getState()[storeKey]

const subscribeToList = f => {
  let lastList = getList();
  return store.subscribe(
    () => lastList !== getList() && f((lastList = getList()))
  );
}

// EXPORTS
export const useList = () => {
  const [list, setList] = useState(getList())
  useLayoutEffect(() => subscribeToList(setList))
  return list;
}

export const addItem = item => store.dispatch({ type: "addItem", payload: item })
export const deleteItem = item => store.dispatch({ type: "deleteItem", payload: item })