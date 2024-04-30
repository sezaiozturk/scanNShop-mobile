import {
    FlatList,
    SafeAreaView
} from 'react-native';
import {
    FlatButton,
    ProductCard,
    TopBar
} from '../../components';
import axios from 'axios';
import {
    useEffect,
    useState
} from 'react';
import style from './stylesheet';
import {
    useColors
} from '../../utils/settings';
import {
    HOST
} from '../../constants';

const Products = ({
    navigation,
    route
}) => {
    const colors = useColors();
    const classes = style({
        colors
    });
    const [products, setProducts] = useState([]);
    const {
        id,
        name
    } = route.params;

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = () => {
        let temp = [];
        axios
            .post(`http://${HOST}:3000/admin/find`, {
                companyId: id
            })
            .then(products => {
                products.data.forEach(product => {
                    temp.push(product);
                });
                setProducts(temp);
            })
            .catch(err => console.log(err));
    };
    const renderItem = ({
        item,
        index
    }) => {
        return <ProductCard companyName={name} product={item} index={index} />;
    };
    return (
        <SafeAreaView style={classes.container}>
            <TopBar
                title={name}
                leftOne={{
                    name: 'chevron-left',
                    onPress: () => navigation.goBack(),
                }}
                rightOne={{
                    name: 'camera',
                    onPress: () => {
                        navigation.navigate('CameraScreen', {
                            productList: products,
                            from: "photo"
                        });
                        /*axios
                            .post(`http://${HOST}:3000/admin/run`)
                            .then((res) => {

                            })
                            .catch((err) => {
                                console.log(err);
                            });*/
                    }
                }}
                rightTwo={{
                    name: 'barcode-scan',
                    onPress: () => {
                        navigation.navigate('CameraScreen', {
                            productList: products,
                            from: "barcod"
                        });
                    },
                }}
            />
            <FlatList
                data={products}
                renderItem={renderItem}
                keyExtractor={item => item._id}
            />
            <FlatButton />
        </SafeAreaView>
    );
};
export default Products;
