import {
    StyleSheet
} from 'react-native';

const style = ({
    colors
}) => {
    return StyleSheet.create({
        container: {
            backgroundColor: colors.secondary,
            flex: 1
        },
        card: {
            backgroundColor: colors.secondary,
            shadowColor: colors.black,
            alignItems: "center",
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            borderRadius: 10,
            shadowOffset: {
                width: 0,
                height: 2
            },
            elevation: 5,
            padding: 15,
            margin: 10,
            flex: 1,
        },
        companyName: {
            fontFamily: 'Alegreya-Medium',
            color: colors.black,
            marginBottom: 10,
            fontSize: 16,
        },
        image: {
            marginBottom: 10,
            borderRadius: 10,
            height: 100,
            width: 100,
        },
        name: {
            fontFamily: 'Alegreya-Medium',
            color: colors.black,
            marginBottom: 10,
            fontSize: 16,
        },
        priceContainer: {
            justifyContent: 'center',
            flexDirection: "row",
        },
        price: {
            fontFamily: 'Alegreya-Bold',
            color: colors.primary,
            fontSize: 18,
        },
        currency: {
            fontFamily: 'Alegreya-Bold',
            color: colors.primary,
            marginLeft: 5,
            fontSize: 18,
        }
    });
};
export default style;
