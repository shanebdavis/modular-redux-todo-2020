// 175 lines of code after removing comments & inter-file spacing
//**********************************************
// src/components/ToDo.js
//**********************************************
import React, { useState } from "react";
import ReduxLogo from "../assets/redux.png";
import ToDoItem from "./ToDoItem";
import "./ToDo.css";

const ToDo = props => {
  const { list, redux_add, redux_delete } = props;
  const [todo, setTodo] = useState("");

  const generateId = () => {
    if (list && list.length > 1) {
      return Math.max(...list.map(t => t.id)) + 1;
    } else {
      return 1;
    }
  };

  const createNewToDoItem = () => {
    //validate todo
    if (!todo) {
      return alert("Please enter a todo!");
    }
    const newId = generateId();
    redux_add({ id: newId, text: todo });
    setTodo("");
  };

  const handleKeyPress = e => {
    if (e.key === "Enter") {
      createNewToDoItem();
    }
  };

  const handleInput = e => {
    setTodo(e.target.value);
  };

  const deleteItem = todo => {
    redux_delete(todo.id);
  };

  return (
    <div className="ToDo">
      <img className="Logo" src={ReduxLogo} alt="logo" />
      <h1 className="ToDo-Header">Redux To Do</h1>
      <div className="ToDo-Container">
        <div className="ToDo-Content">
          {list &&
            list.map(item => {
              return (
                <ToDoItem key={item.id} item={item} deleteItem={deleteItem} />
              );
            })}
        </div>

        <div className="ToDoInput">
          <input
            type="text"
            value={todo}
            onChange={handleInput}
            onKeyPress={handleKeyPress}
          />
          <button className="ToDo-Add" onClick={createNewToDoItem}>
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToDo;

//**********************************************
// src/components/ToDoItem.js
//**********************************************
import React from "react";
import "./ToDoItem.css";

const ToDoItem = props => {
  const { item, deleteItem } = props;

  return (
    <div className="ToDoItem">
      <p className="ToDoItem-Text">{item.text}</p>
      <button className="ToDoItem-Delete" onClick={() => deleteItem(item)}>
        -
      </button>
    </div>
  );
};

export default ToDoItem;

//**********************************************
// src/redux/actions/appActions.js
//**********************************************
import { ADD_ITEM, DELETE_ITEM } from "../actionTypes";

const redux_add = todo => ({
  type: ADD_ITEM,
  payload: todo
});

const redux_delete = id => ({
  type: DELETE_ITEM,
  payload: id
});

const appActions = {
  redux_add,
  redux_delete
};

export default appActions;

//**********************************************
// src/redux/actionTypes/index.js
//**********************************************
export const ADD_ITEM = "ADD_ITEM";
export const DELETE_ITEM = "DELETE_ITEM";

//**********************************************
// src/redux/reducers/appReducer.js
//**********************************************
import { ADD_ITEM, DELETE_ITEM } from "../actionTypes";

const initialState = {
  list: [
    { id: 1, text: "clean the house" },
    { id: 2, text: "buy milk" }
  ]
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_ITEM:
      state = {
        list: [...state.list, action.payload]
      };
      return state;
    case DELETE_ITEM:
      state = {
        list: state.list.filter(todo => todo.id !== action.payload)
      };
      return state;
    default:
      return state;
  }
}

//**********************************************
// src/redux/reducers/index.js
//**********************************************
import { combineReducers } from "redux";
import appReducer from "./appReducer";

const rootReducer = combineReducers({
  appReducer
});

export default rootReducer;

//**********************************************
// src/redux/store/configureStore.js
//**********************************************
import { createStore } from "redux";
import rootReducer from "../reducers";

export default function configureStore() {
  return createStore(rootReducer);
}

//**********************************************
// src/App.js
//**********************************************
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import appActions from "./redux/actions/appActions";
import ToDo from "./components/ToDo";
import "./App.css";

const App = () => {
  const list = useSelector(store => store.appReducer.list);
  const dispatch = useDispatch();

  const redux_add = todo => dispatch(appActions.redux_add(todo));
  const redux_delete = id => dispatch(appActions.redux_delete(id));

  const props = { list, redux_add, redux_delete };
  return <ToDo {...props} />;
};

export default App;

//**********************************************
// src/index.js
//**********************************************
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./redux/store/configureStore";
import App from "./App";

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
