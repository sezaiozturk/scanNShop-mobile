import {
    SafeAreaView,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import {ShopDropdown, TopBar} from '../../components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import style from './stylesheet';
import {
    pays,
    useBasketTotal,
    useColors,
    useShoppingCart,
} from '../../utils/settings';
import storage from '../../storage';
import {useNavigation} from '@react-navigation/native';

const ShoppingCart = () => {
    const colors = useColors();
    const classes = style({colors});
    const list = useShoppingCart();
    let basketTotal = useBasketTotal();
    const navigation = useNavigation();

    const pay = async () => {
        const authUser = storage.getString('user');
        const token = storage.getString('accessToken');
        let userId = JSON.parse(authUser)._id;

        pays({userId, token});
    };

    return (
        <SafeAreaView style={classes.container}>
            <TopBar
                title={'Sepetim'}
                leftOne={{
                    name: 'chevron-left',
                    onPress: () => navigation.goBack(),
                }}
                rightOne={{
                    name: 'credit-card-check-outline',
                    onPress: pay,
                }}
            />
            <ScrollView>
                {list.length > 0 ? (
                    list.map(item => {
                        return (
                            <ShopDropdown
                                companyId={item.companyId}
                                companyName={item.companyName}
                                productList={item.list}
                            />
                        );
                    })
                ) : (
                    <TouchableOpacity
                        style={classes.emptyShoppingCart}
                        activeOpacity={0.6}
                        onPress={() => navigation.navigate('CompaniesScreen')}>
                        <Icon
                            name={'cart-outline'}
                            color={colors.primary}
                            size={100}
                        />
                        <Text style={classes.empty}>Empty cart.</Text>
                        <Text style={classes.empty}>Start shopping.</Text>
                    </TouchableOpacity>
                )}
            </ScrollView>
            <View style={classes.totalContainer}>
                <Text style={classes.title}>Toplam</Text>
                <View style={classes.innerContainer}>
                    <Text style={classes.total}>{basketTotal}</Text>
                    <Text style={classes.currency}>TL</Text>
                </View>
            </View>
        </SafeAreaView>
    );
};
export default ShoppingCart;
