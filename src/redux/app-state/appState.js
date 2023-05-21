import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


const initialState = {
    loading: false,
};

export const AppStateSlice = createSlice({
  name: 'appState',
  initialState,
  reducers: {
    setLoading(state,action) {
        return {
          ...state,
          loading: action.payload,
        }
      },
  },
});
export const { setLoading } = AppStateSlice.actions;
export default AppStateSlice.reducer;
