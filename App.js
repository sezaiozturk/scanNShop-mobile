import {SafeAreaView, Text, View} from 'react-native';

const App = () => {
    return (
        <SafeAreaView
            style={{
                backgroundColor: 'green',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
            <Text
                style={{
                    fontSize: 40,
                    color: 'white',
                    textAlign: 'center',
                }}>
                ScanNShop Mobil Uygulaması
            </Text>
        </SafeAreaView>
    );
};

export default App;
