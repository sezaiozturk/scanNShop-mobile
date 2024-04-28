import {
    useColors
} from '../../utils/settings';
import {
    TouchableOpacity,
    View,
    Text
} from 'react-native';
import {
    useSelector
} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './stylesheet';
import React from 'react';

const Button = ({
    spreadBehavior = 'stretch',
    iconColor = 'white',
    variant = 'filled',
    disabled = false,
    iconSize = 30,
    reverse = false,
    onPress,
    title,
    icon,
    loading,
}) => {
    const typography = useSelector(({
        theme
    }) => theme.typography);
    const colors = useColors();
    const classes = styles({
        colors
    });
    return (
        <View>
            <TouchableOpacity
                onPress={onPress}
                disabled={disabled || loading}
                style={[
                    classes[variant].container,
                    (disabled || loading) &&
                    {
                        opacity: 0.6
                    },
                    {
                        alignSelf: spreadBehavior
                    },
                    reverse && {
                        flexDirection: 'row-reverse'
                    },
                ]}>
                {loading && (
                    <Text>
                        <Icon
                            name={'clock-outline'}
                            size={20}
                            color={'white'}
                        />
                    </Text>
                )}
                {icon && (
                    <Text>
                        <Icon name={icon} size={iconSize} color={iconColor} />
                    </Text>
                )}
                {title && (
                    <Text style={[classes[variant].title, typography.title2]}>
                        {title}
                    </Text>
                )}
            </TouchableOpacity>
        </View>
    );
};

export default Button;
