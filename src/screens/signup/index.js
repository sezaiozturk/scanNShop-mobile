import {SafeAreaView, Image, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './stylesheet';
import {Button, TextInput, Checkbox, Text, useTheme} from 'react-native-paper';
import storage from '../../storage';
import {useColors} from '../../utils/settings';
import {useNavigation} from '@react-navigation/native';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [checked, setChecked] = useState(false);
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const theme = useTheme();
    const colors = useColors();
    const user = {
        userName: 'Sezai',
        password: '11111',
    };
    const navigation = useNavigation();

    const toggleSecureEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    };

    const signup = () => {
        if (userName === user.userName && password === user.password) {
            navigation.navigate('CompaniesScreen');
        }
    };

    useEffect(() => {
        const jsonUser = storage.getString('user');
        if (jsonUser) {
            const initialUser = JSON.parse(jsonUser);
            setUserName(initialUser.userName);
            setPassword(initialUser.password);
            setChecked(true);
        }
    }, []);

    useEffect(() => {
        if (checked && userName != '' && password != '') {
            storage.set(
                'user',
                JSON.stringify({
                    userName,
                    password,
                }),
            );
        }
    }, [checked]);
    return (
        <SafeAreaView style={styles.container}>
            <Image
                source={require('../../../assets/images/logo.png')}
                style={styles.logo}
            />
            <View style={styles.inputContainer}>
                <TextInput
                    label="Email"
                    value={email}
                    mode="outlined"
                    style={styles.input}
                    onChangeText={text => setEmail(text)}
                />
                <TextInput
                    label="Name"
                    value={name}
                    mode="outlined"
                    style={styles.input}
                    onChangeText={text => setName(text)}
                />
                <TextInput
                    label="Password"
                    value={password}
                    mode="outlined"
                    style={styles.input}
                    activeOutlineColor={theme.colors.primary}
                    onChangeText={text => setPassword(text)}
                    secureTextEntry={secureTextEntry}
                    right={
                        <TextInput.Icon
                            icon={secureTextEntry ? 'eye' : 'eye-off'}
                            onPress={toggleSecureEntry}
                        />
                    }
                />
                <TextInput
                    label="Password Confirmation"
                    value={rePassword}
                    mode="outlined"
                    style={styles.input}
                    activeOutlineColor={theme.colors.primary}
                    onChangeText={text => setRePassword(text)}
                    secureTextEntry={secureTextEntry}
                    right={
                        <TextInput.Icon
                            icon={secureTextEntry ? 'eye' : 'eye-off'}
                            onPress={toggleSecureEntry}
                        />
                    }
                />
                <Button
                    mode="contained"
                    onPress={signup}
                    style={{marginTop: 40}}>
                    Signup
                </Button>
                <TouchableOpacity
                    style={styles.signupContainer}
                    onPress={() => navigation.navigate('LoginScreen')}>
                    <Text variant="bodyMedium">Do you have an account!</Text>
                    <Text
                        variant="titleMedium"
                        style={{color: colors.primary, marginLeft: 15}}>
                        Login
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};
export default Signup;
