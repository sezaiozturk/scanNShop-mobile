import {SafeAreaView, Text, View, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ShopCard, ShopDropdown, TopBar} from '../../components';
import axios from 'axios';
import {useEffect, useState} from 'react';
import style from './stylesheet';
import {useBasketTotal, useColors, useShoppingCart} from '../../utils/settings';
import {useRealm} from '@realm/react';

const ShoppingCart = ({navigation}) => {
    const colors = useColors();
    const classes = style({colors});
    const [companies, setCompanies] = useState([]);
    const list = useShoppingCart();
    let basketTotal = useBasketTotal();
    //const realm = useRealm();
    useEffect(() => {
        getCompanies();
    }, []);
    const getCompanies = () => {
        let temp = [];
        axios
            .post('http://172.31.2.201:3001/companies')
            .then(companies => {
                companies.data.map(company => {
                    temp.push(company);
                });
                setCompanies(temp);
            })
            .catch(err => console.log(err));
    };

    /*const renderItem = ({item}) => {
        return (
            <ShopCard name={item.name} price={item.price} count={item.count} />
        );
    };*/

    return (
        <SafeAreaView style={classes.container}>
            <TopBar
                title={'Sepetim'}
                leftOne={{
                    name: 'chevron-left',
                    onPress: () => navigation.goBack(),
                }}
            />
            <ScrollView>
                {list.map(item => {
                    return (
                        <ShopDropdown
                            companyId={item.companyId}
                            companyName={item.companyName}
                            productList={item.list}
                        />
                    );
                })}
            </ScrollView>
            <View style={classes.totalContainer}>
                <Text style={classes.title}>Toplam</Text>
                <View style={classes.innerContainer}>
                    <Text style={classes.total}>{basketTotal}</Text>
                    <Text style={classes.currency}>TL</Text>
                </View>
            </View>
        </SafeAreaView>
    );
};
export default ShoppingCart;

/**
 * <View key={index}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    paddingHorizontal: 20,
                                    backgroundColor: 'green',
                                    paddingVertical: 10,
                                }}>
                                <Text
                                    style={{
                                        fontFamily: 'Alegreya-SemiBold',
                                        fontSize: 16,
                                        color: 'white',
                                    }}>
                                    {item.company}
                                </Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        item.id===
                                        setToggle(!toggle)
                                    }}
                                    activeOpacity={0.5}>
                                    {toggle ? (
                                        <Icon
                                            name={'chevron-down'}
                                            size={22}
                                            color={colors.white}
                                        />
                                    ) : (
                                        <Icon
                                            name={'chevron-up'}
                                            size={22}
                                            color={colors.white}
                                        />
                                    )}
                                </TouchableOpacity>
                            </View>
                            {item.x.map((product, index) => (
                                <ShopCard
                                    key={index}
                                    name={product.name}
                                    price={product.price}
                                    count={product.count}
                                />
                            ))}
                        </View>

                        <ShopDropdown
                            companyId={item._id}
                            companyName={item.companyName}
                            productList={item}
                        />
 */
