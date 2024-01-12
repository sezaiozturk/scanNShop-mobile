import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import styles from './stylesheet';
import React from 'react';
import {useColors} from '../../utils/settings';

const FlatButton = ({total = 0}) => {
    const typography = useSelector(({theme}) => theme.typography);
    const colors = useColors();
    const classes = styles({colors});
    return (
        <View style={classes.container}>
            <TouchableOpacity style={classes.button} activeOpacity={0.5}>
                <Icon name={'shopping-outline'} size={25} color={'green'} />
                {total > 0 && (
                    <View style={classes.counterContainer}>
                        <Text style={classes.counter}>{total}</Text>
                    </View>
                )}
            </TouchableOpacity>
        </View>
    );
};

export default FlatButton;
