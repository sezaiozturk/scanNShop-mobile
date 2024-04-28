import {
    StyleSheet
} from 'react-native';

const style = ({
    colors
}) => {
    return StyleSheet.create({
        container: {
            justifyContent: 'space-between',
            backgroundColor: colors.primary,
            paddingHorizontal: 20,
            flexDirection: 'row',
            paddingVertical: 10,
        },
        title: {
            fontFamily: 'Alegreya-SemiBold',
            fontSize: 16,
            color: colors.white,
        },
    });
};
export default style;
