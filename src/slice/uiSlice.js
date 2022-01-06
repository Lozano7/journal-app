import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isLoading: false,
    msgError: null,
  },
  reducers: {
    setError(state, action) {
      return {
        ...state,
        msgError: action.payload,
      };
    },
    removeError(state, action) {
      return {
        ...state,
        msgError: null,
      };
    },
    startLoading(state, action) {
      return {
        ...state,
        isLoading: true,
      };
    },
    finishLoading(state, action) {
      return {
        ...state,
        isLoading: false,
      };
    },
  },
});

export const { reducer: uiReducer, actions: uiActions } = uiSlice;
