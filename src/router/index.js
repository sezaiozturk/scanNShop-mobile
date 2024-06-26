import {
    createNativeStackNavigator
} from '@react-navigation/native-stack';
import {
    createDrawerNavigator
} from '@react-navigation/drawer';
import {

    NavigationContainer
} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
    PastShoppingCart,
    ShoppingCart,
    CameraScreen,
    Companies,
    Products,
    Signup,
    Search,
    Login,
} from '../screens';
import storage from '../storage';
import {
    useEffect,
    useState
} from 'react';
import {
    useColors
} from '../utils/settings';
import {
    Drawer
} from '../components';
import {
    Text
} from 'react-native-paper';

const Stack = createNativeStackNavigator();
const DrawerNav = createDrawerNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen
                name="CompaniesScreen"
                component={Companies}
            />
            <Stack.Screen
                name="SearchScreen"
                component={Search}
            />
            <Stack.Screen
                name="ProductsScreen"
                component={Products}
            />
            <Stack.Screen
                name="CameraScreen"
                component={CameraScreen}
            />
            <Stack.Screen
                name="ShoppingCartScreen"
                component={ShoppingCart}
            />
        </Stack.Navigator>
    );
};

const AuthStack = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="LoginScreen" component={Login} />
            <Stack.Screen name="SignupScreen" component={Signup} />
        </Stack.Navigator>
    );
};

const HomeTab = () => {
    const colors = useColors();

    return (
        <DrawerNav.Navigator
            drawerContent={props => <Drawer {...props} />}
            screenOptions={{
                headerShown: false,
                drawerType: 'front',
                drawerActiveBackgroundColor: colors.primary,
                drawerActiveTintColor: colors.secondary,
                drawerInactiveTintColor: colors.primary,
                drawerLabelStyle: {
                    fontFamily: 'Alegreya-Medium',
                    marginLeft: -20,
                    fontSize: 15,
                },
            }}>
            <DrawerNav.Screen
                name="HomeStack"
                component={HomeStack}
                options={{
                    title: 'Home',
                    drawerIcon: ({
                        focused
                    }) => (
                        <Text>
                            <Icon
                                name={'map-outline'}
                                size={24}
                                color={focused ? colors.white : colors.primary}
                            />
                        </Text>
                    ),
                }}
            />
            <DrawerNav.Screen
                name="PastChoppingCartsScreen"
                component={PastShoppingCart}
                options={{
                    title: 'Past Shopping Carts',
                    drawerIcon: ({
                        focused
                    }) => (
                        <Text>
                            <Icon
                                name={'clock-outline'}
                                size={24}
                                color={focused ? colors.white : colors.primary}
                            />
                        </Text>
                    ),
                }}
            />
        </DrawerNav.Navigator>
    );
};

const Router = () => {
    const [initial, setInitial] = useState(null);

    useEffect(() => {
        accountControl();
    }, []);

    const accountControl = () => {
        const authUser = storage.getString('user');
        if (authUser) {
            setInitial('HomeTab');
        } else {
            setInitial('AuthStack');
        }
    };

    return (
        <NavigationContainer>
            {initial != null ? (
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false
                    }}
                    initialRouteName={initial}>
                    <Stack.Screen name="AuthStack" component={AuthStack} />
                    <Stack.Screen
                        name="HomeTab"
                        component={HomeTab}
                    >
                    </Stack.Screen>
                </Stack.Navigator>
            ) : null}
        </NavigationContainer>
    );
};
export default Router;
