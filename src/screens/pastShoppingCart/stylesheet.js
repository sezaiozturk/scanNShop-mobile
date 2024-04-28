import {
    StyleSheet
} from 'react-native';

const style = ({
    colors
}) => {
    return StyleSheet.create({
        container: {
            backgroundColor: colors.secondary,
            flex: 1,
        },
        invoiceContainer: {
            backgroundColor: colors.secondary,
            borderColor: colors.boxShadow,
            paddingHorizontal: 10,
            marginHorizontal: 10,
            paddingVertical: 10,
            borderRadius: 10,
            borderWidth: 1,
        },
        title: {
            fontFamily: 'Alegreya-ExtraBold',
            color: colors.primary,
            marginBottom: 5,
            fontSize: 16,
        },
        row: {
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
        },
        text: {
            fontFamily: 'Alegreya-Bold',
            color: colors.text,
            marginBottom: 5,
            fontSize: 16,
        },
    });
};
export default style;
