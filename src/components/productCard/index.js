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
    const backgroundColor = index % 2 === 0 ? 'white' : '#55D968';
    return (
        <TouchableOpacity
            style={[classes.container, {backgroundColor}]}
            activeOpacity={0.5}
            onPress={() => null}>
            <View style={classes.leftContainer}>
                <Image style={classes.image} src={product.image} />
                <Text style={classes.name}>{product.name}</Text>
            </View>
            <Text style={classes.price}>{product.price} TL</Text>
        </TouchableOpacity>
    );
};

export default ProductCard;
