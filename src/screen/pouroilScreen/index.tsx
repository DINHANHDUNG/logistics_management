import React, {useState} from 'react';
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
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import {styles} from './style';
import {
  formatCurrency,
  formatNumberCur,
  getCurrentMonthLastDate,
} from '../../utils';

const PouroilScreen = () => {
  const navigate = useNavigation();
  const lastDayOfMonth = getCurrentMonthLastDate();
  const [visibleStartDate, setVisibleStartDate] = useState(false);
  const [visibleEndDate, setVisibleEndDate] = useState(false);

  const [values, setValues] = useState({
    startDate: new Date() as Date,
    endDate: lastDayOfMonth as Date,
  });

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

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
      licensePlate: '29C-12345',
      seller: 'Cửa hàng A',
      quantity: 50000,
      unitPrice: 50000,
    },
    {
      id: 2,
      licensePlate: '51D-67890',
      seller: 'Cửa hàng B',
      quantity: 3,
      unitPrice: 70000,
    },
    {
      id: 3,
      licensePlate: '36G-24680',
      seller: 'Cửa hàng C',
      quantity: 2,
      unitPrice: 80000,
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
            key={delivery?.id}
            style={styles.pouroilContainer}
            onPress={() =>
              navigate.navigate('PouroilDetailScreen', {
                item: delivery,
              })
            }>
            <View style={[styles.infoContainer]}>
              <Text style={styles.title}>
                Biển số xe: {delivery?.licensePlate}
              </Text>
            </View>
            <View style={[styles.infoContainer]}>
              <View style={styles.containerIcon}>
                <Icon name="user" size={20} style={styles.icon} />
              </View>
              <Text style={styles.text}>Đơn vị bán: {delivery?.seller}</Text>
            </View>
            <View style={[styles.infoContainer]}>
              <View style={styles.containerIcon}>
                <Icon name="cubes" size={20} style={styles.icon} />
              </View>
              <Text style={styles.text}>
                Số lượng: {formatNumberCur(delivery?.quantity)}
              </Text>
            </View>
            <View style={[styles.infoContainer]}>
              <View style={styles.containerIcon}>
                <Icon name="money" size={20} style={styles.icon} />
              </View>
              <Text style={styles.text}>
                Đơn giá: {formatCurrency(delivery?.unitPrice)}
              </Text>
            </View>
            <View style={[styles.infoContainer]}>
              <View style={styles.containerIcon}>
                <Icon name="money" size={20} style={styles.icon} />
              </View>
              <Text style={styles.text}>
                Thành tiền:{' '}
                {formatCurrency(delivery?.unitPrice * delivery?.quantity)}
              </Text>
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

export default PouroilScreen;
