import React from 'react';
import { View, Text, Button, StyleSheet, Platform } from 'react-native';

const DeliveryListScreen = () => {
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
    // Thêm các chuyến giao khác tại đây
  ];

  const handleAccept = (deliveryId) => {
    // Xử lý khi người dùng nhấn nút "Nhận"
  };

  const handleReject = (deliveryId) => {
    // Xử lý khi người dùng nhấn nút "Từ chối"
  };

  return (
    <View style={styles.container}>
      {deliveries.map((delivery) => (
        <View key={delivery.id} style={styles.deliveryContainer}>
          <Text style={styles.title}>Khách hàng: {delivery.customer}</Text>
          <Text>Điểm đóng: {delivery.pickupPoint}</Text>
          <Text>Thời gian đóng: {delivery.pickupTime}</Text>
          <Text>Điểm trả: {delivery.dropoffPoint}</Text>
          <View style={styles.buttonContainer}>
            <Button
              title="Nhận"
              onPress={() => handleAccept(delivery.id)}
              color="green"
            />
            <Button
              title="Từ chối"
              onPress={() => handleReject(delivery.id)}
              color="red"
            />
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  deliveryContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default DeliveryListScreen;
