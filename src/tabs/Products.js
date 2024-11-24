import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const Products = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    // Clear all user data from AsyncStorage
    try {
      await AsyncStorage.clear();
      Alert.alert('Logout Successful', 'You have been logged out.');
      navigation.navigate('Login'); // Navigate to Login screen
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Products</Text>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Products;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: '#FF5733',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
