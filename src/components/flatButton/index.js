import {
    TouchableOpacity,
    View,
    Text
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
    useSelector
} from 'react-redux';
import styles from './stylesheet';
import React from 'react';
import {
    useColors
} from '../../utils/settings';
import {
    useNavigation
} from '@react-navigation/native';

const FlatButton = ({
    total = 0
}) => {
    const typography = useSelector(({
        theme
    }) => theme.typography);
    const colors = useColors();
    const classes = styles({
        colors
    });
    const navigation = useNavigation();
    return (
        <View style={classes.container}>
            <TouchableOpacity
                style={classes.button}
                activeOpacity={0.5}
                onPress={() => navigation.navigate('ShoppingCartScreen')}
            >
                <Icon
                    name={'shopping-outline'}
                    size={30}
                    color={'green'}
                />
                {total > 0 && (
                    <View
                        style={classes.counterContainer}
                    >
                        <Text
                            style={classes.counter}
                        >
                            {total}
                        </Text>
                    </View>
                )}
            </TouchableOpacity>
        </View>
    );
};

export default FlatButton;
