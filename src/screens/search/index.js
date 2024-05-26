import {
    TouchableOpacity,
    SafeAreaView,
    Text,
    View,
    Image,
    FlatList,
} from 'react-native';
import style from './stylesheet';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
    useColors
} from '../../utils/settings';
import {
    useEffect,
    useRef,
    useState,
} from 'react';
import {
    EmptyCard,
    ProductCard,
    TopBar
} from '../../components';
import {
    HOST
} from '../../constants';

const Search = ({
    navigation,
    route
}) => {
    const colors = useColors();
    const classes = style({
        colors
    });
    const {
        filterProducts,
        allProducts,
        similarIds,
        companies
    } = route.params;
    const [products, setProducts] = useState([]);

    useEffect(() => {
        let temp = [];
        if (similarIds) {
            similarIds.forEach((id) => {
                allProducts.forEach((product) => {
                    if (product.image.split("/")[1] === id) {
                        const company = companies.find(company => company._id === product.companyId);
                        temp.push({
                            ...product,
                            companyName: company.companyName
                        });
                    }
                });
            });
            setProducts(temp);
        } else {
            filterProducts.forEach((product) => {
                const company = companies.find(company => company._id === product.companyId);
                temp.push({
                    ...product,
                    companyName: company.companyName
                });
            });
            setProducts(temp);
        }
    }, []);

    const renderItem = ({
        item,
        index
    }) => {
        return <TouchableOpacity
            style={classes.card}
            activeOpacity={0.5}
            key={index}
            onPress={() => navigation.navigate("ProductsScreen", {
                id: item.companyId,
                name: item.companyName
            })}
        >
            <Text
                style={classes.companyName}
            >
                {item.companyName}
            </Text>
            <Image
                style={classes.image}
                source={{
                    uri: `http://${HOST}:3000/${item.image}`
                }}
            />
            <Text
                style={classes.name}
            >
                {item.name}
            </Text>
            <View
                style={classes.priceContainer}
            >
                <Text
                    style={classes.price}
                >
                    {item.price}
                </Text>
                <Text
                    style={classes.currency}
                >
                    TL
                </Text>
            </View>
        </TouchableOpacity>;
    };

    return (
        <SafeAreaView style={classes.container}>
            <TopBar
                leftOne={{
                    name: 'chevron-left',
                    onPress: () => navigation.goBack(),
                }}
                title={"All Searches"}
            />
            <FlatList
                data={products}
                renderItem={renderItem}
                keyExtractor={item => item._id}
                numColumns={2}
                ListEmptyComponent={
                    <EmptyCard
                        icon={"magnify-remove-outline"}
                        title={"No Product Found"}
                    />
                }
                tosc
                columnWrapperStyle={{
                    flex: 1,
                    gap: 10,
                    paddingHorizontal: 20,

                }}
                contentContainerStyle={{
                    gap: 10,
                }}
            />
        </SafeAreaView>
    );
};
export default Search;
