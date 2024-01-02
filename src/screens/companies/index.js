import {SafeAreaView, Text} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Companies = () => {
    return (
        <SafeAreaView>
            <Text
                style={{
                    fontSize: 30,
                    fontFamily: 'Alegreya-Italic',
                    color: 'black',
                }}>
                Companies Screen
            </Text>
            <MaterialCommunityIcons
                name="airplane"
                style={{fontSize: 40, color: 'green'}}
            />
        </SafeAreaView>
    );
};
export default Companies;
