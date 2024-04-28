import {
    StyleSheet
} from 'react-native';

const style = ({
    colors
}) => {
    return StyleSheet.create({
        container: {
            justifyContent: 'space-between',
            backgroundColor: 'pink',
            paddingHorizontal: 10,
            flexDirection: 'row',
            alignItems: 'center',
            textAlign: 'center',
            marginHorizontal: 5,
            paddingVertical: 5,
            borderRadius: 10,
            marginVertical: 3,
        },
        leftContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 15,
        },
        image: {
            borderRadius: 25,
            height: 50,
            width: 50,
        },
        name: {
            fontFamily: 'Alegreya-Regular',
            fontSize: 16,
        },
        price: {
            fontFamily: 'Alegreya-Regular',
            fontSize: 16,
        },
        add: {
            padding: 5,
            borderRadius: 100,
        },
    });
};
export default style;
