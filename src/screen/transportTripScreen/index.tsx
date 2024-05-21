import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { styles } from './style';
import HomeHeader from '../../components/header/headerBottomTab';

const TransportTripScreen = () => {
  const navigate = useNavigation();
  const [visibleStartDate, setVisibleStartDate] = useState(false);
  const [visibleEndDate, setVisibleEndDate] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [values, setValues] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const changeValue = (key, value) => {
    setValues(prevState => ({ ...prevState, [key]: value }));
  };

  const showHideStartDate = () => {
    setVisibleStartDate(!visibleStartDate);
  };

  const showHideEndDate = () => {
    setVisibleEndDate(!visibleEndDate);
  };

  const handleConfirm = (date, key) => {
    if (key === 'startDate') {
      if (date < values.endDate) {
        changeValue(key, date);
      } else {
        setValues(prevState => ({ ...prevState, [key]: date, endDate: new Date(date) }));
      }
    }
    if (key === 'endDate') {
      if (date < values.startDate) {
        setVisibleEndDate(false);
        // Hiển thị thông báo cho khoảng ngày không hợp lệ
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
      pickupLocation: '123 Đường ABC, Quận XYZ',
      dropoffLocation: '456 Đường DEF, Quận UVW',
      time: '08:00',
      vehicleType: 'Xe tải',
    },
    {
      id: 2,
      customer: 'Nguyễn Thị B',
      pickupLocation: '789 Đường GHI, Quận JKL',
      dropoffLocation: '101112 Đường MNO, Quận PQR',
      time: '10:00',
      vehicleType: 'Xe máy',
    },
    {
      id: 3,
      customer: 'Nguyễn Văn A',
      pickupLocation: '123 Đường ABC, Quận XYZ',
      dropoffLocation: '456 Đường DEF, Quận UVW',
      time: '08:00',
      vehicleType: 'Xe hơi',
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <HomeHeader />
      <View style={styles.containerFilter}>
        <TouchableOpacity style={styles.inputContainer} onPress={showHideStartDate}>
          <View style={styles.input}>
            <Text>
              {values.startDate ? moment(values.startDate).format('DD/MM/YYYY') : 'Chọn ngày bắt đầu'}
            </Text>
          </View>
          <Icon name="calendar" size={20} style={styles.iconInput} />
        </TouchableOpacity>
        <Text>~</Text>
        <TouchableOpacity style={styles.inputContainer} onPress={showHideEndDate}>
          <View style={styles.input}>
            <Text>
              {values.endDate ? moment(values.endDate).format('DD/MM/YYYY') : 'Chọn ngày kết thúc'}
            </Text>
          </View>
          <Icon name="calendar" size={20} style={styles.iconInput} />
        </TouchableOpacity>
      </View>
      
      {/* List of Deliveries */}
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        style={styles.containerScroll}>
        {deliveries.map(delivery => (
          <TouchableOpacity
            key={delivery.id}
            style={styles.deliveryContainer}
            onPress={() => navigate.navigate('TransportTripDetailScreen', { item: delivery })}>
            <View style={styles.infoContainer}>
              <Text style={styles.title}>Khách hàng: {delivery.customer}</Text>
            </View>
            <View style={styles.infoContainer}>
              <View style={styles.containerIcon}>
                <Icon name="truck" size={20} style={styles.icon} />
              </View>
              <Text style={styles.text}>Nơi đóng: {delivery.pickupLocation}</Text>
            </View>
            <View style={styles.infoContainer}>
              <View style={styles.containerIcon}>
                <Icon name="map-marker" size={20} style={styles.icon} />
              </View>
              <Text style={styles.text}>Nơi trả: {delivery.dropoffLocation}</Text>
            </View>
            <View style={styles.infoContainer}>
              <View style={styles.containerIcon}>
                <Icon name="clock-o" size={20} style={styles.icon} />
              </View>
              <Text style={styles.text}>Thời gian: {delivery.pickupTime}</Text>
            </View>
            <View style={styles.infoContainer}>
              <View style={styles.containerIcon}>
                <Icon name="car" size={20} style={styles.icon} />
              </View>
              <Text style={styles.text}>Loại xe: {delivery.vehicleType}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Date Time Pickers */}
      <DateTimePickerModal
        isVisible={visibleStartDate}
        mode="date"
        locale="vi_VN"
        confirmTextIOS="Chọn"
        cancelTextIOS="Hủy"
        onConfirm={date => handleConfirm(date, 'startDate')}
        onCancel={showHideStartDate}
      />

      <DateTimePickerModal
        isVisible={visibleEndDate}
        mode="date"
        locale="vi_VN"
        confirmTextIOS="Chọn"
        cancelTextIOS="Hủy"
        onConfirm={date => handleConfirm(date, 'endDate')}
        onCancel={showHideEndDate}
      />
    </View>
  );
};

export default TransportTripScreen;
