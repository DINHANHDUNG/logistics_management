import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import Modal from 'react-native-modal';

interface Value {
  key: string;
  value: string;
}

interface Props {
  isVisible: boolean;
  onClose: () => void;
  onSelectValue: (selectedValue: Value) => void;
  values: Array<Value>;
  title?: string; // Optional title prop
}

const SelectValueModal: React.FC<Props> = ({
  isVisible,
  onClose,
  onSelectValue,
  values,
  title = '', // Default value for title is an empty string
}) => {
  const screenHeight = Dimensions.get('window').height;
  const modalHeight = screenHeight * 0.3;

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      backdropOpacity={0.5}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      style={styles.modal}>
      <View style={[styles.modalView, {maxHeight: modalHeight}]}>
        {title !== '' && <Text style={styles.title}>{title}</Text>}
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {values.map(item => (
            <TouchableOpacity
              key={item.key}
              style={styles.itemContainer}
              onPress={() => {
                onSelectValue(item);
                onClose();
              }}>
              <Text style={styles.itemText}>{item.value}</Text>
              <View style={styles.line} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalView: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 6,
    width: '100%',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  scrollViewContent: {
    alignItems: 'center',
    width: '100%',
  },
  itemContainer: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  itemText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'black',
  },
  line: {
    backgroundColor: 'gray',
    opacity: 0.5,
    height: 1,
    marginTop: 5,
  },
});

export default SelectValueModal;