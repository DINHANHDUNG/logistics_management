import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import moment from 'moment';
import React, {useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as yup from 'yup';
import HeaderCustom from '../../components/header';
import SelectValueModal from '../../components/modals/selectModal';
import {styles} from './style';

const validationSchema = yup.object().shape({
  customer: yup.string().required('Vui lòng chọn khách hàng'),
  pickupLocation: yup.string().required('Vui lòng nhập nơi đóng'),
  dropoffLocation: yup.string().required('Vui lòng nhập nơi trả'),
  time: yup.string().required('Vui lòng nhập thời gian'),
  vehicleType: yup.string().required('Vui lòng chọn loại xe'),
});

const TransportTripDetailScreen = ({route}: any) => {
  const {item: record} = route.params;
  const navigate = useNavigation();
  const [visibleTime, setVisibleTime] = useState(false); // Thay đổi state để hiển thị thời gian thay vì ngày
  const [modalVisible, setModalVisible] = useState(false);

  const options = [
    {key: '1', value: 'Option 1'},
    {key: '2', value: 'Option 2'},
    {key: '3', value: 'Option 3'},
    {key: '4', value: 'Option 4'},
    {key: '5', value: 'Option 5'},
    {key: '6', value: 'Option 6'},
    {key: '7', value: 'Option 7'},
    {key: '8', value: 'Option 8'},
    {key: '9', value: 'Option 9'},
    {key: '10', value: 'Option 10'},
  ];

  const showHidenTime = () => {
    setVisibleTime(!visibleTime); // Thay đổi trạng thái hiển thị thời gian
  };

  const showHidenStt = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <HeaderCustom title={'Thêm mới chuyến vận chuyển'} />
      <View style={{flex: 1, padding: 20}}>
        <Formik
          initialValues={{
            customer: record?.customer ?? '',
            pickupLocation: record?.pickupLocation ?? '',
            dropoffLocation: record?.dropoffLocation ?? '',
            time: record?.time ?? '',
            vehicleType: record?.vehicleType ?? '',
          }}
          validationSchema={validationSchema}
          onSubmit={values => {
            console.log(values);
          }}>
          {({
            handleChange,
            setFieldValue,
            handleBlur,
            handleSubmit,
            values,
            errors,
          }) => (
            <View>
              <Text style={styles.label}>Khách hàng</Text>
              {/* Replace this TouchableOpacity with your custom select modal */}
              <TouchableOpacity
                style={styles.inputContainer}
                onPress={showHidenStt}>
                <View style={styles.inputDate}>
                  <Text>
                    {values.customer ? values.customer : 'Chọn khách hàng'}
                  </Text>
                </View>
                <Icon name="chevron-down" style={styles.iconInput} />
              </TouchableOpacity>

              {errors.customer && (
                <Text style={styles.errorText}>{errors.customer}</Text>
              )}

              <Text style={styles.label}>Nơi đóng</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('pickupLocation')}
                onBlur={handleBlur('pickupLocation')}
                value={values.pickupLocation}
                placeholder="Nhập nơi đóng"
              />
              {errors.pickupLocation && (
                <Text style={styles.errorText}>{errors.pickupLocation}</Text>
              )}

              <Text style={styles.label}>Nơi trả</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('dropoffLocation')}
                onBlur={handleBlur('dropoffLocation')}
                value={values.dropoffLocation}
                placeholder="Nhập nơi trả"
              />
              {errors.dropoffLocation && (
                <Text style={styles.errorText}>{errors.dropoffLocation}</Text>
              )}

              <Text style={styles.label}>Thời gian</Text>
              <TouchableOpacity
                style={styles.inputContainer}
                onPress={showHidenTime}>
                <View style={styles.inputDate}>
                  <Text>
                    {values.time
                      ? moment(values.time).format('HH:mm').toString() // Hiển thị thời gian
                      : 'Chọn giờ'}
                  </Text>
                </View>
                <Icon name="clock-o" style={styles.iconInput} />
                {/* Thay icon */}
              </TouchableOpacity>
              {errors.time && (
                <Text style={styles.errorText}>{errors.time}</Text>
              )}

              <Text style={styles.label}>Loại xe</Text>
              {/* Replace this TouchableOpacity with your custom select modal */}
              <TouchableOpacity
                style={styles.inputContainer}
                onPress={() => setModalVisible(true)}>
                <View style={styles.inputDate}>
                  <Text>
                    {values.vehicleType ? values.vehicleType : 'Chọn loại xe'}
                  </Text>
                </View>
                <Icon name="chevron-down" style={styles.iconInput} />
              </TouchableOpacity>
              {errors.vehicleType && (
                <Text style={styles.errorText}>{errors.vehicleType}</Text>
              )}

              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => handleSubmit()}>
                <Text style={styles.textBtn}>Lưu</Text>
              </TouchableOpacity>

              <DateTimePickerModal
                isVisible={visibleTime} // Sử dụng visibleTime thay vì visibleDate
                mode="time" // Đặt mode là 'time' để hiển thị chỉ thời gian
                locale="vi_VN"
                confirmTextIOS="Chọn"
                cancelTextIOS="Hủy"
                onConfirm={date => setFieldValue('time', date)}
                onCancel={showHidenTime}
              />

              <SelectValueModal
                title="Chọn loại xe"
                isVisible={modalVisible}
                onClose={() => setModalVisible(false)}
                onSelectValue={e => setFieldValue('vehicleType', e.value)}
                values={options}
              />
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
};

export default TransportTripDetailScreen;
