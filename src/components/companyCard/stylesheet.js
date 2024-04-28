import {
    StyleSheet
} from 'react-native';

const style = ({
    colors
}) => {
    return StyleSheet.create({
        container: {
            shadowOffset: {
                width: 2,
                height: 4
            },
            justifyContent: 'center',
            backgroundColor: 'white',
            alignItems: 'center',
            shadowColor: '#000',
            textAlign: 'center',
            shadowOpacity: 0.3,
            borderRadius: 10,
            shadowRadius: 2,
            width: '40%',
            height: 100,
        },
        title: {
            fontFamily: 'Alegreya-Medium',
            fontSize: 20,
        },
    });
};
export default style;
