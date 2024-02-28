import {StyleSheet} from 'react-native';

const style = ({colors}) => {
    return StyleSheet.create({
        container: {
            backgroundColor: colors.secondary,
            flex: 1,
        },
        content: {
            justifyContent: 'space-evenly',
        },
        totalContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 20,
            paddingVertical: 10,
        },
        title: {
            color: colors.primary,
            fontFamily: 'Alegreya-Bold',
            fontSize: 20,
        },
        innerContainer: {
            flexDirection: 'row',
            alignItems: 'flex-end',
            gap: 10,
        },
        total: {
            color: colors.primary,
            fontFamily: 'Alegreya-Bold',
            fontSize: 30,
        },
        currency: {
            color: colors.primary,
            fontFamily: 'Alegreya-Bold',
            fontSize: 20,
            marginBottom: 4,
        },
        emptyShoppingCart: {
            alignItems: 'center',
            paddingVertical: 100,
        },
        empty: {
            fontFamily: 'Alegreya-Medium',
            color: colors.primary,
            marginTop: 20,
            fontSize: 20,
        },
    });
};
export default style;
