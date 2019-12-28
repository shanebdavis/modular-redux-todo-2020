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
const getState = () => store.getState()[storeKey]

const subscribeToList = f => {
  let lastState = getState();
  return store.subscribe(
    () => lastState !== getState() && f((lastState = getState()))
  );
}

// EXPORTS
export const useList = () => {
  const [state, setState] = useState(getState())
  useLayoutEffect(() => subscribeToList(setState), [setState])
  return state;
}

export const addItem = item => store.dispatch({ type: "addItem", payload: item })
export const deleteItem = item => store.dispatch({ type: "deleteItem", payload: item })