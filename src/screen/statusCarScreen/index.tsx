import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';
import HomeHeader from '../../components/header/headerBottomTab';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {styles} from './style';

const StatusCarScreen = () => {
  const navigate = useNavigation();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const deliveries = [
    {
      id: 1,
      licensePlate: '29C-12345',
      trips: 10,
      status: 'Đang chờ',
    },
    {
      id: 2,
      licensePlate: '51D-67890',
      trips: 5,
      status: 'Đang giao',
    },
    {
      id: 3,
      licensePlate: '36G-24680',
      trips: 8,
      status: 'Hoàn thành',
    },
  ];

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Đang chờ':
        return styles.statusPending;
      case 'Đang giao':
        return styles.statusInProgress;
      case 'Hoàn thành':
        return styles.statusCompleted;
      default:
        return {};
    }
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
          <TouchableOpacity
            key={delivery.id}
            style={styles.itemContainer}
            // onPress={() =>
            //   navigate.navigate('PouroilDetailScreen', {
            //     item: delivery,
            //   })
            // }
          >
            <View style={styles.infoContainer}>
              <Text style={styles.title}>
                Biển số xe: {delivery.licensePlate}
              </Text>
            </View>
            <View style={styles.infoContainer}>
              <View style={styles.containerIcon}>
                <Icon name="truck" size={20} style={styles.icon} />
              </View>
              <Text style={styles.text}>Số chuyến: {delivery.trips}</Text>
            </View>
            <View style={styles.infoContainer}>
              <View style={styles.containerIcon}>
                <Icon name="info-circle" size={20} style={styles.icon} />
              </View>
              <Text
                style={[
                  styles.text,
                  styles.status,
                  getStatusStyle(delivery.status),
                ]}>
                Trạng thái: {delivery.status}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
        <View style={{paddingBottom: 20}}></View>
      </ScrollView>
    </View>
  );
};

export default StatusCarScreen;
