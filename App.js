import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import {NavigationContainer} from '@react-navigation/native';
import Router from './src/router';
import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useColors} from './src/utils/settings';
import {FlatButton} from './src/components';

const App = () => {
    const colors = useColors();

    return (
        <View style={{flex: 1, position: 'relative'}}>
            <Router />
            <FlatButton />
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
