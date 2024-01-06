import {Image, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import styles from './stylesheet';
import React from 'react';
import {useColors} from '../../utils/settings';
import {useNavigation} from '@react-navigation/native';

const TopBar = ({title, leftOne, leftTwo, rightOne, rightTwo}) => {
    const typography = useSelector(({theme}) => theme.typography);
    const colors = useColors();
    const classes = styles({colors});
    const navigation = useNavigation();
    return (
        <View style={classes.topBar}>
            <View style={classes.leftContainer}>
                {leftOne && (
                    <TouchableOpacity
                        style={classes.button}
                        onPress={leftOne.onPress}>
                        <Icon
                            name={leftOne.name}
                            size={25}
                            color={colors.primary}
                        />
                    </TouchableOpacity>
                )}
                {leftTwo && (
                    <TouchableOpacity
                        style={classes.button}
                        onPress={leftTwo.onPress}>
                        <Icon
                            name={leftTwo.name}
                            size={25}
                            color={colors.primary}
                        />
                    </TouchableOpacity>
                )}
            </View>
            <Text style={classes.title}>{title}</Text>
            <View style={classes.rightContainer}>
                {rightTwo && (
                    <TouchableOpacity
                        style={classes.button}
                        onPress={rightTwo.onPress}>
                        <Icon
                            name={rightTwo.name}
                            size={25}
                            color={colors.primary}
                        />
                    </TouchableOpacity>
                )}
                {rightOne && (
                    <TouchableOpacity
                        style={classes.button}
                        onPress={rightOne.onPress}>
                        <Icon
                            name={rightOne.name}
                            size={25}
                            color={colors.primary}
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

export default TopBar;
