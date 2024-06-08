import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  Alert,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import HeaderCustom from '../../components/header';
import SelectValueModal from '../../components/modals/selectModal';
import {styles} from './style';
import {useAppSelector} from '../../app/hooks';
import {authStore} from '../../app/features/auth/authSlice';
import {
  useGetListDiaDiemQuery,
  useGetListHangHoaQuery,
  useGetListKHQuery,
  useGetListLoaiXeQuery,
} from '../../app/services/category';
import {validationSchema} from './schema';
import {dataSubmit} from '../../types/transportTrip';
import {
  useAddTransportTripMutation,
  useGetDetailQuery,
  useUpdateTransportTripMutation,
} from '../../app/services/transportTrip';
import {MSG} from '../../common/contants';
import LoadingModal from '../../components/modals/loadingModal';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const TransportTripDetailScreen = ({route}: {route: any}) => {
  const {item: record} = route.params;
  console.log('record', record);

  const navigate = useNavigation();
  const auth = useAppSelector(authStore);
  const [addTransportTrip, {isLoading}] = useAddTransportTripMutation();
  const [updateTransportTrip, {isLoading: loadingUpdate}] =
    useUpdateTransportTripMutation();
  const {
    data,
    isLoading: loadingDetail,
    refetch,
  } = useGetDetailQuery(
    {ProductKey: auth.Key, IDChuyen: record.IDChuyen},
    {skip: !record.IDChuyen},
  );

  const [initialValues, setInitialValues] = useState({
    NgayDongHang: new Date(),
    GioDongHang: '' as any,
    NgayTraHang: new Date(),
    GioTraHang: '' as any,
    IDDiemDi: '',
    IDDiemDen: '',
    IDHangHoa: '',
    SoKG: '',
    SoKhoi: '',
    SoPL: '',
    FlagHangVe: false,
    ThoiGianVe: '' as any,
    IDKhachHang: '',
    IDLoaiXe: '',
  });

  console.log('initialValues', initialValues);

  console.log('data', data);

  // Fetching data for select fields
  const {data: dataKH} = useGetListKHQuery(
    {ProductKey: auth.Key},
    {skip: !auth.Key},
  );
  const {data: dataLoaiXe} = useGetListLoaiXeQuery(
    {ProductKey: auth.Key},
    {skip: !auth.Key},
  );
  const {data: dataHangHoa} = useGetListHangHoaQuery(
    {ProductKey: auth.Key},
    {skip: !auth.Key},
  );
  const {data: dataDiaDiem} = useGetListDiaDiemQuery(
    {ProductKey: auth.Key},
    {skip: !auth.Key},
  );

  const [visibleDatePicker, setVisibleDatePicker] = useState(false);
  const [visibleTimePicker, setVisibleTimePicker] = useState(false);
  const [selectedField, setSelectedField] = useState(null as unknown as string);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalOptions, setModalOptions] = useState([]);
  const [modalField, setModalField] = useState('');

  const handleConfirmDate = (date: any, setFieldValue: any) => {
    setFieldValue(selectedField, date);
    setVisibleDatePicker(false);
  };

  const handleConfirmTime = (time: any, setFieldValue: any) => {
    setFieldValue(selectedField, time);
    setVisibleTimePicker(false);
  };

  const openModal = (field: any, options: any) => {
    setModalField(field);
    setModalOptions(options);
    setModalVisible(true);
  };

  const renderTitleModalSelect = () => {
    switch (modalField) {
      case 'IDDiemDi':
        return 'Chọn điểm đi';

      case 'IDDiemDen':
        return 'Chọn điểm đến';

      case 'IDHangHoa':
        return 'Chọn hàng hóa';

      case 'IDKhachHang':
        return 'Chọn khách hàng';

      case 'IDLoaiXe':
        return 'Chọn loại xe';

      default:
        return 'Chọn';
    }
  };

  const handleSubmit = (val: dataSubmit) => {
    const ngayDongHang =
      moment(val.NgayDongHang).format('YYYY/MM/DD') +
      ' ' +
      moment(val.GioDongHang).format('HH:mm');
    const ngayTraHang =
      moment(val.NgayTraHang).format('YYYY/MM/DD') +
      ' ' +
      moment(val.GioTraHang).format('HH:mm');

    const ngayGioDongHang = moment(val.NgayDongHang).set({
      hour: moment(val.GioDongHang).hours(),
      minute: moment(val.GioDongHang).minutes(),
    });
    const ngayGioTraHang = moment(val.NgayTraHang).set({
      hour: moment(val.GioTraHang).hours(),
      minute: moment(val.GioTraHang).minutes(),
    });
    if (ngayGioTraHang < ngayGioDongHang) {
      Alert.alert(
        MSG.err,
        'Ngày và giờ trả hàng phải sau ngày và giờ đóng hàng',
      );
      return;
    }
    //Check thời gian ngày đóng ngày trả (Đóng trả phải lớn hơn đóng)
    const newData = {
      ProductKey: auth.Key,
      IDUser: auth.IDUser,
      IDDiemDen: val.IDDiemDen ? Number(val.IDDiemDen) : '',
      IDDiemDi: val.IDDiemDi ? Number(val.IDDiemDi) : '',
      IDHangHoa: val.IDHangHoa ? Number(val.IDHangHoa) : '',
      IDKhachHang: val.IDKhachHang ? Number(val.IDKhachHang) : '',
      IDLoaiXe: val.IDLoaiXe ? Number(val.IDLoaiXe) : '',
      SoKhoi: val.SoKhoi ? Number(val.SoKhoi) : '',
      SoKG: val.SoKG ? Number(val.SoKG) : '',
      NgayDongHang: ngayDongHang,
      NgayTraHang: ngayTraHang,
      SoPL: val.SoPL,
      FlagHangVe: val.FlagHangVe,
      ThoiGianVe: val.ThoiGianVe
        ? moment(val.ThoiGianVe).format('YYYY/MM/DD HH:mm')
        : '',
    } as any;

    if (record?.IDChuyen) {
      newData.IDChuyen = record?.IDChuyen;
      console.log('data truyền vào', newData);
      updateTransportTrip(newData).then((req: any) => {
        console.log(req);
        if (req?.data?.status === 200) {
          //Thêm mới thành công
          refetch();
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
      });
      return;
    }
    console.log('newData', newData);

    addTransportTrip(newData).then((req: any) => {
      console.log(req);
      if (req?.data?.status === 200) {
        //Thêm mới thành công
        Alert.alert(MSG.success, MSG.addNew, [
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

  useEffect(() => {
    if (!loadingDetail && data) {
      setInitialValues({
        NgayDongHang: data.NgayDongHang
          ? moment(data.NgayDongHang).toDate()
          : new Date(),
        GioDongHang: data.NgayDongHang
          ? moment(data.NgayDongHang).toDate()
          : '',
        NgayTraHang: data.NgayTraHang
          ? moment(data.NgayTraHang).toDate()
          : new Date(),
        GioTraHang: data.NgayTraHang ? moment(data.NgayTraHang).toDate() : '',
        IDDiemDi: data.IDDiemDi ?? '',
        IDDiemDen: data.IDDiemDen ?? '',
        IDHangHoa: data.IDDMHangHoa ?? '',
        SoKG: data.SoKG ? data.SoKG.toString() : '',
        SoKhoi: data.SoKhoi ? data.SoKhoi.toString() : '',
        SoPL: data.SoPL ? data.SoPL.toString() : '',
        FlagHangVe: data.FlagHangVe ?? false,
        ThoiGianVe: data.ThoiGianVe ? moment(data.ThoiGianVe).toDate() : '',
        IDKhachHang: data.IDKhachHang ?? '',
        IDLoaiXe: data.IDLoaiXe ?? '',
      });
    }
  }, [loadingDetail]);

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <HeaderCustom
        title={`${
          record?.IDChuyen ? 'Cập nhật' : 'Thêm mới'
        } chuyến vận chuyển`}
      />
      <KeyboardAwareScrollView
        // keyboardShouldPersistTaps={'always'}
        contentContainerStyle={{flexGrow: 1, padding: 20}}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize={true}
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
              <Text style={styles.label}>Khách hàng</Text>
              <TouchableOpacity
                style={styles.inputContainer}
                onPress={() => openModal('IDKhachHang', dataKH)}>
                <View style={styles.inputDate}>
                  <Text>
                    {values.IDKhachHang
                      ? dataKH?.find(e => e.ID === Number(values.IDKhachHang))
                          ?.Name
                      : 'Chọn khách hàng'}
                  </Text>
                </View>
                <Icon name="chevron-down" style={styles.iconInput} />
              </TouchableOpacity>
              {errors?.IDKhachHang && touched.IDKhachHang && (
                <Text style={styles.errorText}>{errors?.IDKhachHang}</Text>
              )}

              <Text style={styles.label}>Mã hàng hóa</Text>
              <TouchableOpacity
                style={styles.inputContainer}
                onPress={() => openModal('IDHangHoa', dataHangHoa)}>
                <View style={styles.inputDate}>
                  <Text>
                    {values.IDHangHoa
                      ? dataHangHoa?.find(
                          e => e.ID === Number(values.IDHangHoa),
                        )?.Name
                      : 'Chọn hàng hóa'}
                  </Text>
                </View>
                <Icon name="chevron-down" style={styles.iconInput} />
              </TouchableOpacity>
              {errors?.IDHangHoa && touched.IDHangHoa && (
                <Text style={styles.errorText}>{errors?.IDHangHoa}</Text>
              )}

              <Text style={styles.label}>Loại xe</Text>
              <TouchableOpacity
                style={styles.inputContainer}
                onPress={() => openModal('IDLoaiXe', dataLoaiXe)}>
                <View style={styles.inputDate}>
                  <Text>
                    {values.IDLoaiXe
                      ? dataLoaiXe?.find(e => e.ID === Number(values.IDLoaiXe))
                          ?.Name
                      : 'Chọn loại xe'}
                  </Text>
                </View>
                <Icon name="chevron-down" style={styles.iconInput} />
              </TouchableOpacity>
              {errors?.IDLoaiXe && touched.IDLoaiXe && (
                <Text style={styles.errorText}>{errors?.IDLoaiXe}</Text>
              )}

              <View style={styles.row}>
                <View style={styles.itemRow}>
                  <Text style={styles.label}>Ngày đóng hàng</Text>
                  <TouchableOpacity
                    style={styles.inputContainer}
                    onPress={() => {
                      setVisibleDatePicker(true);
                      setSelectedField('NgayDongHang');
                    }}>
                    <View style={styles.inputDate}>
                      <Text>
                        {values.NgayDongHang
                          ? moment(values.NgayDongHang).format('DD/MM/YYYY')
                          : 'Chọn ngày'}
                      </Text>
                    </View>
                    <Icon name="calendar" style={styles.iconInput} />
                  </TouchableOpacity>
                  {errors?.NgayDongHang && touched.NgayDongHang && (
                    <Text style={styles.errorText}>{errors?.NgayDongHang}</Text>
                  )}
                </View>

                <View style={styles.itemRow}>
                  <Text style={styles.label}>Giờ đóng hàng</Text>
                  <TouchableOpacity
                    style={styles.inputContainer}
                    onPress={() => {
                      setVisibleTimePicker(true);
                      setSelectedField('GioDongHang');
                    }}>
                    <View style={styles.inputDate}>
                      <Text>
                        {values.GioDongHang
                          ? moment(values.GioDongHang).format('HH:mm')
                          : 'Chọn giờ'}
                      </Text>
                    </View>
                    <Icon name="clock-o" style={styles.iconInput} />
                  </TouchableOpacity>
                  {errors?.GioDongHang && touched.GioDongHang && (
                    <Text style={styles.errorText}>{errors?.GioDongHang}</Text>
                  )}
                </View>
              </View>

              <View style={styles.row}>
                <View style={styles.itemRow}>
                  <Text style={styles.label}>Ngày trả hàng</Text>
                  <TouchableOpacity
                    style={styles.inputContainer}
                    onPress={() => {
                      setVisibleDatePicker(true);
                      setSelectedField('NgayTraHang');
                    }}>
                    <View style={styles.inputDate}>
                      <Text>
                        {values.NgayTraHang
                          ? moment(values.NgayTraHang).format('DD/MM/YYYY')
                          : 'Chọn ngày'}
                      </Text>
                    </View>
                    <Icon name="calendar" style={styles.iconInput} />
                  </TouchableOpacity>
                  {errors?.NgayTraHang && touched.NgayTraHang && (
                    <Text style={styles.errorText}>{errors?.NgayTraHang}</Text>
                  )}
                </View>

                <View style={styles.itemRow}>
                  <Text style={styles.label}>Giờ trả hàng</Text>
                  <TouchableOpacity
                    style={styles.inputContainer}
                    onPress={() => {
                      setVisibleTimePicker(true);
                      setSelectedField('GioTraHang');
                    }}>
                    <View style={styles.inputDate}>
                      <Text>
                        {values.GioTraHang
                          ? moment(values.GioTraHang).format('HH:mm')
                          : 'Chọn giờ'}
                      </Text>
                    </View>
                    <Icon name="clock-o" style={styles.iconInput} />
                  </TouchableOpacity>
                  {errors?.GioTraHang && touched.GioTraHang && (
                    <Text style={styles.errorText}>{errors?.GioTraHang}</Text>
                  )}
                </View>
              </View>

              <Text style={styles.label}>Điểm đi</Text>
              <TouchableOpacity
                style={styles.inputContainer}
                onPress={() => openModal('IDDiemDi', dataDiaDiem)}>
                <View style={styles.inputDate}>
                  <Text>
                    {values.IDDiemDi
                      ? dataDiaDiem?.find(e => e.ID === Number(values.IDDiemDi))
                          ?.Name +
                        ' - ' +
                        dataDiaDiem?.find(e => e.ID === Number(values.IDDiemDi))
                          ?.Address
                      : 'Chọn điểm đi'}
                  </Text>
                </View>
                <Icon name="chevron-down" style={styles.iconInput} />
              </TouchableOpacity>
              {errors?.IDDiemDi && touched.IDDiemDi && (
                <Text style={styles.errorText}>{errors?.IDDiemDi}</Text>
              )}

              <Text style={styles.label}>Điểm đến</Text>
              <TouchableOpacity
                style={styles.inputContainer}
                onPress={() => openModal('IDDiemDen', dataDiaDiem)}>
                <View style={styles.inputDate}>
                  <Text>
                    {values.IDDiemDen
                      ? dataDiaDiem?.find(
                          e => e.ID === Number(values.IDDiemDen),
                        )?.Name +
                        ' - ' +
                        dataDiaDiem?.find(
                          e => e.ID === Number(values.IDDiemDen),
                        )?.Address
                      : 'Chọn điểm đến'}
                  </Text>
                </View>
                <Icon name="chevron-down" style={styles.iconInput} />
              </TouchableOpacity>
              {errors?.IDDiemDen && touched.IDDiemDen && (
                <Text style={styles.errorText}>{errors?.IDDiemDen}</Text>
              )}

              <Text style={styles.label}>Thời gian về</Text>
              <TouchableOpacity
                style={styles.inputContainer}
                onPress={() => {
                  setVisibleTimePicker(true);
                  setSelectedField('ThoiGianVe');
                }}>
                <View style={styles.inputDate}>
                  <Text>
                    {values.ThoiGianVe
                      ? moment(values.ThoiGianVe).format('HH:mm')
                      : 'Chọn giờ'}
                  </Text>
                </View>
                <Icon name="clock-o" style={styles.iconInput} />
              </TouchableOpacity>
              {errors?.ThoiGianVe && touched.ThoiGianVe && (
                <Text style={styles.errorText}>{errors?.ThoiGianVe}</Text>
              )}

              <View style={styles.row}>
                <View style={styles.itemRow}>
                  <Text style={styles.label}>Số kg</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={handleChange('SoKG')}
                    onBlur={handleBlur('SoKG')}
                    value={values.SoKG}
                    keyboardType="numeric"
                    placeholder="Nhập số kg"
                  />
                  {errors?.SoKG && touched.SoKG && (
                    <Text style={styles.errorText}>{errors?.SoKG}</Text>
                  )}
                </View>
                <View style={styles.itemRow}>
                  <Text style={styles.label}>Số khối</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={handleChange('SoKhoi')}
                    onBlur={handleBlur('SoKhoi')}
                    value={values.SoKhoi}
                    keyboardType="numeric"
                    placeholder="Nhập số khối"
                  />
                  {errors?.SoKhoi && touched.SoKhoi && (
                    <Text style={styles.errorText}>{errors?.SoKhoi}</Text>
                  )}
                </View>
              </View>

              <Text style={styles.label}>Số PL</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('SoPL')}
                onBlur={handleBlur('SoPL')}
                value={values.SoPL}
                keyboardType="numeric"
                placeholder="Nhập số PL"
              />
              {errors?.SoPL && touched.SoPL && (
                <Text style={styles.errorText}>{errors?.SoPL}</Text>
              )}

              <Text style={styles.label}>Hàng về</Text>
              <TouchableOpacity
                style={styles.inputContainer}
                onPress={() => setFieldValue('FlagHangVe', !values.FlagHangVe)}>
                <View style={styles.inputDate}>
                  <Text>{values.FlagHangVe ? 'Có' : 'Không'}</Text>
                </View>
                <Icon
                  name={values.FlagHangVe ? 'check-square' : 'square-o'}
                  style={styles.iconInput}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={handleSubmit}>
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
                keySubRender={
                  modalField === 'IDDiemDen' || modalField === 'IDDiemDi'
                    ? 'Address'
                    : ''
                }
              />
            </View>
          )}
        </Formik>
      </KeyboardAwareScrollView>
      <LoadingModal isVisible={isLoading || loadingUpdate} />
    </View>
  );
};

export default TransportTripDetailScreen;
