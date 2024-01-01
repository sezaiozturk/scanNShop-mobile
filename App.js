import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import {NavigationContainer} from '@react-navigation/native';
import Router from './src/router';

const App = () => {
    return <Router />;
};
const ContextApi = () => {
    return (
        <NavigationContainer>
            <Provider store={store}>
                <App />
            </Provider>
        </NavigationContainer>
    );
};

export default ContextApi;
