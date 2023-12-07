import React from 'react'
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const Navigation = useNavigation();

  const goLogin = () => {
    Navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.Body}>
      <TouchableOpacity style={styles.logoutButton} onPress={goLogin}>
        <Text style={styles.logoutText}>
          Logout
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  Body:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutButton:{
    borderRadius: 25,
    padding: 20,
    backgroundColor: '#55bCF6',
    elevation: 10,
  },
  logoutText:{
    fontSize: 40,
    color: 'white',
  },
})

export default Home