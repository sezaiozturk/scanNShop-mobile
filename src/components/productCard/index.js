import {Image, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import styles from './stylesheet';
import React from 'react';
import {addProducts, totals, useColors} from '../../utils/settings';
import {useRealm} from '@realm/react';

const ProductCard = ({companyName, product, index}) => {
    const typography = useSelector(({theme}) => theme.typography);
    const colors = useColors();
    const classes = styles({colors});
    const backgroundColor = index % 2 === 0 ? '#55D968' : 'white';
    const plus = index % 2 === 0 ? 'white' : '#55D968';
    const realm = useRealm();

    const saveDatabase = dataList => {
        if (realmProducts.length > 0) {
            realm.write(() => {
                realm.delete(realmProducts);
            });
        }
        /*realm.write(() => {
                realm.create('Company', {
                    id: parseInt(item.id),
                    image: item.image,
                    title: item.title,
                    price: parseFloat(item.price),
                });
            });*/
    };

    return (
        <View style={[classes.container, {backgroundColor}]}>
            <View style={classes.leftContainer}>
                <Image style={classes.image} src={product.image} />
                <View>
                    <Text style={classes.name}>{product.name}</Text>
                    <Text style={classes.price}>{product.price} TL</Text>
                </View>
            </View>
            <TouchableOpacity
                style={classes.add}
                activeOpacity={0.5}
                onPress={() => {
                    addProducts({companyName, ...product});
                    totals();
                }}>
                <Icon name="plus-circle" color={plus} size={26} />
            </TouchableOpacity>
        </View>
    );
};

export default ProductCard;
