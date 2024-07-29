import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  TextInput,
} from 'react-native';
import Modal from 'react-native-modal';
interface Props {
  isVisible: boolean;
  onClose: () => void;
  onSelectValue: (selectedValue: any) => void;
  values: Array<any>;
  title?: string; // Optional title prop
  keyRender?: string;
  keySubRender?: string;
  onSearch?: boolean;
  onChangeSearch?: (e: string) => void;
  valueSearch?: string;
}

const SelectValueModal: React.FC<Props> = ({
  isVisible,
  onClose,
  onSelectValue,
  values,
  title = '', // Default value for title is an empty string
  keyRender,
  keySubRender,
  onSearch,
  onChangeSearch,
  valueSearch,
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
        {onSearch && (
          <TextInput
            style={styles.input}
            value={valueSearch || ''}
            onChangeText={e => onChangeSearch && onChangeSearch(e)}
            placeholder="Tìm kiếm"
          />
        )}
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {values.map((item: any, index) => (
            <TouchableOpacity
              key={item.ID || index}
              style={styles.itemContainer}
              onPress={() => {
                onSelectValue(item);
                onClose();
              }}>
              <Text style={styles.itemText}>
                {keyRender
                  ? keySubRender
                    ? item[keyRender] + ' - ' + item[keySubRender]
                    : item[keyRender]
                  : item.value}
              </Text>
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
  input: {
    borderWidth: 0.5,
    borderColor: 'gray',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
    marginBottom: 10,
    height: 40,
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
