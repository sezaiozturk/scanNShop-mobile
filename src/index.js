import {Provider} from 'react-redux';
import {store} from './redux/store';
import {MD3LightTheme as DefaultTheme, PaperProvider} from 'react-native-paper';
import Router from './router';
import {View} from 'react-native';
import {Company, Product} from './models/index';

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#318B11',
    },
};

const App = () => {
    return (
        <Provider store={store}>
            <PaperProvider theme={theme}>
                <Router />
            </PaperProvider>
        </Provider>
    );
};

export default App;
