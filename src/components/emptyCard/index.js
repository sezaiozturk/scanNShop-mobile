import {
    Text,
    TouchableOpacity
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

const EmptyCard = ({
    icon,
    title,
    subTitle
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
            style={classes.emptyShoppingCard}
            activeOpacity={0.6}
            onPress={() => navigation.navigate('CompaniesScreen')}>
            <Icon name={icon} color={colors.primary} size={60} />
            <Text style={classes.empty}>{title}.</Text>
            <Text style={classes.empty}>{subTitle}.</Text>
        </TouchableOpacity>
    );
};

export default EmptyCard;
