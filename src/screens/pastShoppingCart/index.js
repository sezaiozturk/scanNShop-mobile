import {
    TouchableOpacity,
    SafeAreaView,
    FlatList,
    View
} from 'react-native';
import {
    EmptyCard,
    TopBar
} from '../../components';
import style from './stylesheet';
import {
    useColors
} from '../../utils/settings';
import storage from '../../storage';
import {
    useFocusEffect, useNavigation
} from '@react-navigation/native';
import React, {
    useState,
    useCallback
} from 'react';
import axios from 'axios';
import {
    Text
} from 'react-native-paper';

const PastShoppingCart = () => {
    const colors = useColors();
    const classes = style({
        colors
    });
    const navigation = useNavigation();
    const [pastShoppingCarts, setPastShoppingCarts] = useState([]);

    const getPastShoppingCarts = () => {
        const authUser = storage.getString('user');
        const token = storage.getString('accessToken');
        let userId = JSON.parse(authUser)._id;

        axios
            .post(
                'http://localhost:3000/user/getPastShoppingCart',
                {
                    _id: userId,
                },
                {
                    headers: {
                        'x-auth-token': token,
                    },
                },
            )
            .then(res => {
                setPastShoppingCarts(res.data.pastShoppingCarts);
            });
    };

    useFocusEffect(
        useCallback(() => {
            getPastShoppingCarts();
        }, []),
    );

    const renderItem = ({
        item
    }) => (
        <View style={classes.invoiceContainer}>
            {item.shoppingCarts.map((company, index) => (
                <View key={index}>
                    <Text style={classes.title}>{company.companyName}</Text>
                    {company.list.map((basket, i) => (
                        <View key={i} style={classes.row}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                }}>
                                <Text style={classes.text}>{basket.count}</Text>
                                <Text
                                    style={[
                                        classes.text,
                                        {
                                            marginHorizontal: 5
                                        },
                                    ]}>
                                    x
                                </Text>
                                <Text style={classes.text}>{basket.name}</Text>
                            </View>
                            <Text style={classes.text}>{basket.price}</Text>
                        </View>
                    ))}
                    <View style={[classes.row, {
                        paddingVertical: 4
                    }]}>
                        <Text style={classes.title}>Total :</Text>
                        <Text style={classes.title}>
                            {company.list.reduce(
                                (total, {
                                    price,
                                    count
                                }) =>
                                    total + price * count,
                                0,
                            )}
                        </Text>
                    </View>
                </View>
            ))}
        </View>
    );

    return (
        <SafeAreaView style={classes.container}>
            <TopBar
                title={'Past Shopping Carts'}
                leftOne={{
                    name: 'menu',
                    onPress: () => navigation.openDrawer(),
                }}
            />
            <FlatList
                data={pastShoppingCarts}
                renderItem={renderItem}
                ItemSeparatorComponent={<View style={{
                    height: 8
                }}
                />}
                ListEmptyComponent={
                    <EmptyCard
                        icon={'history'}
                        title={"You don't have any past shopping history"}
                        subTitle={'Start shopping now'}
                    />
                }
            />
        </SafeAreaView>
    );
};
export default PastShoppingCart;
