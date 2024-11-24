import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import Products from '../tabs/Products';
import Orders from '../tabs/Orders';
import { THEME_COLOR } from '../utils/Colors';
import { useNavigation } from '@react-navigation/native';

const Main = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
         {selectedTab == 0 ?( <Products />) : (<Orders />)}
      <View style={styles.bottomView}>
        <TouchableOpacity
          onPress={() => {
            setSelectedTab(0);
          }}>
          <Image
            source={require('../images/products.png')}
            style={[styles.icons, {tintColor: selectedTab===0 ? THEME_COLOR : '#000'}]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('AddProducts');
          }}>
          <Image source={require('../images/add.png')} style={styles.add} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSelectedTab(2);
          }}>
          <Image
            source={require('../images/orders.png')}
            style={[styles.icons, {tintColor: selectedTab===1 ? THEME_COLOR : '#000'}]}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomView: {
    backgroundColor: '#FFF',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 5,
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icons: {
    width: 30,
    height: 30,
    marginHorizontal: 10,
  },
  add: {
    width: 50,
    height: 50,
  },
});
