import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {authStore} from '../../app/features/auth/authSlice';
import {useAppSelector} from '../../app/hooks';
import {useGetListKHQuery} from '../../app/services/category';
import {
  useGetDetailQuery,
  useUpdateDieuPhoiMutation,
} from '../../app/services/vehicleCoordination';
import {MSG} from '../../common/contants';
import HeaderCustom from '../../components/header';
import LoadingModal from '../../components/modals/loadingModal';
import SelectValueModal from '../../components/modals/selectModal';
import {validationSchema} from './schema';
import {styles} from './style';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {TextInputMask} from 'react-native-masked-text';
import { formatStringToNumber } from '../../utils';

const RentedVehicleScreen = ({route}: {route: any}) => {
  const {item: record} = route.params;
  console.log('record', record);

  const navigate = useNavigation();
  const auth = useAppSelector(authStore);
  const [UpdateDieuPhoi, {isLoading: loadingUpdate}] =
    useUpdateDieuPhoiMutation();
  const {
    data,
    isLoading: loadingDetail,
    refetch,
  } = useGetDetailQuery(
    {ProductKey: auth.Key, IDChuyen: record.IDChuyen},
    {skip: !record.IDChuyen},
  );

  const [initialValues, setInitialValues] = useState({
    BienSoXe: '',
    LaiXe: '',
    DTLaiXe: '',
    SoGioCho: '',
    SoCaLuu: '',
    VeBenBai: '',
    PhatSinhKhac: '',
    GhiChu: '',
    IDDonViVanTai: '',
  });

  // Fetching data for select fields
  const {data: dataKH} = useGetListKHQuery(
    {ProductKey: auth.Key},
    {skip: !auth.Key},
  );

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
      case 'IDDonViVanTai':
        return 'Chọn đơn vị vận  tại';
      default:
        return 'Chọn';
    }
  };

  const handleSubmit = (val: any) => {
    const newData = {
      ProductKey: auth.Key,
      IDUser: auth.IDUser,
      IDChuyen: Number(record.IDChuyen),
      IDDonViVanTai: val.IDDonViVanTai ? Number(val.IDDonViVanTai) : '',
      BienSoXe: val.BienSoXe || '',
      LaiXe: val.LaiXe || '',
      DTLaiXe: val.DTLaiXe || '',
      SoGioCho: val.SoGioCho ? formatStringToNumber(val.SoGioCho) : '',
      SoCaLuu: val.SoCaLuu ? formatStringToNumber(val.SoCaLuu) : '',
      VeBenBai: val.VeBenBai ? formatStringToNumber(val.VeBenBai) : '',
      PhatSinhKhac: val.PhatSinhKhac || '',
      GhiChu: val.GhiChu || '',
    } as any;

    if (record?.IDChuyen) {
      newData.IDChuyen = record?.IDChuyen;
      console.log('data truyền vào', newData);
      UpdateDieuPhoi(newData).then((req: any) => {
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
  };

  useEffect(() => {
    if (!loadingDetail && data) {
      setInitialValues({
        BienSoXe: data.BienSoXe ? data.BienSoXe.toString() : '',
        LaiXe: data.LaiXe ? data.LaiXe.toString() : '',
        DTLaiXe: data.DTLaiXe ? data.DTLaiXe.toString() : '',
        SoGioCho: data.SoGioCho ? data.SoGioCho.toString() : '',
        SoCaLuu: data.SoCaLuu ? data.SoCaLuu.toString() : '',
        VeBenBai: data.VeBenBai ? data.VeBenBai.toString() : '',
        PhatSinhKhac: data.PhatSinhKhac ? data.PhatSinhKhac.toString() : '',
        GhiChu: data.GhiChu ? data.GhiChu.toString() : '',
        IDDonViVanTai: data.IDDonViVanTai ?? '',
      });
    }
  }, [loadingDetail]);

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <HeaderCustom title={`Điều phối xe thuê`} />
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
              <Text style={styles.label}>Đơn vị vận tại</Text>
              <TouchableOpacity
                style={styles.inputContainer}
                onPress={() => openModal('IDDonViVanTai', dataKH)}>
                <View style={styles.inputDate}>
                  <Text>
                    {values.IDDonViVanTai
                      ? dataKH?.find(e => e.ID === Number(values.IDDonViVanTai))
                          ?.Name
                      : 'Chọn Đơn vị vận  tại'}
                  </Text>
                </View>
                <Icon name="chevron-down" style={styles.iconInput} />
              </TouchableOpacity>
              {errors?.IDDonViVanTai && touched.IDDonViVanTai && (
                <Text style={styles.errorText}>{errors?.IDDonViVanTai}</Text>
              )}

              <Text style={styles.label}>Biển số xe</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('BienSoXe')}
                onBlur={handleBlur('BienSoXe')}
                value={values.BienSoXe}
                placeholder="Nhập biển số xe"
              />
              {errors?.BienSoXe && touched.BienSoXe && (
                <Text style={styles.errorText}>{errors?.BienSoXe}</Text>
              )}

              <Text style={styles.label}>Lái xe</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('LaiXe')}
                onBlur={handleBlur('LaiXe')}
                value={values.LaiXe}
                placeholder="Nhập lái xe"
              />
              {errors?.LaiXe && touched.LaiXe && (
                <Text style={styles.errorText}>{errors?.LaiXe}</Text>
              )}

              <Text style={styles.label}>DT lái xe</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('DTLaiXe')}
                onBlur={handleBlur('DTLaiXe')}
                value={values.DTLaiXe}
                placeholder="Nhập DT lái xe"
              />
              {errors?.DTLaiXe && touched.DTLaiXe && (
                <Text style={styles.errorText}>{errors?.DTLaiXe}</Text>
              )}

              <Text style={styles.label}>Vé bến bãi</Text>
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
                value={values.VeBenBai.toString()}
                onChangeText={text =>
                  setFieldValue('VeBenBai', text?.replace(/[,.]/g, ''))
                }
                onBlur={handleBlur('VeBenBai')}
                placeholder="Nhập vé bến bãi"
                keyboardType="numeric"
              />
              {errors?.VeBenBai && touched.VeBenBai && (
                <Text style={styles.errorText}>{errors?.VeBenBai}</Text>
              )}

              <View style={styles.row}>
                <View style={styles.itemRow}>
                  <Text style={styles.label}>Số ca lưu</Text>
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
                    value={values.SoCaLuu.toString()}
                    onChangeText={text =>
                      setFieldValue('SoCaLuu', text?.replace(/[,.]/g, ''))
                    }
                    onBlur={handleBlur('SoCaLuu')}
                    placeholder="Nhập số ca lưu"
                    keyboardType="numeric"
                  />
                  {errors?.SoCaLuu && touched.SoCaLuu && (
                    <Text style={styles.errorText}>{errors?.SoCaLuu}</Text>
                  )}
                </View>
                <View style={styles.itemRow}>
                  <Text style={styles.label}>Số giờ chờ</Text>
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
                    value={values.SoGioCho.toString()}
                    onChangeText={text =>
                      setFieldValue('SoGioCho', text?.replace(/[,.]/g, ''))
                    }
                    onBlur={handleBlur('SoGioCho')}
                    placeholder="Nhập số giờ chờ"
                    keyboardType="numeric"
                  />
                  {errors?.SoGioCho && touched.SoGioCho && (
                    <Text style={styles.errorText}>{errors?.SoGioCho}</Text>
                  )}
                </View>
              </View>

              <Text style={styles.label}>Phát sinh khác</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('PhatSinhKhac')}
                onBlur={handleBlur('PhatSinhKhac')}
                value={values.PhatSinhKhac}
                placeholder="Nhập phát sinh khác"
              />
              {errors?.PhatSinhKhac && touched.PhatSinhKhac && (
                <Text style={styles.errorText}>{errors?.PhatSinhKhac}</Text>
              )}

              <Text style={styles.label}>Ghi chú</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('GhiChu')}
                onBlur={handleBlur('GhiChu')}
                value={values.GhiChu}
                placeholder="Nhập ghi chú"
              />
              {errors?.GhiChu && touched.GhiChu && (
                <Text style={styles.errorText}>{errors?.GhiChu}</Text>
              )}

              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={handleSubmit}>
                <Text style={styles.textBtn}>Lưu</Text>
              </TouchableOpacity>

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
      <LoadingModal isVisible={loadingUpdate} />
    </View>
  );
};

export default RentedVehicleScreen;
