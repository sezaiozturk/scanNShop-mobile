import {
    StyleSheet
} from 'react-native';

const style = ({
    colors
}) => {
    return StyleSheet.create({
        topBar: {
            backgroundColor: colors.secondary,
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            padding: 5,
        },
        title: {
            fontFamily: 'Alegreya-SemiBold',
            color: colors.primary,
            fontSize: 18,
        },
        leftContainer: {
            flexDirection: 'row',
            width: '21%',
        },
        rightContainer: {
            justifyContent: 'flex-end',
            flexDirection: 'row',
            width: '21%',
        },
        button: {
            padding: 7,
        },
    });
};
export default style;
