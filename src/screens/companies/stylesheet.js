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
        column: {
            display: 'flex',
            gap: 20,
            flex: 1,
        },
        content: {
            justifyContent: 'space-evenly',
            display: 'flex',
        },
    });
};
export default style;
