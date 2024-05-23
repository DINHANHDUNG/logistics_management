import React, {useState} from 'react';
import {View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AccountModal from '../modals/accountModal';

const HomeHeader = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const onRightPress = () => {
    setModalVisible(!modalVisible);
  };

  const iconLogo = require('../../assets/images/logoPNG2.png');

  return (
    <View style={styles.headerContainer}>
      <Image source={iconLogo ?? ''} style={styles.logoWrapper} />
      <TouchableOpacity onPress={onRightPress} style={styles.rightButton}>
        <Icon name="person-circle-outline" size={28} color="#fff" />
      </TouchableOpacity>
      <AccountModal visible={modalVisible} onClose={onRightPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 60,
    backgroundColor: 'tomato',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  logoWrapper: {
    width: 120,
    // height: 40,
    resizeMode: 'contain',
    // borderRadius: 30,
    // backgroundColor: '#fff',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  // logo: {
  //   width: 50,
  //   height: 50,
  //   resizeMode: 'contain',
  // },
  rightButton: {
    padding: 10,
  },
});

export default HomeHeader;
