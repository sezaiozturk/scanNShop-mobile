import {FlatList, SafeAreaView, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {CompanyCard, FlatButton} from '../../components';
import axios from 'axios';
import {useEffect, useState} from 'react';
import style from './stylesheet';
import {useColors} from '../../utils/settings';
import {Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import storage from '../../storage';

const Companies = () => {
    const colors = useColors();
    const classes = style({colors});
    const [companies, setCompanies] = useState([]);
    const navigation = useNavigation();
    useEffect(() => {
        getCompanies();
    }, []);
    const getCompanies = () => {
        let temp = [];
        axios
            .post('http://172.31.8.32:3001/companies')
            .then(companies => {
                companies.data.map(company => {
                    temp.push(company);
                });
                setCompanies(temp);
            })
            .catch(err => console.log(err));
    };
    const renderItem = ({item}) => {
        return <CompanyCard name={item.companyName} id={item._id} />;
    };
    return (
        <SafeAreaView style={classes.container}>
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
            <Button
                style={{width: 50, backgroundColor: 'black', margin: 10}}
                onPress={() => {
                    /*storage.delete('user');
                    storage.delete('authToken');
                    navigation.reset({
                        index: 0,
                        routes: [{name: 'AuthStack'}],
                    });*/
                    axios.post('http://localhost:3000/user/deneme', {
                        _id: '65d6a75743e65ebe5aa9edc1',
                        shoppingCarts: [],
                    });
                }}>
                df
            </Button>
        </SafeAreaView>
    );
};
export default Companies;
