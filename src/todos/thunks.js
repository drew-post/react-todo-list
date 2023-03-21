import { createTodo, loadTodosInProgrees, loadTodosSuccess, loadTodosError, removeTodo, completeTodo } from "./actions";

export const loadTodos = () => async (dispatch, getState) => {
    try {
        dispatch(loadTodosInProgrees());
        const response = await fetch('http://localhost:8080/todos');
        const todos = await response.json();

        dispatch(loadTodosSuccess(todos));
    } catch (e) {
        dispatch(loadTodosError());
        dispatch(displayAlert(e));
    }
};

export const addTodoRequest = text => async (dispatch, getState) => {
    try {
        const body = JSON.stringify({ text });
        const response = await fetch('http://localhost:8080/todos/', {
            headers: {
                'Content-Type': 'application/json'
            }, 
            method: 'post', 
            body
        });
        const todo = await response.json();

        dispatch(createTodo(todo));
    } catch (e) {
        dispatch(displayAlert(e));
    }
};

export const removeTodoRequest = id => async (dispatch, getState) => {
    try {
        const response = await fetch(`http://localhost:8080/todos/${id}`, {
            method: 'delete'
        });
        const removedTodo = await response.json();

        dispatch(removeTodo(removedTodo));
    } catch (e) {
        dispatch(displayAlert(e));
    }
};

export const completeTodoRequest = id => async (dispatch, getState) => {
    try {
        const response = await fetch(`http://localhost:8080/todos/${id}/completed`, {
            method: 'post'
        });
        const completedTodo = await response.json();

        dispatch(completeTodo(completedTodo));
    } catch (e) {
        dispatch(displayAlert(e));
    }
};

export const displayAlert = text => () => {
    alert(text);
}