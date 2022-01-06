import { configureStore } from '@reduxjs/toolkit';
import { noteReducer } from '../slice/noteSlice';
import { uiReducer } from '../slice/uiSlice';
import { userReducer } from '../slice/usersSlice';

// const reducers = combineReducers({
//   auth: authReducer,
// });

// const composeEnhancers =
//   (typeof window !== 'undefined' &&
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
//   compose;

export const store = configureStore({
  reducer: {
    user: userReducer,
    ui: uiReducer,
    note: noteReducer,
  },
});
