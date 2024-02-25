import {StyleSheet} from 'react-native';

const style = ({colors}) => {
    return StyleSheet.create({
        container: {
            flex: 1,
        },
        contentContainer: {
            backgroundColor: colors.secondary,
            flex: 1,
        },
        photo: {
            resizeMode: 'contain',
            marginBottom: 30,
            borderRadius: 5,
            width: 'auto',
            marginTop: 10,
            height: 200,
        },
        itemContainer: {
            backgroundColor: colors.secondary,
            paddingTop: 10,
        },
        footer: {
            backgroundColor: colors.secondary,
            justifyContent: 'space-between',
            borderColor: colors.text,
            paddingHorizontal: 20,
            flexDirection: 'row',
            paddingBottom: 25,
            borderTopWidth: 1,
            paddingTop: 15,
        },
        text: {
            fontFamily: 'Alegreya-Medium',
            color: colors.text,
            fontSize: 15,
        },
    });
};

export default style;
