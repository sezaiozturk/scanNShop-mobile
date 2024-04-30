import {
    StyleSheet
} from 'react-native';

const style = ({
    colors
}) => {
    return StyleSheet.create({
        emptyShoppingCard: {
            justifyContent: "center",
            alignItems: 'center',
            height: 350,
        },
        empty: {
            fontFamily: 'Alegreya-Medium',
            color: colors.primary,
            marginTop: 20,
            fontSize: 18,
        },
    });
};
export default style;
