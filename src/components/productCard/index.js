import {
    TouchableOpacity,
    Image,
    Text,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
    useSelector
} from 'react-redux';
import styles from './stylesheet';
import React from 'react';
import {
    addProducts,
    totals,
    useAuthUser,
    useColors,
    useToken,
} from '../../utils/settings';
import storage from '../../storage';
import {
    HOST
} from '../../constants';

const ProductCard = ({
    companyName,
    product,
    index
}) => {
    const typography = useSelector(({
        theme
    }) => theme.typography);
    const colors = useColors();
    const classes = styles({
        colors
    });
    const backgroundColor = index % 2 === 0 ? '#55D968' : 'white';
    const plus = index % 2 === 0 ? 'white' : '#55D968';

    const authUser = storage.getString('user');
    const token = storage.getString('accessToken');
    let userId = JSON.parse(authUser)._id;

    return (
        <View
            style={[classes.container, {
                backgroundColor
            }]}
        >
            <View style={classes.leftContainer}>
                <Image
                    style={classes.image}
                    src={`http://${HOST}:3000/${product.image}`}
                />
                <View>
                    <Text style={classes.name}>{product.name}</Text>
                    <Text style={classes.price}>{product.price} TL</Text>
                </View>
            </View>
            <TouchableOpacity
                style={classes.add}
                activeOpacity={0.5}
                onPress={() => {
                    addProducts({
                        companyName,
                        ...product,
                        userId,
                        token
                    });
                    totals();
                }}>
                <Icon name="plus-circle" color={plus} size={26} />
            </TouchableOpacity>
        </View>
    );
};

export default ProductCard;
