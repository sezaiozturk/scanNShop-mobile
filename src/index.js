import {Provider} from 'react-redux';
import {store} from './redux/store';
import {MD3LightTheme as DefaultTheme, PaperProvider} from 'react-native-paper';
import Router from './router';

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#318B11',
    },
};

const App = () => {
    return (
        <PaperProvider theme={theme}>
            <Router />
        </PaperProvider>
    );
};

const ContextApi = () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
};

export default ContextApi;
