import {Button, SafeAreaView, Text} from 'react-native';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import {
    changeLocales,
    changeThemes,
    useColors,
    useLanguage,
} from './src/utils/settings';

const App = () => {
    const colors = useColors();
    const language = useLanguage();
    return (
        <SafeAreaView
            style={{
                backgroundColor: colors.secondary,
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
            <Text
                style={{
                    fontSize: 40,
                    color: colors.text,
                    textAlign: 'center',
                }}>
                {language.language}
            </Text>
            <Button
                title="change theme"
                onPress={() => {
                    changeThemes();
                }}
            />
            <Button
                title="change language"
                onPress={() => {
                    changeLocales();
                }}
            />
        </SafeAreaView>
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
