import {StyleSheet} from 'react-native';

const style = ({colors}) => {
    return StyleSheet.create({
        container: {
            position: 'absolute',
            bottom: '5%',
            right: '10%',
        },
        button: {
            backgroundColor: colors.white,
            borderColor: colors.primary,
            position: 'relative',
            borderRadius: 100,
            borderWidth: 2,
            padding: 15,
        },
        counterContainer: {
            backgroundColor: colors.primary,
            justifyContent: 'center',
            position: 'absolute',
            alignItems: 'center',
            borderRadius: 100,
            right: '-20%',
            top: '-30%',
            height: 25,
            width: 25,
        },
        counter: {
            fontFamily: 'Alegreya-SemiBold',
            color: colors.white,
        },
    });
};
export default style;
