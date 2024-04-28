import {
    useNavigation
} from '@react-navigation/native';
import {
    useColors
} from '../../utils/settings';
import {
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import {
    useSelector
} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './stylesheet';
import React from 'react';

const CompanyCard = ({
    name, id
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
        <TouchableOpacity
            style={classes.container}
            activeOpacity={0.5}
            onPress={() => navigation.navigate('ProductsScreen', {
                id, name
            })}>
            <Text style={classes.title}>{name}</Text>
        </TouchableOpacity>
    );
};

export default CompanyCard;
