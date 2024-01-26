import {useSelector} from 'react-redux';
import {change} from '../redux/themeSlice';
import {changeLocale} from '../redux/localeSlice';
import {store} from '../redux/store';
import {addProduct, total} from '../redux/shopSlice';

export const useColors = () => useSelector(({theme}) => theme.colors);
export const useLanguage = () => useSelector(({locale}) => locale.locale);
export const useActiveLanguage = () =>
    useSelector(({locale}) => locale.activeLocale);

export const useShoppingCart = () => useSelector(({shop}) => shop.shoppingCart);

export const changeThemes = () => store.dispatch(change());
export const changeLocales = () => store.dispatch(changeLocale());

export const addProducts = product => store.dispatch(addProduct(product));
export const totals = () => store.dispatch(total());
export const useBasketTotal = () => useSelector(({shop}) => shop.basketTotal);
