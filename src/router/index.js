import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Companies, Products} from '../screens';

const Router = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="CompaniesScreen" component={Companies} />
            <Stack.Screen name="ProductsScreen" component={Products} />
        </Stack.Navigator>
    );
};
export default Router;
