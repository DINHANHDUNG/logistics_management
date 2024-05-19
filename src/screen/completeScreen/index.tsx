import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  RefreshControl,
} from 'react-native';
import HomeHeader from '../../components/header/headerBottomTab';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import thư viện Icon
import {styles} from './style';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';

const CompleteScreen = () => {
  const navigate = useNavigation();
  const [visibleStartDate, setVisibleStartDate] = useState(false);
  const [visibleEndDate, setVisibleEndDate] = useState(false);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const [values, setValues] = useState({
    startDate: new Date() as Date,
    endDate: new Date() as Date,
  });

  console.log('values', values);

  const changeValue = (key: string, value: any) => {
    setValues(pre => ({...pre, [key]: value}));
  };

  const showHidenStartDate = () => {
    setVisibleStartDate(!visibleStartDate);
  };

  const showHidenEndDate = () => {
    setVisibleEndDate(!visibleEndDate);
  };

  const handleConfirm = (date: Date, key: string) => {
    if (key === 'startDate') {
      if (date < values.endDate) {
        changeValue(key, date);
      } else {
        setValues(pre => ({...pre, [key]: date, endDate: new Date(date)}));
      }
    }
    if (key === 'endDate') {
      if (date < values.startDate) {
        setVisibleEndDate(false);
        Alert.alert('Lỗi', 'Ngày kết thúc phải lớn hơn ngày bắt đầu');
        return;
      }
      changeValue(key, date);
    }
    setVisibleStartDate(false);
  };

  const deliveries = [
    {
      id: 1,
      customer: 'Nguyễn Văn A',
      pickupPoint: '123 Đường ABC, Quận XYZ',
      pickupTime: '08:00 AM',
      dropoffPoint: '456 Đường DEF, Quận UVW',
    },
    {
      id: 2,
      customer: 'Nguyễn Thị B',
      pickupPoint: '789 Đường GHI, Quận JKL',
      pickupTime: '10:00 AM',
      dropoffPoint: '101112 Đường MNO, Quận PQR',
    },
    {
      id: 3,
      customer: 'Nguyễn Văn A',
      pickupPoint: '123 Đường ABC, Quận XYZ',
      pickupTime: '08:00 AM',
      dropoffPoint: '456 Đường DEF, Quận UVW',
    },
  ];

  const handleAccept = (deliveryId: number) => {
    // Xử lý khi người dùng nhấn nút "Nhận"
  };

  const handleReject = (deliveryId: number) => {
    // Xử lý khi người dùng nhấn nút "Từ chối"
  };

  return (
    <View style={styles.container}>
      <HomeHeader />
      <View style={styles.containerFilter}>
        <TouchableOpacity
          style={styles.inputContainer}
          onPress={showHidenStartDate}>
          <View style={styles.input}>
            <Text>
              {values.startDate
                ? moment(values.startDate).format('DD/MM/YYYY').toString()
                : 'Chọn ngày bắt đầu'}
            </Text>
          </View>
          <Icon name="calendar" size={20} style={styles.iconInput} />
        </TouchableOpacity>
        <Text>~</Text>
        <TouchableOpacity
          style={styles.inputContainer}
          onPress={showHidenEndDate}>
          <View style={styles.input}>
            <Text>
              {values.endDate
                ? moment(values.endDate).format('DD/MM/YYYY').toString()
                : 'Chọn ngày bắt đầu'}
            </Text>
          </View>
          <Icon name="calendar" size={20} style={styles.iconInput} />
        </TouchableOpacity>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={styles.containerScroll}>
        {deliveries.map(delivery => (
          <TouchableOpacity
            key={delivery.id}
            style={styles.deliveryContainer}
            onPress={() =>
              navigate.navigate('DetailCompleteScreen', {
                item: delivery,
              })
            }>
            <View style={styles.infoContainer}>
              <Text style={styles.title}>Khách hàng: {delivery.customer}</Text>
            </View>
            <View style={styles.infoContainer}>
              <View style={styles.containerIcon}>
                <Icon name="truck" size={20} style={styles.icon} />
              </View>

              <Text style={styles.text}>Điểm đón: {delivery.pickupPoint}</Text>
            </View>
            <View style={styles.infoContainer}>
              <View style={styles.containerIcon}>
                <Icon name="clock-o" size={20} style={styles.icon} />
              </View>

              <Text style={styles.text}>
                Thời gian đón: {delivery.pickupTime}
              </Text>
            </View>
            <View style={styles.infoContainer}>
              <View style={styles.containerIcon}>
                <Icon name="map-marker" size={20} style={styles.icon} />
              </View>
              <Text style={styles.text}>Điểm trả: {delivery.dropoffPoint}</Text>
            </View>
          </TouchableOpacity>
        ))}
        <View style={{paddingBottom: 20}}></View>
      </ScrollView>

      <DateTimePickerModal
        isVisible={visibleStartDate}
        mode="date"
        locale="vi_VN"
        confirmTextIOS="Chọn"
        cancelTextIOS="Hủy"
        onConfirm={date => handleConfirm(date, 'startDate')}
        onCancel={showHidenStartDate}
      />

      <DateTimePickerModal
        isVisible={visibleEndDate}
        mode="date"
        locale="vi_VN"
        confirmTextIOS="Chọn"
        cancelTextIOS="Hủy"
        onConfirm={date => handleConfirm(date, 'endDate')}
        onCancel={showHidenEndDate}
      />
    </View>
  );
};

export default CompleteScreen;
