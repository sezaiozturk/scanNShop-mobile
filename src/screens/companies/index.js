import {FlatList, SafeAreaView, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {CompanyCard, FlatButton} from '../../components';
import axios from 'axios';
import {useEffect, useState} from 'react';
import style from './stylesheet';
import {totals, updateShoppingCartLists, useColors} from '../../utils/settings';
import {Button} from 'react-native-paper';
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
            .post('http://172.31.4.163:3000/companies')
            .then(companies => {
                companies.data.map(company => {
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
                    'http://localhost:3000/user/getShoppingCartList',
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
                        updateShoppingCartLists(shoppingCarts);
                    } else {
                        updateShoppingCartLists([]);
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
            <View style={classes.topBar}>
                <TouchableOpacity
                    style={classes.button}
                    activeOpacity={0.5}
                    onPress={() => {
                        navigation.openDrawer();
                    }}>
                    <Icon name={'menu'} size={30} color={'green'} />
                </TouchableOpacity>
            </View>
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
