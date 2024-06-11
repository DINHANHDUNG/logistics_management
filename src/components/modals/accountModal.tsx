import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from '../../common/color';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {authStore} from '../../app/features/auth/authSlice';
import {useAppSelector} from '../../app/hooks';
// import useResetProfileStackNavigator from '../misc/resetProfileStackNavigator';

interface Props {
  visible: boolean;
  onClose: () => void;
}

const AccountModal = ({visible, onClose}: Props) => {
  const navigation = useNavigation();
  // const resetProfileStackNavigator = useResetProfileStackNavigator();
  const auth = useAppSelector(authStore);
  const onLogout = () => {
    console.log('onLogout', navigation.getState()?.routes);
    navigation.navigate('LoginScreen');
  };

  return (
    <Modal isVisible={visible} onBackdropPress={onClose} style={styles.modal}>
      <View style={styles.modalContent}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Icon name="close-outline" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.username}>{auth.HoTen}</Text>
        <Text style={styles.role}>({auth.Username})</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
          <Text style={styles.logoutButtonText}>Đăng Xuất</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
    color: '#333',
  },
  role: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
  },
  logoutButton: {
    backgroundColor: colors.colorMain2,
    paddingVertical: 15,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default AccountModal;
