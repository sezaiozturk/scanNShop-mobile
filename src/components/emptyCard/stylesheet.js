import {
    StyleSheet
} from 'react-native';

const style = ({
    colors
}) => {
    return StyleSheet.create({
        emptyShoppingCard: {
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
