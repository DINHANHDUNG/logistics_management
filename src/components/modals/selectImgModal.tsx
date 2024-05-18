import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import ImagePicker from 'react-native-image-crop-picker';

interface Props {
  isVisible: boolean;
  onClose: () => void;
  onSelectImage?: (imgs: Array<string>) => void;
  multiple?: boolean;
}

const ImagePickerModal: React.FC<Props> = ({
  isVisible,
  onClose,
  onSelectImage,
  multiple,
}) => {
  const selectImageFromLibrary = () => {
    ImagePicker.openPicker({
      multiple: multiple,
      cropping: !multiple,
      mediaType: 'photo',
    })
      .then(images => {
        const selectedImages = Array.isArray(images) ? images : [images];
        const arr = selectedImages.map(image => image.path);
        onSelectImage && onSelectImage(arr);
        onClose();
      })
      .catch(error => {
        console.error('ImagePicker Error: ', error);
        onClose();
      });
  };

  const uploadImage = () => {
    ImagePicker.openCamera({
      cropping: true,
    })
      .then(image => {
        onSelectImage && onSelectImage([image.path]);
        onClose();
      })
      .catch(error => {
        console.error('ImagePicker Error: ', error);
        onClose();
      });
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      backdropOpacity={0.5}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      style={styles.modal}>
      <View style={styles.modalView}>
        <TouchableOpacity style={styles.button} onPress={uploadImage}>
          <Text style={styles.buttonText}>Chụp ảnh</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={selectImageFromLibrary}>
          <Text style={styles.buttonText}>Chọn từ thư viện</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onClose}>
          <Text style={styles.buttonText}>Hủy</Text>
        </TouchableOpacity>
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
    alignItems: 'center',
  },
  button: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    width: '100%',
    // alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    // textAlign: 'center',
    fontWeight: '500',
    color: 'black',
  },
  cancelButton: {
    backgroundColor: '#ff3b30',
  },
  cancelButtonText: {
    color: 'white',
  },
});

export default ImagePickerModal;
