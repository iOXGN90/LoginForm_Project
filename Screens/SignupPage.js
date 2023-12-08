import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconButton, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const SignupSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

const SignupPage = () => {
  const Navigation = useNavigation();

  const handleSignup = async (values, { setSubmitting, setFieldError, resetForm }) => {
    try {
      const response = await axios.post('http://192.168.1.15:3000/api/registers', {
        name: values.name,
        email: values.email,
        password: values.password,
        c_password: values.confirmPassword,
      });

      console.log(response.data);
      Navigation.navigate('SignupConfirmation');

      // Reset the form to clear the text inputs
      resetForm();
    } catch (error) {
      if (error.response && (error.response.status === 404 || error.response.status === 409)) {
        // HTTP status 404 corresponds to Not Found (Email already taken)
        // HTTP status 409 corresponds to Conflict (Email already taken)
        // Handle the specific error here, e.g., display a message to the user
        setFieldError('email', 'Email already taken. Please choose another.');
      } else {
        // Handle other errors as needed
      }
    } finally {
      setSubmitting(false);
    }
  };

  const goBack = () => {
    Navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.Container}>
      <View style={styles.Header}>
        <TouchableOpacity onPress={goBack}>
          <IconButton icon={'arrow-left'} />
        </TouchableOpacity>
      </View>
      <View style={styles.Body}>
        <Text style={styles.createAccountText}>Create Account</Text>
        <Formik
          style={styles.Container}
          initialValues={{
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={SignupSchema}
          onSubmit={handleSignup}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            resetForm, // Added resetForm from Formik
          }) => (
            <View>
              <TextInput
                style={styles.signupTextInput}
                label={"Name"}
                autoCapitalize="sentences"
                value={values.name}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
              />
              {touched.name && errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

              <TextInput
                style={styles.signupTextInput}
                label={"Email"}
                autoCapitalize="none"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
              />
              {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

              <TextInput
                style={styles.signupTextInput}
                label={"Password"}
                autoCapitalize="none"
                secureTextEntry
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                require
              />
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}

              <TextInput
                style={styles.signupTextInput}
                label={"Confirm Password"}
                autoCapitalize="none"
                secureTextEntry
                value={values.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <Text style={styles.errorText}>{errors.confirmPassword}</Text>
              )}

              {isSubmitting ? (
                <ActivityIndicator color="white" />
              ) : (
                <TouchableOpacity
                  style={styles.signupButton}
                  onPress={handleSubmit}
                  disabled={isSubmitting}
                >
                  <Text style={styles.signupText}>
                    Sign up
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  Header: {
    height: '5%',
  },
  Body: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '90%',
  },
  createAccountText: {
    fontSize: 40,
    marginBottom: 20,
  },
  signupTextInput: {
    marginTop: 5,
    fontSize: 20,
    width: 340,
    padding: 5,
    marginVertical: 25,
    backgroundColor: '#ffffff',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  signupButton: {
    width: 340,
    padding: 15,
    marginTop: 20,
    backgroundColor: '#55bCF6',
    borderRadius: 25,
    elevation: 10,
  },
  signupText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 25,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default SignupPage;