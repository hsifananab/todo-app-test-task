import { configureStore, createSlice, nanoid } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: '@@todos',
  initialState: [
    {
      title: 'Celebrate the New Year!',
      desc: '🎉🎉🎉',
      expiration: '2022-01-01',
      id: 0,
      completed: false,
    },
    {
      title: 'Create Todo App',
      desc: 'create todo-app',
      expiration: '2022-11-24',
      id: 1,
      completed: false,
    },
    {
      title: 'Add some styles',
      desc: 'use scss',
      expiration: '2022-11-24',
      id: 2,
      completed: false,
    },
  ],
  reducers: {
    addTodo: {
      reducer: (state, action) => {
        if (!action.payload.title) return;
        state.push(action.payload);
      },
      prepare: (title, desc, expiration) => {
        return {
          payload: {
            title,
            desc,
            expiration,
            id: nanoid(),
            completed: false,
          },
        };
      },
    },
    removeTodo: (state, action) =>
      state.filter(todo => todo.id !== action.payload),
    toggleTodo: (state, action) => {
      const id = action.payload;
      const todo = state.find(todo => todo.id === id);
      todo.completed = !todo.completed;
    },
    editTodo: {
      reducer: (state, action) => {
        const { id, newValue, inputId } = action.payload;
        const todo = state.find(todo => todo.id === id);
        inputId === 'title' ? (todo.title = newValue) : (todo.desc = newValue);
      },
      prepare: (id, newValue, inputId) => ({
        payload: { id, newValue, inputId },
      }),
    },
  },
});

export const { addTodo, removeTodo, toggleTodo, editTodo } = todoSlice.actions;

export const store = configureStore({
  reducer: todoSlice.reducer,
});
