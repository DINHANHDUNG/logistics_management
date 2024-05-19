import React, {useCallback, useState} from 'react';
import {
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import thư viện Icon
import HomeHeader from '../../components/header/headerBottomTab';
import {styles} from './style';
const DeliveryListScreen = () => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
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
    {
      id: 4,
      customer: 'Nguyễn Thị B',
      pickupPoint: '789 Đường GHI, Quận JKL',
      pickupTime: '10:00 AM',
      dropoffPoint: '101112 Đường MNO, Quận PQR',
    },
    {
      id: 5,
      customer: 'Nguyễn Văn A',
      pickupPoint: '123 Đường ABC, Quận XYZ',
      pickupTime: '08:00 AM',
      dropoffPoint: '456 Đường DEF, Quận UVW',
    },
    {
      id: 6,
      customer: 'Nguyễn Thị B',
      pickupPoint: '789 Đường GHI, Quận JKL',
      pickupTime: '10:00 AM',
      dropoffPoint: '101112 Đường MNO, Quận PQR',
    },
    // Thêm các chuyến giao khác tại đây
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
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={styles.containerScroll}>
        {deliveries.map(delivery => (
          <View key={delivery.id} style={styles.deliveryContainer}>
            <View style={styles.infoContainer}>
              <Text style={styles.title}>Khách hàng: {delivery.customer}</Text>
            </View>
            <View style={styles.infoContainer}>
              <View style={styles.containerIcon}>
                <Icon name="truck" size={20} color="#666" style={styles.icon} />
              </View>

              <Text style={styles.text}>Điểm đón: {delivery.pickupPoint}</Text>
            </View>
            <View style={styles.infoContainer}>
              <View style={styles.containerIcon}>
                <Icon
                  name="clock-o"
                  size={20}
                  color="#666"
                  style={styles.icon}
                />
              </View>

              <Text style={styles.text}>
                Thời gian đón: {delivery.pickupTime}
              </Text>
            </View>
            <View style={styles.infoContainer}>
              <View style={styles.containerIcon}>
                <Icon
                  name="map-marker"
                  size={20}
                  color="#666"
                  style={styles.icon}
                />
              </View>
              <Text style={styles.text}>Điểm trả: {delivery.dropoffPoint}</Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.acceptButton]}
                onPress={() => handleAccept(delivery.id)}>
                <Icon name="check" size={20} color="#fff" />
                <Text style={styles.buttonText}>Nhận</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.rejectButton]}
                onPress={() => handleReject(delivery.id)}>
                <Icon name="times" size={20} color="#fff" />
                <Text style={styles.buttonText}>Từ chối</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
        <View style={{paddingBottom: 20}}></View>
      </ScrollView>
    </View>
  );
};

export default DeliveryListScreen;
