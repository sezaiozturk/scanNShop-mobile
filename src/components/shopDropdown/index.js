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
import React, {
    useState
} from 'react';
import {
    useColors
} from '../../utils/settings';
import {
    ShopCard
} from '..';

const ShopDropdown = ({
    companyId,
    companyName,
    productList
}) => {
    const typography = useSelector(({
        theme
    }) => theme.typography);
    const colors = useColors();
    const classes = styles({
        colors
    });
    const [toggle, setToggle] = useState(true);

    return (
        <View key={companyId}>
            <TouchableOpacity
                onPress={() => {
                    setToggle(!toggle);
                }}
                activeOpacity={0.8}
                style={classes.container}>
                <Text style={classes.title}>{companyName}</Text>
                <Icon
                    name={toggle ? 'chevron-up' : 'chevron-down'}
                    size={22}
                    color={colors.white}
                />
            </TouchableOpacity>
            {toggle &&
                productList.map(product => (
                    <ShopCard
                        id={product.id}
                        companyId={companyId}
                        name={product.name}
                        price={product.price}
                        image={product.image}
                        count={product.count}
                    />
                ))}
        </View>
    );
};

export default ShopDropdown;
