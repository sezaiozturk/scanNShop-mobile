import {
    StyleSheet
} from 'react-native';

const style = ({
    colors
}) => {
    return StyleSheet.create({
        container: {
            flex: 1,
        },
        camera: {
            flex: 1,
            position: 'relative',
        },
        panelContainer: {
            position: 'absolute',
            height: '100%',
            width: '100%',
        },
        topContainer: {
            paddingTop: Platform.OS == 'ios' ? 50 : 30,
            alignItems: 'center',
            width: '100%',
            flex: 1,
        },
        bottomContainer: {
            paddingBottom: 50,
            justifyContent: 'flex-end',
            alignItems: 'center',
            width: '100%',
            gap: 30,
            flex: 1,
        },
        titleContainer: {
            backgroundColor: colors.black,
            borderColor: colors.white,
            alignItems: 'center',
            borderRadius: 10,
            borderWidth: 1,
            width: '70%',
            padding: 20,
        },
        title: {
            fontFamily: 'Alegreya-Medium',
            color: colors.white,
            fontSize: 14,
        },
        product: {
            fontFamily: 'Alegreya-Medium',
            color: colors.white,
            fontSize: 20,
        },
        priceContainer: {
            alignItems: 'flex-end',
            flexDirection: 'row',
            gap: 10,
        },
        price: {
            fontFamily: 'Alegreya-Medium',
            color: colors.white,
            fontSize: 35,
        },
        currency: {
            fontFamily: 'Alegreya-Medium',
            color: colors.white,
            paddingBottom: 5,
            fontSize: 20,
        },
        close: {
            backgroundColor: colors.black,
            borderColor: colors.white,
            borderRadius: 50,
            borderWidth: 1,
            padding: 10,
        },
    });
};
export default style;
