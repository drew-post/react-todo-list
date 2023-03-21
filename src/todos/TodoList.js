import React, { useEffect } from 'react';
import TodoListItem from './TodoListItem';
import './TodoList.css';
import NewTodoForm from './NewTodoForm';
import { connect } from 'react-redux';
import { loadTodos, removeTodoRequest, completeTodoRequest } from './thunks';
import { getTodos, getTodosLoading } from './selectors';

const TodoList = ({ todos = [], isLoading, onCompletePressed, onRemovePressed, startLoadingTodos }) => {
  useEffect(() => {
    startLoadingTodos();
  }, []);
  
  const loadingMessage = <div>Loading todos...</div>
  const content = (
    <div className="list-wrapper">
        <NewTodoForm  />
        {todos.map(todo => <TodoListItem key={todo.text} todo={todo} onCompletePressed={onCompletePressed} onRemovePressed={onRemovePressed}/>)}
    </div>
  );

  return isLoading ? loadingMessage : content;
};

const mapStateToProps = state => ({
    todos: getTodos(state),
    isLoading: getTodosLoading(state)
});

const mapDispatchToProps = dispatch => ({
    startLoadingTodos: () => dispatch(loadTodos()),
    onRemovePressed: id => dispatch(removeTodoRequest(id)),
    onCompletePressed: id => dispatch(completeTodoRequest(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);