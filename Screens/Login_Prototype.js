import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { IconButton, TextInput } from 'react-native-paper';
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
        const response = await axios.post('http://192.168.1.15:3000/api/login', {
            email: values.email,
            password: values.password,
        });

        // Handle the response, store the token, and navigate to the next screen
            console.log(response.data);
        // Store the token (use AsyncStorage, Redux, or React Context) and navigate
            navigation.navigate('Home');
    } catch (error) {
        if (error.response && error.response.status === 401) {
        // Handle authentication failure
        setFieldError('password', 'Invalid email or password');
        } else {
            // Handle other errors as needed
        }
    } finally {
        setSubmitting(false);
    }
};

    return (
    <SafeAreaView>
        <View style={styles.container}>
        <Text style={styles.loginText}>Welcome back!</Text>
        <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={LoginSchema}
            onSubmit={handleLogin}
        >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
            <View>
                <TextInput
                    style={styles.loginTextInput}
                    placeholder="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                />
                {touched.email && errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
                )}

                <TextInput
                    style={styles.loginTextInput}
                    placeholder="Password"
                    autoCapitalize="none"
                    secureTextEntry
                    value={values.password}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                />
                {touched.password && errors.password && (
                    <Text style={styles.errorText}>{errors.password}</Text>
                )}

                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={handleSubmit}
                    disabled={isSubmitting}
                >
                <Text style={styles.loginTextButton}>Login</Text>
                </TouchableOpacity>
            </View>
            )}
        </Formik>
        {/* ... */}
        </View>
    </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '95%',
        width: 'auto',
        backgroundColor: '#ffffff',
    },
    loginText: {
        fontSize: 40,
        width: '60%',
        textAlign: 'center',
        marginBottom: 20,
        fontWeight: 'bold',
    },
        loginTextInput: {
        fontSize: 20,
        width: '80%',
        margin: 10,
        backgroundColor: 'white',
    },
    loginButton: {
        width: 340,
        marginTop: 40,
        padding: 15,
        backgroundColor: '#55bCF6',
        borderRadius: 25,
        elevation: 10,
    },
    loginTextButton: {
        color: 'white',
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        marginTop: 10,
    },
});
    
    export default Login;
// backgroundColor:'#E8EAED', // Gray
// backgroundColor: '#55bCF6', // Blue
