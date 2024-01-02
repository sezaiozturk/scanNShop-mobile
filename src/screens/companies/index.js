import {SafeAreaView, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button} from '../../components';

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
            <Icon name="airplane" style={{fontSize: 40, color: 'green'}} />
            <Button title={'button'} spreadBehavior="alignSelf" />
            <Button
                title={'button'}
                spreadBehavior="alignSelf"
                variant="outlined"
            />
            <Button
                title={'button'}
                spreadBehavior="alignSelf"
                variant="ghost"
            />
        </SafeAreaView>
    );
};
export default Companies;
