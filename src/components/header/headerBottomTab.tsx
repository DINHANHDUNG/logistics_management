import React, {useState} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AccountModal from '../modals/accountModal';
import {colors} from '../../common/color';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const HomeHeader = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const onRightPress = () => {
    setModalVisible(!modalVisible);
  };

  const iconLogo = require('../../assets/images/logoPNG2.png');

  const insets = useSafeAreaInsets();

  return (
    <View style={styles.headerContainer}>
      <StatusBar
        animated={true}
        backgroundColor={colors.colorMain2}
        // barStyle={'slide'}
        translucent={false}
        hidden={false}
        barStyle={'dark-content'}
      />
      <View
        style={{
          height: Platform.OS === 'ios' ? insets.top : 0,
        }}></View>
      <View style={styles.headerItems}>
        <Image source={iconLogo ?? ''} style={styles.logoWrapper} />
        <TouchableOpacity onPress={onRightPress} style={styles.rightButton}>
          <Icon name="person-circle-outline" size={28} color="#fff" />
        </TouchableOpacity>
        <AccountModal visible={modalVisible} onClose={onRightPress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: colors.colorMain2,
  },
  headerItems: {
    height: 50,
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
