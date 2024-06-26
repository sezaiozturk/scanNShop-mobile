import {
    TouchableOpacity,
    SafeAreaView,
    FlatList,
    View,
} from 'react-native';
import {
    CompanyCard,
    FlatButton,
    TopBar
} from '../../components';
import axios from 'axios';
import {
    useEffect,
    useState
} from 'react';
import style from './stylesheet';
import {
    getShoppingCartLists,
    useColors,
    totals
} from '../../utils/settings';
import {
    useNavigation
} from '@react-navigation/native';
import storage from '../../storage';
import {
    HOST
} from '../../constants';

const Companies = () => {
    const colors = useColors();
    const classes = style({
        colors
    });
    const [companies, setCompanies] = useState([]);
    const [allProducts, setAllProducts] = useState([]);

    const navigation = useNavigation();
    useEffect(() => {
        getAllProducts();
        getShoppingCart();
        getCompanies();
    }, []);

    const getCompanies = () => {
        let temp = [];
        axios
            .post(`http://${HOST}:3000/companies`)
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
                    `http://${HOST}:3000/user/getShoppingCart`,
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

    const getAllProducts = () => {
        let temp = [];
        axios
            .post(`http://${HOST}:3000/admin/find`)
            .then(products => {
                products.data.forEach(product => {
                    temp.push(product);
                });
                setAllProducts(temp);
            })
            .catch(err => console.log(err));
    };

    const renderItem = ({
        item
    }) => {
        return <CompanyCard name={item.companyName} id={item._id} />;
    };
    return (
        <SafeAreaView style={classes.container}>
            <TopBar
                leftOne={{
                    name: 'menu',
                    onPress: () => navigation.openDrawer(),
                }}
                rightOne={{
                    name: 'camera',
                    onPress: () => {
                        navigation.navigate('CameraScreen', {
                            companies,
                            allProducts,
                            allCompany: true,
                            from: "photo"
                        });
                    }
                }}
                rightTwo={{
                    name: 'barcode-scan',
                    onPress: () => {
                        navigation.navigate('CameraScreen', {
                            companies,
                            allProducts,
                            allCompany: true,
                            from: "barcod"
                        });
                    },
                }}
            />
            <FlatList
                data={companies}
                renderItem={renderItem}
                keyExtractor={item => item._id}
                numColumns={2}
                style={{
                    marginTop: 40
                }}
                contentContainerStyle={classes.column}
                columnWrapperStyle={classes.content}
            />
            <FlatButton />
        </SafeAreaView>
    );
};

export default Companies;
