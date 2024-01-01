import {configureStore} from '@reduxjs/toolkit';
import themeSlice from './themeSlice';
import localeSlice from './localeSlice';

export const store = configureStore({
    reducer: {
        theme: themeSlice,
        locale: localeSlice,
    },
});
