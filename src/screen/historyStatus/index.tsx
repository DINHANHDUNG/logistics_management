import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import ImageViewing from 'react-native-image-viewing';
import {styles} from './style';
import HeaderCustom from '../../components/header';

const HistoryStatusScreen = () => {
  const navigate = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageList, setImageList] = useState([]);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const deliveries = [
    // {
    //   id: 1,
    //   licensePlate: '29C-12345',
    //   trips: 10,
    //   status: 'Đang chờ',
    // },
    // {
    //   id: 2,
    //   licensePlate: '51D-67890',
    //   trips: 5,
    //   status: 'Đang giao',
    // },
    {
      id: 3,
      licensePlate: '36G-24680',
      trips: 8,
      status: 'Hoàn thành',
    },
  ];

  const history = [
    {
      id: 1,
      status: 'Đang chờ',
      time: '2024-05-18 10:00',
      note: 'Chờ lấy hàng',
      images: [
        'https://via.placeholder.com/100',
        'https://via.placeholder.com/101',
        'https://via.placeholder.com/102',
      ],
    },
    {
      id: 2,
      status: 'Đang giao',
      time: '2024-05-18 12:00',
      note: 'Đang trên đường',
      images: [
        'https://via.placeholder.com/100',
        'https://via.placeholder.com/101',
      ],
    },
    {
      id: 3,
      status: 'Hoàn thành',
      time: '2024-05-18 14:00',
      note: 'Đã giao hàng',
      images: ['https://via.placeholder.com/100'],
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

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleImagePress = (images: any, index: any) => {
    setImageList(images);
    setCurrentImageIndex(index);
    toggleModal();
  };

  return (
    <View style={styles.container}>
      <HeaderCustom title={`${'Lịch sử trạng thái'}`} />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={styles.containerScroll}>
        {deliveries.map(delivery => (
          <View
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
            {/* <View style={styles.infoContainer}>
              <View style={styles.containerIcon}>
                <Icon name="road" size={20} style={styles.icon} />
              </View>
              <Text style={styles.text}>Số chuyến: {delivery.trips}</Text>
            </View> */}
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
          </View>
        ))}

        <View style={styles.historyContainer}>
          <Text style={styles.title}>Lịch sử trạng thái:</Text>
          {history.map(item => (
            <View key={item.id} style={styles.historyItem}>
              <Text style={styles.historyTitle}>Trạng thái: {item.status}</Text>
              <Text style={styles.historyText}>
                Thời gian thay đổi: {item.time}
              </Text>
              <Text style={styles.historyText}>Ghi chú: {item.note}</Text>
              <ScrollView horizontal>
                {item.images.map((image, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleImagePress(item.images, index)}>
                    <Image
                      source={{uri: image ?? ''}}
                      style={styles.historyImage}
                    />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          ))}
        </View>

        <View style={{paddingBottom: 20}}></View>
      </ScrollView>

      <ImageViewing
        images={imageList.map(uri => ({uri}))}
        imageIndex={currentImageIndex}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      />
    </View>
  );
};

export default HistoryStatusScreen;
