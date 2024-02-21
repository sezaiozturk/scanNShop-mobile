import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    isAuth: false,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        changeAuth: state => {
            state.isAuth = !state.isAuth;
            console.log(state.isAuth);
        },
    },
});
export const {changeAuth} = authSlice.actions;

export default authSlice.reducer;
