import {SafeAreaView, Image, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './stylesheet';
import {Button, TextInput, Checkbox, Text, useTheme} from 'react-native-paper';
import {useColors} from '../../utils/settings';
import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import {signupSchema} from '../validationSchema';
import axios from 'axios';

const Signup = () => {
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [secureTextEntry2, setSecureTextEntry2] = useState(true);
    const theme = useTheme();
    const colors = useColors();
    const navigation = useNavigation();

    const toggleSecureEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    };

    const toggleSecureEntry2 = () => {
        setSecureTextEntry2(!secureTextEntry2);
    };

    const handleSignup = ({name, email, password}) => {
        axios
            .post('http://localhost:3000/user/signup', {
                name,
                email,
                password,
            })
            .then(res => {
                console.log(res.headers);
                //navigation.navigate('LoginScreen');
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => null);
    };
    return (
        <SafeAreaView style={styles.container}>
            <Image
                source={require('../../assets/images/logo.png')}
                style={styles.logo}
            />
            <Formik
                initialValues={{
                    name: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                }}
                validationSchema={signupSchema}
                onSubmit={handleSignup}>
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
                            label={'Name'}
                            value={values.name}
                            onChangeText={handleChange('name')}
                            onBlur={handleBlur('name')}
                            error={touched.name && errors.name}
                        />
                        <TextInput
                            style={styles.input}
                            mode="outlined"
                            label={'Email'}
                            value={values.email}
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            error={touched.email && errors.email}
                        />
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
                        <TextInput
                            style={styles.input}
                            mode="outlined"
                            label={'Confirm Password'}
                            value={values.confirmPassword}
                            onChangeText={handleChange('confirmPassword')}
                            error={
                                touched.confirmPassword &&
                                errors.confirmPassword
                            }
                            secureTextEntry={secureTextEntry2}
                            right={
                                <TextInput.Icon
                                    icon={secureTextEntry2 ? 'eye' : 'eye-off'}
                                    onPress={toggleSecureEntry2}
                                />
                            }
                        />
                        <Button
                            mode="contained"
                            onPress={handleSubmit}
                            style={{marginTop: 40}}>
                            Signup
                        </Button>
                        <TouchableOpacity
                            style={styles.signupContainer}
                            onPress={() => navigation.navigate('LoginScreen')}>
                            <Text variant="bodyMedium">
                                Do you have an account!
                            </Text>
                            <Text
                                variant="titleMedium"
                                style={{color: colors.primary, marginLeft: 15}}>
                                Login
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            </Formik>
        </SafeAreaView>
    );
};
export default Signup;
