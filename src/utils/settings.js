import {useSelector} from 'react-redux';
import {change} from '../redux/themeSlice';
import {changeLocale} from '../redux/localeSlice';
import {store} from '../redux/store';

export const useColors = () => useSelector(({theme}) => theme.colors);
export const useLanguage = () => useSelector(({locale}) => locale.locale);
export const useActiveLanguage = () =>
    useSelector(({locale}) => locale.activeLocale);

export const changeThemes = () => store.dispatch(change());
export const changeLocales = () => store.dispatch(changeLocale());
