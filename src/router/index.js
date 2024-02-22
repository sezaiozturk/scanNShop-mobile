import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {
    BarcodScanner,
    Companies,
    Products,
    ShoppingCart,
    Login,
    Signup,
} from '../screens';
import storage from '../storage';
import {useEffect} from 'react';
import axios from 'axios';
import {totals, updateShoppingCartLists} from '../utils/settings';

const Router = () => {
    const Stack = createNativeStackNavigator();
    const user = storage.getString('user');
    useEffect(() => {
        const authUser = storage.getString('user');
        if (authUser) {
            const {_id} = JSON.parse(authUser);
            axios
                .post('http://localhost:3000/user/getShoppingCartList', {
                    _id,
                })
                .then(res => {
                    const shoppingCarts = res.data.shoppingCarts;
                    if (shoppingCarts) {
                        updateShoppingCartLists(shoppingCarts);
                        totals();
                    }
                });
        }
    }, []);

    const AuthStack = () => {
        return (
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="LoginScreen" component={Login} />
                <Stack.Screen name="SignupScreen" component={Signup} />
            </Stack.Navigator>
        );
    };

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                {!user && (
                    <Stack.Screen name="AuthStack" component={AuthStack} />
                )}
                <Stack.Screen name="CompaniesScreen" component={Companies} />
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
        </NavigationContainer>
    );
};
export default Router;
