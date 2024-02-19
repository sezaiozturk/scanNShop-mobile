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

const Router = () => {
    const Stack = createNativeStackNavigator();

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="LoginScreen" component={Login} />
                <Stack.Screen name="SignupScreen" component={Signup} />
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
