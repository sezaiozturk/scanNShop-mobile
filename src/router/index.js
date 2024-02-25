import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
    BarcodScanner,
    Companies,
    Products,
    ShoppingCart,
    Login,
    Signup,
} from '../screens';
import storage from '../storage';
import {useEffect, useState} from 'react';
import {useColors} from '../utils/settings';
import {Drawer} from '../components';
import {Text} from 'react-native-paper';

const Router = () => {
    const Stack = createNativeStackNavigator();
    const DrawerNav = createDrawerNavigator();
    const [initial, setInitial] = useState(null);
    const colors = useColors();
    const authUser = storage.getString('user');

    useEffect(() => {
        accountControl();
    }, []);

    const accountControl = () => {
        if (authUser) {
            setInitial('CompaniesScreen');
        } else {
            setInitial('AuthStack');
        }
    };

    const AuthStack = () => {
        return (
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="LoginScreen" component={Login} />
                <Stack.Screen name="SignupScreen" component={Signup} />
            </Stack.Navigator>
        );
    };

    const HomeTab = () => {
        return (
            <DrawerNav.Navigator
                drawerContent={props => <Drawer {...props} />}
                screenOptions={{
                    drawerType: 'front',
                    headerShown: false,
                    drawerActiveBackgroundColor: colors.primary,
                    drawerActiveTintColor: colors.secondary,
                    drawerInactiveTintColor: colors.text,
                    drawerLabelStyle: {
                        fontFamily: 'Alegreya-Medium',
                        marginLeft: -20,
                        fontSize: 15,
                    },
                }}>
                <DrawerNav.Screen
                    name="CompaniesScreen"
                    component={Companies}
                    options={{
                        title: 'Companies',
                        drawerIcon: () => (
                            <Text>
                                <Icon
                                    name={'map-outline'}
                                    size={24}
                                    color={colors.icon}
                                />
                            </Text>
                        ),
                    }}
                />
                <DrawerNav.Screen
                    name="PastShoppingCart"
                    component={ShoppingCart}
                    options={{
                        title: 'Past Shopping Cart',
                        drawerIcon: () => (
                            <Text>
                                <Icon
                                    name={'basket-check'}
                                    size={24}
                                    color={colors.icon}
                                />
                            </Text>
                        ),
                    }}
                />
            </DrawerNav.Navigator>
        );
    };

    return (
        <NavigationContainer>
            {initial != null ? (
                <Stack.Navigator
                    screenOptions={{headerShown: false}}
                    initialRouteName={initial}>
                    <Stack.Screen name="AuthStack" component={AuthStack} />
                    <Stack.Screen name="HomeTab" component={HomeTab} />
                    <Stack.Screen
                        name="CompaniesScreen"
                        component={Companies}
                    />
                    <Stack.Screen name="ProductsScreen" component={Products} />
                    <Stack.Screen
                        name="BarcodScannerScreen"
                        component={BarcodScanner}
                    />
                    <Stack.Screen
                        name="ShoppingCartScreen"
                        component={ShoppingCart}
                    />
                </Stack.Navigator>
            ) : null}
        </NavigationContainer>
    );
};
export default Router;
