import {StyleSheet} from 'react-native';

const style = ({colors}) => {
    const base_style = StyleSheet.create({
        container: {
            justifyContent: 'center',
            paddingHorizontal: 20,
            alignItems: 'center',
            flexDirection: 'row',
            paddingVertical: 10,
            textAlign: 'center',
            borderRadius: 10,
            gap: 15,
        },
        title: {
            color: colors.primary,
        },
    });
    return {
        filled: StyleSheet.create({
            ...base_style,
            container: {
                ...base_style.container,
                backgroundColor: colors.primary,
            },
            title: {
                ...base_style.title,
                color: 'white',
            },
        }),
        outlined: StyleSheet.create({
            ...base_style,
            container: {
                ...base_style.container,
                backgroundColor: 'transparent',
                borderColor: colors.primary,
                paddingHorizontal: 18,
                paddingVertical: 8,
                borderWidth: 2,
            },
        }),
        ghost: StyleSheet.create({
            ...base_style,
            container: {
                ...base_style.container,
                backgroundColor: 'transparent',
            },
            title: {
                ...base_style.title,
            },
        }),
    };
};
export default style;
