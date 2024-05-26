import {
    TouchableOpacity,
    SafeAreaView,
    Image,
    View,
} from 'react-native';
import React, {
    useEffect,
    useState
} from 'react';
import styles from './stylesheet';
import {
    useColors
} from '../../utils/settings';
import {
    useNavigation
} from '@react-navigation/native';
import {
    Formik
} from 'formik';
import {
    signupSchema
} from '../validationSchema';
import axios from 'axios';
import {
    Button,
    TextInput,
    Text,
    useTheme,
    HelperText,
} from 'react-native-paper';
import {
    HOST
} from '../../constants';

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

    const handleSignup = ({
        name,
        email,
        password
    }) => {
        axios
            .post(`http://${HOST}:3000/user/signup`, {
                name,
                email,
                password,
            })
            .then(res => {
                if (res.data === true) {
                    navigation.navigate('LoginScreen');
                } else {
                    //console.log(res.data);
                }
            })
            .catch(err => {
                console.log(err);
            });
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
                        <HelperText
                            style={styles.helperText}
                            type="error"
                            visible={
                                errors.name && touched.name ? true : false
                            }>
                            {errors.name}
                        </HelperText>
                        <TextInput
                            style={styles.input}
                            mode="outlined"
                            label={'Email'}
                            value={values.email}
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            error={touched.email && errors.email}
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
                            }
                        >
                            {errors.password}
                        </HelperText>
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
                        <HelperText
                            style={styles.helperText}
                            type="error"
                            visible={
                                errors.confirmPassword &&
                                    touched.confirmPassword
                                    ? true
                                    : false
                            }>
                            {errors.confirmPassword}
                        </HelperText>
                        <Button
                            mode="contained"
                            onPress={handleSubmit}
                            style={{
                                marginTop: 20
                            }}>
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
                                style={{
                                    color: colors.primary, marginLeft: 15
                                }}>
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
