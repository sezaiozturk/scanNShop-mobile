import {SafeAreaView, Image, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './stylesheet';
import {
    Button,
    TextInput,
    Checkbox,
    Text,
    useTheme,
    HelperText,
    Snackbar,
} from 'react-native-paper';
import storage from '../../storage';
import {changeAuths, useColors} from '../../utils/settings';
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
    const [rememberUser, setRememberUser] = useState({email: '', password: ''});
    const [message, setMessage] = useState('');
    const [snackVisible, setSnackVisible] = useState(false);

    const toggleSecureEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    };

    const toggleRememberMe = () => {
        setChecked(!checked);
    };

    const toggleSnack = () => {
        setSnackVisible(!snackVisible);
    };

    const showMessage = message => {
        setMessage(message);
        toggleSnack();
    };

    const handleRememberMe = (email, password) => {
        if (checked) {
            storage.set(
                'remember',
                JSON.stringify({
                    email,
                    password,
                }),
            );
        } else {
            storage.delete('remember');
        }
    };

    const handleLogin = ({email, password}) => {
        axios
            .post('http://localhost:3000/user/login', {
                email,
                password,
            })
            .then(res => {
                const user = res.data;
                if (user) {
                    const authToken = res.headers['x-auth-token'];
                    storage.set('authToken', authToken);
                    storage.set('user', JSON.stringify(user));
                    handleRememberMe(email, password);
                    navigation.reset({
                        index: 0,
                        routes: [{name: 'CompaniesScreen'}],
                    });
                } else {
                    showMessage(res.data);
                }
            })
            .catch(err => {
                console.log(err);
            });
    };

    useEffect(() => {
        const rememberUser = storage.getString('remember');
        if (rememberUser) {
            const initialUser = JSON.parse(rememberUser);
            setRememberUser({
                email: initialUser.email,
                password: initialUser.password,
            });
            setChecked(true);
        }
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Image
                source={require('../../assets/images/logo.png')}
                style={styles.logo}
            />
            <Formik
                initialValues={{
                    email: rememberUser.email,
                    password: rememberUser.password,
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
                            error={touched.email && errors.email}
                            secureTextEntry={false}
                            right={null}
                        />
                        <HelperText
                            style={styles.helperText}
                            type="error"
                            visible={
                                errors.email && touched.email ? true : false
                            }>
                            {errors.email}
                        </HelperText>
                        <TextInput
                            style={styles.input}
                            mode="outlined"
                            label={'Password'}
                            value={values.password}
                            onChangeText={handleChange('password')}
                            error={touched.password && errors.password}
                            secureTextEntry={secureTextEntry}
                            right={
                                <TextInput.Icon
                                    icon={secureTextEntry ? 'eye' : 'eye-off'}
                                    onPress={toggleSecureEntry}
                                />
                            }
                        />
                        <HelperText
                            style={styles.helperText}
                            type="error"
                            visible={
                                errors.password && touched.password
                                    ? true
                                    : false
                            }>
                            {errors.password}
                        </HelperText>
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
            <Snackbar
                visible={snackVisible}
                duration={1500}
                onDismiss={toggleSnack}>
                {message}
            </Snackbar>
        </SafeAreaView>
    );
};
export default Login;
