import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {BarcodScanner, Companies, Products, ShoppingCart} from '../screens';

const Router = () => {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="CompaniesScreen" component={Companies} />
            <Stack.Screen name="ProductsScreen" component={Products} />
            <Stack.Screen
                name="BarcodScannerScreen"
                component={BarcodScanner}
            />
            <Stack.Screen name="ShoppingCartScreen" component={ShoppingCart} />
        </Stack.Navigator>
    );
};
export default Router;
