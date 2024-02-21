import {configureStore} from '@reduxjs/toolkit';
import themeSlice from './themeSlice';
import localeSlice from './localeSlice';
import shopSlice from './shopSlice';
import authSlice from './authSlice';

export const store = configureStore({
    reducer: {
        theme: themeSlice,
        locale: localeSlice,
        shop: shopSlice,
        auth: authSlice,
    },
});
