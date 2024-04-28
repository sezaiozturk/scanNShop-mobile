import {
    StyleSheet
} from 'react-native';

const style = ({
    colors
}) => {
    return StyleSheet.create({
        container: {
            flexDirection: 'row',
            alignItems: 'center',
            textAlign: 'center',
            borderRadius: 10,
            padding: 10,
            margin: 5,
            gap: 15,
        },
        leftContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 15,
        },
        photo: {
            width: 70,
            height: 70,
            borderRadius: 10,
        },
        rightContainer: {
            gap: 10,
            flex: 1,
        },
        top: {
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
        },
        name: {
            fontFamily: 'Alegreya-Medium',
            color: colors.black,
            fontSize: 16,
        },
        button: {
            padding: 5,
        },
        count: {
            fontFamily: 'Alegreya-Medium',
            color: colors.black,
            fontSize: 18,
        },
        bottom: {
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
        },
        price: {
            fontFamily: 'Alegreya-Bold',
            color: colors.primary,
            fontSize: 18,
        },
        panel: {
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            width: '33%',
        },
    });
};
export default style;
