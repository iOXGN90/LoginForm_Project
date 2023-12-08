import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
});

    const Login = () => {
        const navigation = useNavigation();

    const handleLogin = async (values, { setSubmitting, setFieldError }) => {
        try {
        // Simulating API call to login
            const response = await axios.post('http://192.168.1.15:3000/api/login', {
                email: values.email,
                password: values.password,
            });

            console.log(response.data);

            // Simulating successful login, navigate to Home
                navigation.navigate('Home');
        } catch (error) {
            if (error.response && error.response.status === 401) {
                // Simulating authentication failure
                setFieldError('password', 'Invalid email or password');
                Alert.alert('Authentication Error', 'Invalid email or password');
            } else {
                // Handle other errors as needed
                Alert.alert('Error', 'An unexpected error occurred');
            }
        } finally {
            setSubmitting(false);
        }
        };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.loginText}>
                Welcome back!
            </Text>
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={LoginSchema}
                onSubmit={handleLogin}
            >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                <View style={styles.Body}>
                    <TextInput
                        style={styles.loginTextInput}
                        label="Email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={values.email}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        error={touched.email && errors.email}
                    />
                    <TextInput
                        style={styles.loginTextInput}
                        label="Password"
                        autoCapitalize="none"
                        secureTextEntry
                        value={values.password}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        error={touched.password && errors.password}
                    />

                    <TouchableOpacity style={styles.forgotpassButton} onPress={() => navigation.navigate('ForgotPassword')}>
                        <Text style={styles.forgotpassText}>
                            Forgot Password
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.loginButton}
                        mode="contained"
                        onPress={handleSubmit}
                        disabled={isSubmitting}
                    >
                        <Text style={styles.loginButtonText}>
                            Login
                        </Text>
                    </TouchableOpacity>

                    <View style={styles.signupWrapper}>
                        <Text style={styles.signupInfo}>
                            Don't have an account?
                        </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                            <Text style={styles.signupText}>
                                Sign up now!
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
            </Formik>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '95%',
        width: 'auto',
        backgroundColor: '#ffffff',
    },
    Body:{
        width: '100%',
        alignItems: 'center',
        justifyContent: 'relative',

    },
    loginText: {
        fontSize: 40,
        width: '60%',
        textAlign: 'center',
        marginBottom: 20,
        fontWeight: 'bold',
    },
    loginTextInput: {
        width: '80%',
        marginVertical: 25,
        backgroundColor: '#ffffff',
        fontSize: 20,
    },
    forgotpassButton: {
        flexDirection: 'row-reverse',
        width: '80%',
        marginTop: 10,
    },
    forgotpassText:{
        textDecorationLine: 'underline',
        fontSize: 15,
        color: '#55bCF6',
        fontWeight: 'bold',
    },
    loginButton: {
        width: 340,
        padding: 15,
        marginTop: 40,
        backgroundColor: '#55bCF6',
        borderRadius: 25,
        elevation: 10,
    },
    loginButtonText:{
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 25,
    },

    signupWrapper: {
        marginTop: 25,
        flexDirection: 'row',
    },
    signupInfo: {
        marginRight: 3,
        fontSize: 20,
    },
    signupText: {
        color: '#55bCF6',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default Login;
