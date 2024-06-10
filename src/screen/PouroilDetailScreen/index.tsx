import {Formik} from 'formik';
import React, {useState} from 'react';
import {
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import HeaderCustom from '../../components/header';
import {formatCurrency} from '../../utils';
import {styles} from './style';
import {validationSchema} from './schema';
import {
  useGetListLoaiXeQuery,
  useGetListXeVanChuyenQuery,
} from '../../app/services/category';
import {useAppSelector} from '../../app/hooks';
import {authStore} from '../../app/features/auth/authSlice';
import Icon from 'react-native-vector-icons/FontAwesome';
import SelectValueModal from '../../components/modals/selectModal';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import LoadingModal from '../../components/modals/loadingModal';
import {
  useGetDetailDoDauQuery,
  useUpdateDoDauMutation,
} from '../../app/services/pouroil';
import {Alert} from 'react-native';
import {MSG} from '../../common/contants';
import {useNavigation} from '@react-navigation/native';
import {TextInputMask} from 'react-native-masked-text';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const PouroilDetailScreen = ({route}: {route: any}) => {
  const {item: record} = route.params;
  const navigate = useNavigation();
  const auth = useAppSelector(authStore);
  const ID = record?.ID;
  const {
    data,
    isLoading: loadingDetail,
    refetch,
  } = useGetDetailDoDauQuery(
    {ProductKey: auth.Key, ID: record?.ID},
    {skip: !record?.ID},
  );
  const {data: dataLoaiXe} = useGetListXeVanChuyenQuery(
    {ProductKey: auth.Key},
    {skip: !auth.Key},
  );

  const [UpdateDoDau, {isLoading}] = useUpdateDoDauMutation();

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

  const [modalVisible, setModalVisible] = useState(false);
  const [modalOptions, setModalOptions] = useState([]);
  const [modalField, setModalField] = useState('');

  const openModal = (field: any, options: any) => {
    setModalField(field);
    setModalOptions(options);
    setModalVisible(true);
  };

  const renderTitleModalSelect = () => {
    switch (modalField) {
      case 'IDXeOto':
        return 'Chọn xe';

      default:
        return 'Chọn';
    }
  };

  const renderXe = values => {
    return dataLoaiXe?.find(e => e.ID === Number(values.IDXeOto));
  };

  const handleSubmit = val => {
    const NgayDoDauCal =
      moment(val.NgayDoDau).format('YYYY/MM/DD') +
      ' ' +
      moment(val.GioDoDau).format('HH:mm');
    const sl = val.SoLuong ? Number(val.SoLuong) : 0;
    const dg = val.DonGia ? Number(val.DonGia) : 0;

    const newData = {
      ProductKey: auth.Key,
      IDUser: auth.IDUser,
      IDXeOto: val.IDXeOto ? Number(val.IDXeOto) : '',
      SoLuong: sl,
      DonGia: dg,
      NgayDoDauCal: NgayDoDauCal,
      ThanhTien: val.ThanhTien,
      GhiChu: val.GhiChu,
    } as any;

    if (ID) {
      newData.ID = ID;
    }
    console.log('data truyền vào', newData);
    UpdateDoDau(newData).then((req: any) => {
      console.log(req);
      if (req?.data?.status === 200) {
        //Thêm mới thành công
        ID && refetch();
        Alert.alert(MSG.success, ID ? MSG.updateSuccess : MSG.addNew, [
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
    });
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <HeaderCustom title={`${!ID ? 'Thêm mới' : 'Cập nhật'} đổ dầu`} />
      <KeyboardAwareScrollView
        // keyboardShouldPersistTaps={'always'}
        contentContainerStyle={{flexGrow: 1, padding: 20}}>
        <Formik
          initialValues={{
            SoLuong: data?.SoLuong ?? 0,
            DonGia: data?.DonGia?.toString() || '',
            IDXeOto: data?.IDXeOto,
            GhiChu: data?.GhiChu,
            NgayDoDau: data?.NgayDoDauCal
              ? moment(data.NgayDoDauCal).toDate()
              : '',
            GioDoDau: data?.NgayDoDauCal
              ? moment(data.NgayDoDauCal).toDate()
              : '',
            ThanhTien: data?.ThanhTien?.toString() || '',
          }}
          enableReinitialize={true}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            values,
            errors,
            touched,
          }) => (
            <View>
              <Text style={styles.label}>Xe vận chuyển</Text>
              <TouchableOpacity
                style={styles.inputContainer}
                onPress={() => openModal('IDXeOto', dataLoaiXe)}>
                <View style={styles.inputDate}>
                  <Text>
                    {values.IDXeOto
                      ? (renderXe(values)?.BienSoXe || '') +
                        ' ' +
                        (renderXe(values)?.LaiXe || '')
                      : 'Chọn xe'}
                  </Text>
                </View>
                <Icon name="chevron-down" style={styles.iconInput} />
              </TouchableOpacity>
              {errors?.IDXeOto && touched.IDXeOto && (
                <Text style={styles.errorText}>{errors?.IDXeOto}</Text>
              )}

              <Text style={styles.label}>Ngày đổ dầu</Text>
              <TouchableOpacity
                style={styles.inputContainer}
                onPress={() => {
                  setVisibleDatePicker(true);
                  setSelectedField('NgayDoDau');
                }}>
                <View style={styles.inputDate}>
                  <Text>
                    {values.NgayDoDau
                      ? moment(values.NgayDoDau).format('DD/MM/YYYY')
                      : 'Chọn ngày'}
                  </Text>
                </View>
                <Icon name="calendar" style={styles.iconInput} />
              </TouchableOpacity>
              {errors?.NgayDoDau && touched.NgayDoDau && (
                <Text style={styles.errorText}>{errors?.NgayDoDau}</Text>
              )}

              <Text style={styles.label}>Giờ đổ dầu</Text>
              <TouchableOpacity
                style={styles.inputContainer}
                onPress={() => {
                  setVisibleTimePicker(true);
                  setSelectedField('GioDoDau');
                }}>
                <View style={styles.inputDate}>
                  <Text>
                    {values.GioDoDau
                      ? moment(values.GioDoDau).format('HH:mm')
                      : 'Chọn giờ'}
                  </Text>
                </View>
                <Icon name="clock-o" style={styles.iconInput} />
              </TouchableOpacity>
              {errors?.GioDoDau && touched.GioDoDau && (
                <Text style={styles.errorText}>{errors?.GioDoDau}</Text>
              )}

              <Text style={styles.label}>Số lượng</Text>
              {/* <TextInputMask
                style={styles.input}
                type={'money'}
                options={{
                  precision: 1, // Số lượng số sau dấu phẩy, 0 để không có số thập phân
                  separator: ',', // Dấu ngăn cách phần ngàn
                  delimiter: '.', // Dấu ngăn cách phần nghìn
                  unit: '', // Tiền tệ, bạn có thể đặt thành '$' hoặc '€' tùy ý
                  suffixUnit: '', // Đối với các trường hợp khác, bạn có thể đặt thành '%' nếu cần
                }}
                value={values.SoLuong.toString()}
                onChangeText={text => {
                  return setFieldValue('SoLuong', text?.replace(/[.]/g, ''));
                }}
                onBlur={handleBlur('SoLuong')}
                placeholder="Nhập đơn giá"
                keyboardType="numeric"
              /> */}
              <TextInput
                style={styles.input}
                onChangeText={handleChange('SoLuong')}
                onBlur={handleBlur('SoLuong')}
                // value={formatCurrency2(values.SoLuong)}
                value={values.SoLuong}
                placeholder="Nhập số lượng"
                keyboardType="numeric"
              />
              {errors?.SoLuong && (
                <Text style={styles.errorText}>{errors?.SoLuong}</Text>
              )}

              <Text style={styles.label}>Đơn giá</Text>
              {/* <TextInput
                style={styles.input}
                onChangeText={handleChange('DonGia')}
                onBlur={handleBlur('DonGia')}
                // value={formatCurrency2(values.DonGia)}
                value={values.DonGia}
                placeholder="Nhập đơn giá"
                keyboardType="numeric"
              /> */}
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
                value={values.DonGia.toString()}
                onChangeText={text =>
                  setFieldValue('DonGia', text?.replace(/[,.]/g, ''))
                }
                onBlur={handleBlur('DonGia')}
                placeholder="Nhập đơn giá"
                keyboardType="numeric"
              />
              {errors?.DonGia && (
                <Text style={styles.errorText}>{errors?.DonGia}</Text>
              )}

              <Text style={styles.label}>Thành tiền</Text>
              {/* <TextInput
                style={styles.input}
                onChangeText={handleChange('ThanhTien')}
                onBlur={handleBlur('ThanhTien')}
                // value={formatCurrency2(values.ThanhTien)}
                value={values.ThanhTien}
                placeholder="Thành tiền"
                keyboardType="numeric"
              /> */}
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
                value={values.ThanhTien}
                onChangeText={text => {
                  setFieldValue('ThanhTien', text?.replace(/[,.]/g, ''));
                }}
                onBlur={handleBlur('ThanhTien')}
                placeholder="Thành tiền"
                keyboardType="numeric"
              />
              {errors?.ThanhTien && (
                <Text style={styles.errorText}>{errors?.ThanhTien}</Text>
              )}

              <Text style={styles.label}>Ghi chú</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('GhiChu')}
                onBlur={handleBlur('GhiChu')}
                // value={formatCurrency2(values.GhiChu)}
                value={values.GhiChu}
                placeholder="Ghi chú"
              />
              {errors?.GhiChu && (
                <Text style={styles.errorText}>{errors?.GhiChu}</Text>
              )}

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
                keyRender={'BienSoXe'}
                keySubRender={'LaiXe'}
              />
            </View>
          )}
        </Formik>
      </KeyboardAwareScrollView>
      <LoadingModal isVisible={isLoading || loadingDetail} />
    </View>
  );
};

export default PouroilDetailScreen;
