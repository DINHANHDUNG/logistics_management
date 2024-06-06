import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePickerModal from '../../components/modals/selectImgModal';
import HeaderCustom from '../../components/header';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {styles} from './style';
import SelectValueModal from '../../components/modals/selectModal';
import {useNavigation} from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';
import {useGetTrangThaiQuery} from '../../app/services/category';
import {authStore} from '../../app/features/auth/authSlice';
import {uploadImage, useAppSelector} from '../../app/hooks';
import {Platform} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import {API_URL, NetWork} from '../../common/apiKey';
import {MSG} from '../../common/contants';
import LoadingModal from '../../components/modals/loadingModal';

const validationSchema = yup.object().shape({
  IDTrangThaiVanChuyen: yup.string().required('Vui lòng nhập trạng thái'),
});

const ProcessingDetailScreen = ({route}: {route: any}) => {
  const {item: record} = route.params;
  console.log('record', record);

  const auth = useAppSelector(authStore);
  const {data: dataTrangThai} = useGetTrangThaiQuery(
    {ProductKey: auth.Key},
    {skip: !auth.Key},
  );
  const data = {} as any;
  // const {
  //   data,
  //   isLoading: loadingDetail,
  //   refetch,
  // } = useGetDetailDoDauQuery(
  //   {ProductKey: auth.Key, ID: record.ID},
  //   {skip: !record.ID},
  // );
  const navigate = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImages, setSelectedImages] = useState<Array<string>>([]);
  const [visibleDate, setVisibleDate] = useState(false);
  console.log('selectedImages', selectedImages);

  //Select
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState<any | null>(null);

  const handleValueSelect = (value: any) => {
    setSelectedValue(value);
  };

  const showHidenDate = () => {
    setVisibleDate(!visibleDate);
  };

  const showHidenStt = () => {
    setModalVisible(!modalVisible);
  };

  const [visibleDatePicker, setVisibleDatePicker] = useState(false);
  const [visibleTimePicker, setVisibleTimePicker] = useState(false);
  const [selectedField, setSelectedField] = useState(null as unknown as string);

  const handleConfirmDate = (date: any, setFieldValue: any) => {
    setFieldValue(selectedField, date);
    setVisibleDatePicker(false);
  };

  const handleConfirmTime = (time: any, setFieldValue: any) => {
    setFieldValue(selectedField, time);
    setVisibleTimePicker(false);
  };

  const [modalOptions, setModalOptions] = useState([]);
  const [modalField, setModalField] = useState('');

  const openModal = (field: any, options: any) => {
    setModalField(field);
    setModalOptions(options);
    setModalVisible(true);
  };

  const renderTitleModalSelect = () => {
    switch (modalField) {
      case 'IDTrangThaiVanChuyen':
        return 'Chọn trạng thái';

      default:
        return 'Chọn';
    }
  };

  const renderTrangThai = values => {
    return dataTrangThai?.find(
      e => e.ID === Number(values.IDTrangThaiVanChuyen),
    );
  };

  const deleteImg = (idx: number) => {
    const copyArr = [...selectedImages];
    console.log(idx);
    copyArr.splice(idx, 1);
    setSelectedImages(() => [...copyArr]);
  };

  const handleSubmit = async (val: any) => {
    setIsLoading(true);
    const NgayGioThucHien =
      moment(val.NgayTrangThai).format('YYYY/MM/DD') +
      ' ' +
      moment(val.GioTrangThai).format('HH:mm');

    const newD = [
      {
        name: 'data',
        data: JSON.stringify({
          IDChuyen: record.IDChuyen,
          ProductKey: auth.Key,
          IDTrangThaiVanChuyen: val.IDTrangThaiVanChuyen
            ? Number(val.IDTrangThaiVanChuyen)
            : '',
          IDUser: auth.IDUser,
          NgayGioThucHien: NgayGioThucHien,
        }),
      },
    ] as any;

    selectedImages.forEach((uri, index) => {
      const uploadUri =
        Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
      newD.push({
        name: 'file',
        filename: `image_${Math.random()}.jpg`,
        type: 'image/jpeg',
        data: RNFetchBlob.wrap(uploadUri),
      });
    });

    const res = (await uploadImage(
      API_URL + NetWork.UpdateTrangThaiVanChuyen,
      newD,
    )) as any;

    const req = JSON.parse(res.data) as any;

    console.log('res', JSON.parse(res.data));

    setIsLoading(false);
    if (req?.data.IDChuyen) {
      Alert.alert(MSG.success, MSG.updateSuccess, [
        {
          text: 'Cancel',
          onPress: () => navigate.goBack(),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => navigate.goBack()},
      ]);
    } else {
      Alert.alert(MSG.err, MSG.errAgain);
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <HeaderCustom
        title={`${'Chuyển trạng thái'}`}
        IconRight={<Icon name="history" size={16} />}
        onActionPress={() => navigate.navigate('HistoryStatusScreen')}
      />
      <View style={{flex: 1, padding: 20}}>
        <Formik
          initialValues={{
            IDTrangThaiVanChuyen: '',
            NgayTrangThai: data?.NgayGioThucHien
              ? moment(data.NgayGioThucHien).toDate()
              : new Date(),
            GioTrangThai: data?.NgayGioThucHien
              ? moment(data.NgayGioThucHien).toDate()
              : '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
          {({
            handleChange,
            setFieldValue,
            handleBlur,
            handleSubmit,
            values,
            errors,
          }) => (
            <View>
              <Text style={styles.label}>Trạng thái</Text>
              <TouchableOpacity
                style={styles.inputContainer}
                onPress={() =>
                  openModal('IDTrangThaiVanChuyen', dataTrangThai)
                }>
                <View style={styles.inputDate}>
                  <Text>
                    {values.IDTrangThaiVanChuyen
                      ? renderTrangThai(values)?.Name || ''
                      : 'Chọn trạng thái'}
                  </Text>
                </View>
                <Icon name="chevron-down" style={styles.iconInput} />
              </TouchableOpacity>
              {errors?.IDTrangThaiVanChuyen && (
                <Text style={styles.errorText}>
                  {errors?.IDTrangThaiVanChuyen}
                </Text>
              )}

              <Text style={styles.label}>Ngày thực hiện</Text>
              <TouchableOpacity
                style={styles.inputContainer}
                onPress={() => {
                  setVisibleDatePicker(true);
                  setSelectedField('NgayTrangThai');
                }}>
                <View style={styles.inputDate}>
                  <Text>
                    {values.NgayTrangThai
                      ? moment(values.NgayTrangThai).format('DD/MM/YYYY')
                      : 'Chọn ngày'}
                  </Text>
                </View>
                <Icon name="calendar" style={styles.iconInput} />
              </TouchableOpacity>
              {errors?.NgayTrangThai && (
                <Text style={styles.errorText}>{errors?.NgayTrangThai}</Text>
              )}

              <Text style={styles.label}>Giờ thực hiện</Text>
              <TouchableOpacity
                style={styles.inputContainer}
                onPress={() => {
                  setVisibleTimePicker(true);
                  setSelectedField('GioTrangThai');
                }}>
                <View style={styles.inputDate}>
                  <Text>
                    {values.GioTrangThai
                      ? moment(values.GioTrangThai).format('HH:mm')
                      : 'Chọn giờ'}
                  </Text>
                </View>
                <Icon name="clock-o" style={styles.iconInput} />
              </TouchableOpacity>
              {errors?.GioTrangThai && (
                <Text style={styles.errorText}>{errors?.GioTrangThai}</Text>
              )}

              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => setIsModalVisible(true)}>
                <Icon name="camera" size={20} color="#2196F3" />
                <Text style={{marginLeft: 10}}>Chọn ảnh</Text>
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

              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => handleSubmit()}>
                <Text style={styles.textBtn}>Lưu</Text>
              </TouchableOpacity>

              <DatePicker
                modal
                open={visibleDatePicker}
                date={new Date()}
                mode="date"
                locale="vi"
                onConfirm={date => handleConfirmDate(date, setFieldValue)}
                onCancel={() => setVisibleDatePicker(false)}
              />

              <DatePicker
                modal
                open={visibleTimePicker}
                date={new Date()}
                mode="time"
                is24hourSource="locale"
                locale="vi"
                onConfirm={time => handleConfirmTime(time, setFieldValue)}
                onCancel={() => setVisibleTimePicker(false)}
              />

              <SelectValueModal
                title={renderTitleModalSelect()}
                isVisible={modalVisible}
                onClose={() => setModalVisible(false)}
                onSelectValue={e => setFieldValue(modalField, e.ID)}
                values={modalOptions ?? []}
                keyRender={'Name'}
              />
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
      </View>
      <LoadingModal isVisible={isLoading} />
    </View>
  );
};

export default ProcessingDetailScreen;
