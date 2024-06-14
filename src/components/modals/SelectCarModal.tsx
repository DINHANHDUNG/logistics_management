import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {dataTransportTrip} from '../../types/transportTrip';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useAppSelector} from '../../app/hooks';
import {authStore} from '../../app/features/auth/authSlice';
import {useGetDetailQuery} from '../../app/services/vehicleCoordination';

interface SelectCarModalProps {
  visible: boolean;
  onClose: () => void;
  item: dataTransportTrip;
}

const SelectCarModal: React.FC<SelectCarModalProps> = ({
  visible,
  onClose,
  item,
}) => {
  const navigation = useNavigation();
  const auth = useAppSelector(authStore);
  const [enumType, setEnumType] = useState<Number | undefined>();

  console.log('item selected', item);

  const handleSelect = (type: 'Xe công ty' | 'Xe thuê') => {
    if (type === 'Xe công ty') {
      setEnumType(1);
    } else {
      setEnumType(2);
    }
    onClose();
  };

  const {isSuccess, isError, error} = useGetDetailQuery(
    {
      ProductKey: auth.Key,
      IDChuyen: item.IDChuyen,
      EnumThueXeOrXeMinh: enumType,
    },
    {skip: !item.IDChuyen || !enumType},
  );
  console.log('enumType', enumType);

  if (isError && enumType) {
    setEnumType(undefined);
    Alert.alert(error?.data);
  }
  if (isSuccess) {
    setEnumType(undefined);
    navigation.navigate(
      enumType === 1 ? 'CompanyVehicleScreen' : 'RentedVehicleScreen',
      {
        item,
      },
    );
  }

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Icon name="times" size={20} color="gray" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleSelect('Xe công ty')}>
            <Text style={styles.buttonText}>Xe công ty</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleSelect('Xe thuê')}>
            <Text style={styles.buttonText}>Xe thuê</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  button: {
    padding: 15,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
  },
  buttonText: {
    fontSize: 18,
  },
});

export default SelectCarModal;
