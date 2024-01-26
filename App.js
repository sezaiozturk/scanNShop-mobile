import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import {NavigationContainer} from '@react-navigation/native';
import Router from './src/router';
import {View} from 'react-native';

const App = () => {
    return (
        <View style={{flex: 1, position: 'relative'}}>
            <Router />
        </View>
    );
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
