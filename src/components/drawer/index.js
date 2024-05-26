import {
    DrawerContentScrollView,
    DrawerItemList,
} from '@react-navigation/drawer';
import {
    View,
    TouchableOpacity,
    Text,
    Image
} from 'react-native';
import React,
{
    useState
} from 'react';
import {
    useSelector
} from 'react-redux';
import styles from './stylesheet';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import storage from '../../storage';

const Drawer = props => {
    const colors = useSelector(({
        theme
    }) => theme.colors);
    const typography = useSelector(({
        theme
    }) => theme.typography);
    const classes = styles({
        colors
    });

    return (
        <View style={classes.container}>
            <DrawerContentScrollView
                {...props}
                contentContainerStyle={classes.contentContainer}>
                <Image
                    source={require('../../assets/images/logo.png')}
                    style={classes.photo}
                />
                <View style={classes.itemContainer}>
                    <DrawerItemList {...props} />
                </View>
            </DrawerContentScrollView>
            <TouchableOpacity
                style={classes.footer}
                onPress={() => {
                    storage.delete('user');
                    storage.delete('accessToken');
                    props.navigation.reset({
                        index: 0,
                        routes: [{
                            name: 'AuthStack'
                        }],
                    });
                }}>
                <View style={{
                    flexDirection: 'row',
                    gap: 10
                }}>
                    <Text>
                        <Icon
                            name={'exit-to-app'}
                            size={24}
                            color={colors.icon}
                        />
                    </Text>
                    <Text style={classes.text}
                    >
                        Exit
                    </Text>
                </View>
                <Text style={classes.text}>
                    version 0.1(beta)
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default Drawer;
