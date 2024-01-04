import {FlatList, SafeAreaView, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {CompanyCard, ProductCard} from '../../components';
import axios from 'axios';
import {useEffect, useState} from 'react';
import style from './stylesheet';
import {useColors} from '../../utils/settings';

const Products = ({route}) => {
    const colors = useColors();
    const classes = style({colors});
    const [products, setProducts] = useState([]);
    const {id} = route.params;
    useEffect(() => {
        getProducts();
    }, []);
    const getProducts = () => {
        let temp = [];
        axios
            .post('http://localhost:3001/admin/find', {companyId: id})
            .then(products => {
                products.data.map(product => {
                    temp.push(product);
                });
                setProducts(temp);
            })
            .catch(err => console.log(err));
    };
    const renderItem = ({item, index}) => {
        return <ProductCard product={item} index={index} />;
    };
    return (
        <SafeAreaView style={classes.container}>
            <FlatList
                data={products}
                renderItem={renderItem}
                keyExtractor={item => item._id}
            />
        </SafeAreaView>
    );
};
export default Products;
