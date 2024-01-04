import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import styles from './stylesheet';
import React from 'react';
import {useColors} from '../../utils/settings';
import {useNavigation} from '@react-navigation/native';

const CompanyCard = ({name, id}) => {
    const typography = useSelector(({theme}) => theme.typography);
    const colors = useColors();
    const classes = styles({colors});
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            style={classes.container}
            activeOpacity={0.5}
            onPress={() => navigation.navigate('ProductsScreen', {id})}>
            <Text style={classes.title}>{name}</Text>
        </TouchableOpacity>
    );
};

export default CompanyCard;
