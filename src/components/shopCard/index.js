import {
    Image,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
    useSelector
} from 'react-redux';
import styles from './stylesheet';
import React from 'react';
import {
    updates, useColors
} from '../../utils/settings';
import storage from '../../storage';
import {
    HOST
} from '../../constants';

const ShopCard = ({
    id,
    companyId,
    name = 'Ürün Adı',
    price = 0,
    image,
    count,
}) => {
    const typography = useSelector(({
        theme
    }) => theme.typography);
    const colors = useColors();
    const classes = styles({
        colors
    });
    let operation;
    const authUser = storage.getString('user');
    const token = storage.getString('accessToken');
    let userId = JSON.parse(authUser)._id;

    const increment = () => {
        operation = '+';
        updates({
            operation,
            companyId,
            userId,
            count,
            price,
            token,
            id
        });
    };
    const decrement = () => {
        if (count - 1 === 0) {
            operation = 'r';
            updates({
                operation,
                companyId,
                price,
                userId,
                token,
                count,
                id,
            });
        } else {
            operation = '-';
            updates({
                companyId,
                operation,
                userId,
                token,
                price,
                count,
                id,
            });
        }
    };
    const remove = () => {
        operation = 'r';
        updates({
            companyId,
            operation,
            userId,
            price,
            count,
            token,
            id,
        });
    };

    return (
        <View style={classes.container} key={id}>
            <View style={classes.leftContainer}>
                <Image
                    src={`http://${HOST}:3000/${image}`}
                    style={classes.photo}
                />
            </View>
            <View style={classes.rightContainer}>
                <View style={classes.top}>
                    <Text style={classes.name}>{name}</Text>
                    <TouchableOpacity
                        style={classes.button}
                        activeOpacity={0.5}
                        onPress={remove}>
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
                        <Text style={classes.count}>{count}</Text>
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
