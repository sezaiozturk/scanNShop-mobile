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

const PastShoppingCart = () => {
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
                title={'My Past Shopping Carts'}
                leftOne={{
                    name: 'menu',
                    onPress: () => navigation.openDrawer(),
                }}
            />
        </SafeAreaView>
    );
};
export default PastShoppingCart;
