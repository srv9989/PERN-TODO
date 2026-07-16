import React, { Fragment } from "react";
import ListTodo from "./components/ListTodo.js";

import InputTodo from './components/InputTodo.js'

function App() {
  return <Fragment> 
    <div className="container">
      <InputTodo />
      <ListTodo />
    </div>
  </Fragment>
}

export default App;