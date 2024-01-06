import {Image, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import styles from './stylesheet';
import React from 'react';
import {useColors} from '../../utils/settings';

const ProductCard = ({product, index}) => {
    const typography = useSelector(({theme}) => theme.typography);
    const colors = useColors();
    const classes = styles({colors});
    const backgroundColor = index % 2 === 0 ? '#55D968' : 'white';
    const plus = index % 2 === 0 ? 'white' : '#55D968';
    return (
        <View style={[classes.container, {backgroundColor}]}>
            <View style={classes.leftContainer}>
                <Image style={classes.image} src={product.image} />
                <View>
                    <Text style={classes.name}>{product.name}</Text>
                    <Text style={classes.price}>{product.price} TL</Text>
                </View>
            </View>
            <TouchableOpacity style={classes.add} activeOpacity={0.5}>
                <Icon name="plus-circle" color={plus} size={26} />
            </TouchableOpacity>
        </View>
    );
};

export default ProductCard;
