import {FlatList, SafeAreaView, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {CompanyCard, FlatButton, TopBar} from '../../components';
import axios from 'axios';
import {useEffect, useState} from 'react';
import style from './stylesheet';
import {totals, getShoppingCartLists, useColors} from '../../utils/settings';
import {useNavigation} from '@react-navigation/native';
import storage from '../../storage';

const Companies = () => {
    const colors = useColors();
    const classes = style({colors});
    const [companies, setCompanies] = useState([]);
    const navigation = useNavigation();
    useEffect(() => {
        getShoppingCart();
        getCompanies();
    }, []);

    const getCompanies = () => {
        let temp = [];
        axios
            .post('http://10.38.246.49:3000/companies')
            .then(companies => {
                companies.data.forEach(company => {
                    temp.push(company);
                });
                setCompanies(temp);
            })
            .catch(err => console.log(err));
    };

    const getShoppingCart = () => {
        const authUser = storage.getString('user');
        if (authUser) {
            const token = storage.getString('accessToken');
            let userId = JSON.parse(authUser)._id;
            axios
                .post(
                    'http://localhost:3000/user/getShoppingCart',
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
                    const shoppingCarts = res.data.shoppingCarts;
                    if (shoppingCarts) {
                        getShoppingCartLists(shoppingCarts);
                    } else {
                        getShoppingCartLists([]);
                    }
                    totals();
                });
        }
    };

    const renderItem = ({item}) => {
        return <CompanyCard name={item.companyName} id={item._id} />;
    };
    return (
        <SafeAreaView style={classes.container}>
            <TopBar
                leftOne={{
                    name: 'menu',
                    onPress: () => navigation.openDrawer(),
                }}
            />
            <FlatList
                data={companies}
                renderItem={renderItem}
                keyExtractor={item => item._id}
                numColumns={2}
                style={{marginTop: 40}}
                contentContainerStyle={classes.column}
                columnWrapperStyle={classes.content}
            />
            <FlatButton />
        </SafeAreaView>
    );
};

export default Companies;
