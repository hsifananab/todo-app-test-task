import React from 'react';
import NewTodo from './components/NewTodo/NewTodo';
import TodoList from './components/TodoList/TodoList';
import './App.scss';

const App = () => {
  return (
    <>
      <div className="App">
        <div className="container">
          <h1>todo app</h1>
          <NewTodo />
          <TodoList />
        </div>
      </div>
    </>
  );
};

export default App;
