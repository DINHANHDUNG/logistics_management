import React, {useState} from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePickerModal from './selectImgModal';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Formik} from 'formik';
import {TextInputMask} from 'react-native-masked-text';
import {dataVehicleCoordination} from '../../types/vehicleCoordination';
import {authStore} from '../../app/features/auth/authSlice';
import {useAppSelector} from '../../app/hooks';
import moment from 'moment';
import RNFetchBlob from 'rn-fetch-blob';
import {ScrollView} from 'react-native';
import {ENUMSTATUS} from '../../common/contants';

interface Props {
  visible: boolean;
  status: number;
  onClose: () => void;
  submitForm: (data: any) => void;
  item: dataVehicleCoordination;
}

const UpdateStatusProcessingModal = ({
  visible,
  onClose,
  item,
  status,
  submitForm,
}: Props) => {
  const auth = useAppSelector(authStore);
  const [selectedImages, setSelectedImages] = useState<Array<string>>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSubmit = async (val: any) => {
    const newD = [
      {
        name: 'data',
        data: JSON.stringify({
          IDChuyen: item.IDChuyen,
          ProductKey: auth.Key,
          SoVo: val.SoVo ?? null,
        }),
      },
    ] as any;

    selectedImages.forEach((uri, index) => {
      const uploadUri =
        Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
      newD.push({
        name: 'file',
        filename: `image_${item.IDChuyen}_${moment().valueOf()}_${index}.jpg`,
        type: 'image/jpeg',
        data: RNFetchBlob.wrap(uploadUri),
      });
    });

    console.log('newD', newD);
    submitForm(newD);
  };

  const deleteImg = (idx: number) => {
    const copyArr = [...selectedImages];
    console.log(idx);
    copyArr.splice(idx, 1);
    setSelectedImages(() => [...copyArr]);
  };

  return (
    <Modal isVisible={visible} onBackdropPress={onClose} style={styles.modal}>
      <View style={styles.modalContent}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Icon name="close-outline" size={24} color="#333" />
        </TouchableOpacity>
        <KeyboardAwareScrollView
          // keyboardShouldPersistTaps={'always'}
          style={{flex: 1, padding: 20}}>
          <Formik
            initialValues={{
              SoVo: '',
            }}
            onSubmit={handleSubmit}>
            {({
              // handleChange,
              setFieldValue,
              handleBlur,
              handleSubmit,
              values,
              errors,
            }) => (
              <View>
                {ENUMSTATUS.ENTERSHELL === status && (
                  <>
                    <Text style={styles.label}>Số vỏ</Text>
                    <TextInputMask
                      style={styles.input}
                      type={'money'}
                      options={{
                        precision: 0, // Số lượng số sau dấu phẩy, 0 để không có số thập phân
                        separator: ',', // Dấu ngăn cách phần ngàn
                        delimiter: '.', // Dấu ngăn cách phần nghìn
                        unit: '', // Tiền tệ, bạn có thể đặt thành '$' hoặc '€' tùy ý
                        suffixUnit: '', // Đối với các trường hợp khác, bạn có thể đặt thành '%' nếu cần
                      }}
                      value={values.SoVo.toString()}
                      onChangeText={text => {
                        return setFieldValue('SoVo', text?.replace(/[.]/g, ''));
                      }}
                      onBlur={handleBlur('SoVo')}
                      placeholder="Nhập số vỏ"
                      keyboardType="numeric"
                    />
                    {errors?.SoVo && (
                      <Text style={styles.errorText}>{errors?.SoVo}</Text>
                    )}
                  </>
                )}

                {ENUMSTATUS.TAKEPHOTO === status && (
                  <>
                    <TouchableOpacity
                      style={styles.iconButton}
                      onPress={() => setIsModalVisible(true)}>
                      <Icon name="camera" size={20} color="#2196F3" />
                      <Text style={{marginLeft: 10, fontSize: 16}}>
                        Chọn ảnh
                      </Text>
                    </TouchableOpacity>

                    <ScrollView horizontal style={styles.imageContainer}>
                      {selectedImages?.map((image, index) => (
                        <View style={styles.ImgItem}>
                          <Image
                            key={index}
                            source={{uri: image}}
                            style={styles.image}
                          />
                          <TouchableOpacity
                            onPress={() => deleteImg(index)}
                            style={styles.icon_delete_img}>
                            <Icon name="close" color={'red'} size={15} />
                          </TouchableOpacity>
                        </View>
                      ))}
                    </ScrollView>

                    {selectedImages.length < 1 && (
                      <Text style={styles.errorText}>
                        {'Vui lòng chọn ảnh'}
                      </Text>
                    )}
                  </>
                )}

                <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={() => handleSubmit()}>
                  <Text style={styles.textBtn}>Lưu</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>

          <ImagePickerModal
            isVisible={isModalVisible}
            onClose={() => setIsModalVisible(false)}
            onSelectImage={e => {
              setSelectedImages(pre => [...pre, ...e]);
              setIsModalVisible(false);
            }}
            multiple={true}
          />
        </KeyboardAwareScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    width: '100%',
    height: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  label: {
    marginBottom: 5,
    marginTop: 12,
    fontWeight: '600',
    fontSize: 16,
  },
  input: {
    borderWidth: 0.5,
    borderColor: 'gray',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
    marginBottom: 5,
    minHeight: 40,
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginBottom: 5,
  },
  imageContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  ImgItem: {
    position: 'relative',
  },
  icon_delete_img: {
    position: 'absolute',
    right: 15,
    top: 5,
    color: 'red',
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 10,
  },
  buttonContainer: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 4,
    marginTop: 12,
  },
  textBtn: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  iconButton: {
    flexDirection: 'row',
    paddingVertical: 10,
    marginTop: 10,
  },
});

export default UpdateStatusProcessingModal;
