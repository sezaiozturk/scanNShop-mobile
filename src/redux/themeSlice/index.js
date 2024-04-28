import {
    createSlice
} from '@reduxjs/toolkit';
import themes from '../../themes';

let currentTheme = 'light';
const initialState = {
    colors: themes[1].colors,
    typography: themes[1].typography,
};

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        change: state => {
            state.colors =
                currentTheme === 'light' ? themes[0].colors : themes[1].colors;
            currentTheme = currentTheme === 'light' ? 'dark' : 'light';
        },
        changeTheme: (state, action) => {
            state.colors =
                action.payload === 'light'
                    ? themes[1].colors
                    : themes[0].colors;
        },
    },
});
export const {
    changeTheme,
    change
} = themeSlice.actions;

export default themeSlice.reducer;
