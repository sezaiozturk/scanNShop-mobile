import {createSlice} from '@reduxjs/toolkit';
import {useAuthUser, useToken} from '../../utils/settings';

const initialState = {
    authUser: '',
    token: '',
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthUser: (state, action) => {
            state.authUser = {
                _id: action.payload._id,
                name: action.payload.name,
                email: action.payload.email,
            };
            state.token = action.payload.token;
        },
    },
});
export const {setAuthUser} = authSlice.actions;

export default authSlice.reducer;
