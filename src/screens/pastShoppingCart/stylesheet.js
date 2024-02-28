import {StyleSheet} from 'react-native';

const style = ({colors}) => {
    return StyleSheet.create({
        container: {
            backgroundColor: colors.secondary,
            flex: 1,
        },
    });
};
export default style;
