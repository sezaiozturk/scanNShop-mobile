import {SafeAreaView, Image, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './stylesheet';
import {Button, TextInput, Checkbox, Text, useTheme} from 'react-native-paper';
import storage from '../../storage';
import {useColors} from '../../utils/settings';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {Formik} from 'formik';
import {loginSchema} from '../validationSchema';

const Login = () => {
    const [checked, setChecked] = useState(false);
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [load, setLoad] = useState(false);
    const theme = useTheme();
    const colors = useColors();
    const navigation = useNavigation();
    const [user, setUser] = useState({email: '', password: ''});

    const toggleSecureEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    };

    const toggleRememberMe = () => {
        setChecked(!checked);
        if (checked) storage.delete('user');
    };

    const handleRememberMe = () => {
        if (checked) {
            storage.set(
                'user',
                JSON.stringify({
                    email,
                    password,
                }),
            );
        } else {
            storage.delete('user');
        }
    };

    const handleLogin = ({email, password}) => {
        axios
            .post('http://172.31.4.196:3001/user/signup', {
                email,
                password,
            })
            .then(res => {
                handleRememberMe();
                navigation.navigate('CompaniesScreen');
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => setSubmitting(false));
    };

    useEffect(() => {
        const jsonUser = storage.getString('user');
        if (jsonUser) {
            const initialUser = JSON.parse(jsonUser);
            setUser({email: initialUser.email, password: initialUser.password});
            setChecked(true);
        }
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Image
                source={require('../../../assets/images/logo.png')}
                style={styles.logo}
            />
            <Formik
                initialValues={{
                    email: user.email,
                    password: user.password,
                }}
                validationSchema={loginSchema}
                onSubmit={handleLogin}
                enableReinitialize>
                {({
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    values,
                    touched,
                    errors,
                }) => (
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            mode="outlined"
                            label={'Email'}
                            value={values.email}
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            error={errors.email}
                        />
                        <TextInput
                            style={styles.input}
                            mode="outlined"
                            label={'Password'}
                            value={values.password}
                            onChangeText={handleChange('password')}
                            error={errors.password}
                            secureTextEntry={secureTextEntry}
                            right={
                                <TextInput.Icon
                                    icon={secureTextEntry ? 'eye' : 'eye-off'}
                                    onPress={toggleSecureEntry}
                                />
                            }
                        />
                        <TouchableOpacity
                            style={styles.rememberContainer}
                            onPress={toggleRememberMe}>
                            <Text variant="bodyMedium">Remember me !</Text>
                            <Checkbox
                                status={checked ? 'checked' : 'unchecked'}
                            />
                        </TouchableOpacity>
                        <Button
                            mode="contained"
                            onPress={handleSubmit}
                            style={{marginTop: 40}}>
                            Login
                        </Button>
                        <TouchableOpacity
                            style={styles.signupContainer}
                            onPress={() => navigation.navigate('SignupScreen')}>
                            <Text variant="bodyMedium">
                                Don't have an account!
                            </Text>
                            <Text
                                variant="titleMedium"
                                style={{color: colors.primary, marginLeft: 15}}>
                                Signup
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            </Formik>
        </SafeAreaView>
    );
};
export default Login;
