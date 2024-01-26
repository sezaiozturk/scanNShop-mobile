import {Image, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import styles from './stylesheet';
import React, {useState} from 'react';
import {useColors} from '../../utils/settings';

const ShopCard = ({id, name = 'Ürün Adı', price = 0, image}) => {
    const typography = useSelector(({theme}) => theme.typography);
    const colors = useColors();
    const classes = styles({colors});
    const [piece, setPiece] = useState(1);

    const increment = () => {
        setPiece(piece + 1);
    };
    const decrement = () => {
        if (piece - 1 === 0) {
            //listeden kaldıracak kod
        } else {
            setPiece(piece - 1);
        }
    };

    return (
        <View style={classes.container} key={id}>
            <View style={classes.leftContainer}>
                <Image src={image} style={classes.photo} />
            </View>
            <View style={classes.rightContainer}>
                <View style={classes.top}>
                    <Text style={classes.name}>{name}</Text>
                    <TouchableOpacity
                        style={classes.button}
                        activeOpacity={0.5}>
                        <Icon name={'close'} size={20} color={colors.primary} />
                    </TouchableOpacity>
                </View>
                <View style={classes.bottom}>
                    <Text style={classes.price}>{price} TL</Text>
                    <View style={classes.panel}>
                        <TouchableOpacity
                            style={classes.button}
                            activeOpacity={0.5}
                            onPress={decrement}>
                            <Icon
                                name={'minus-circle-outline'}
                                size={25}
                                color={colors.primary}
                            />
                        </TouchableOpacity>
                        <Text style={classes.count}>{piece}</Text>
                        <TouchableOpacity
                            style={classes.button}
                            activeOpacity={0.5}
                            onPress={increment}>
                            <Icon
                                name={'plus-circle'}
                                size={25}
                                color={colors.primary}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default ShopCard;
