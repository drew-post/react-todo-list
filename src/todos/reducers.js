import { COMPLETE_TODO, CREATE_TODO, REMOVE_TODO, LOAD_TODOS_IN_PROGRESS, LOAD_TODOS_SUCCESS, LOAD_TODOS_ERROR } from "./actions";

const intialState = { isLoading: false, data: [] };

export const todos = (state = intialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case CREATE_TODO: {
            const { todo } = payload;

            return {
                ...state,
                data: state.data.concat(todo)
            };
        }
        case REMOVE_TODO: {
            const { todo: todoToRemove } = payload;

            return {
                ...state,
                data: state.data.filter(todo => todo.id !== todoToRemove.id)
            }
        }
        case COMPLETE_TODO: { 
            const { todo: completedTodo } = payload;
            
            return {
                ...state, 
                data: state.data.map(item => item.id !== completedTodo.id ? item : completedTodo)
            };
        }
        case LOAD_TODOS_IN_PROGRESS: {
            return {
                ...state,
                isLoading: true
            };
        }
        case LOAD_TODOS_SUCCESS: {
            const { todos } = payload;
            return {
                ...state,
                data: todos,
                isLoading: false
            };
        }
        case LOAD_TODOS_ERROR: {
            return {
                ...state,
                isLoading: false
            };
        }
        default:
            return state;
    }
}