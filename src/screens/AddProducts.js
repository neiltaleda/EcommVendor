import {
  StyleSheet,
  Text,
  View,
  Switch,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
} from 'react-native';
import React, {useState} from 'react';
import CustomTextInput from '../images/components/CustomTextInput';
import CustomButton from '../images/components/CustomButton';
import {launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from '@react-native-firebase/firestore';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import storage from '@react-native-firebase/storage';
import Loader from '../images/components/Loader';

const AddProducts = () => {
  const [productName, setProductName] = useState('');
  const [productDesc, setProductDesc] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDiscountPrice, setProductDiscountPrice] = useState('');
  const [inStock, setInStock] = useState(true);
  const [visible, setVisible] = useState(false);
  const [imageData, setImageData] = useState({assets: [
    {
      uri: '',
    },
  ]});
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
        openGallery();
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const openGallery = async () => {
    const res = await launchImageLibrary({mediaType: 'photo'});
    if(!res.didCancel){
      setImageData(res);
    }
  };

  const saveProduct=async()=>{
    setVisible(true);
    const name = await AsyncStorage.getItem('NAME');
    const userId = await AsyncStorage.getItem('USERID');
    const productId = uuid.v4();
    const reference = storage().ref(imageData.assets[0].fileName);


    const pathToFile = imageData.assets[0].uri;
    await reference.putFile(pathToFile);
    const url = await storage.ref(imageData.assets[0].fileName).getDownloadURL();
    console.log(url);



    firestore().collection("products").doc(productId).set({
      productId: productId,
      userId: userId,
      addedBy: name,
      productName: productName,
      productDesc: productDesc,
      price: productPrice,
      discountPrice: productDiscountPrice,
      inStock: inStock,
      productImage: url,

    }).then(res => {
      setVisible(false);
    }).catch(error => {
      setVisible(false);
    });

  };

  return (
    <View style={styles.container}>
      <View style={styles.bannerView}>
        {imageData.assets[0].uri==''?(
          <TouchableOpacity onPress={()=>{
          requestCameraPermission();
        }}>
          <Image
            source={require('../images/camera.png')}
            style={styles.camera}
          />
        </TouchableOpacity>
        ):(
          <TouchableOpacity style={styles.banner} onPress={()=>{
            requestCameraPermission();
          }}>
            <Image
              source={{uri: imageData.assets[0].uri}}
              style={styles.banner}
            />
          </TouchableOpacity>
        )}
        
      </View>
      <CustomTextInput
        placeholder={'Enter Product Name'}
        value={productName}
        onChangeText={txt => setProductName(txt)}
      />
      <CustomTextInput
        placeholder={'Product description'}
        value={productDesc}
        onChangeText={txt => setProductDesc(txt)}
      />
      <CustomTextInput
        placeholder={'Price'}
        type={'number-pad'}
        value={productPrice}
        onChangeText={txt => setProductPrice(txt)}
      />
      <CustomTextInput
        placeholder={'Discount price'}
        type={'number-pad'}
        value={productDiscountPrice}
        onChangeText={txt => setProductDiscountPrice(txt)}
      />
      <View style={styles.stock}>
        <Text>In Stock</Text>
        <Switch
          value={inStock}
          onChange={() => {
            setInStock(!inStock);
          }}
        />
      </View>
      <CustomButton title={'Save Product'} onClick={() => {saveProduct()}} />
      <Loader visible={visible} />
    </View>
  );
};

export default AddProducts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    width: 50,
    height: 50,
  },
  bannerView: {
    width: '90%',
    height: 200,
    borderWidth: 0.5,
    alignSelf: 'center',
    marginTop: 30,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stock: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  banner: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
});
