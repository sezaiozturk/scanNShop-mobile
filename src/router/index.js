import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Companies} from '../screens';

const Router = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="CompaniesScreen" component={Companies} />
        </Stack.Navigator>
    );
};
export default Router;
