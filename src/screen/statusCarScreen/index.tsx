import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import HomeHeader from '../../components/header/headerBottomTab';
import Icon from 'react-native-vector-icons/FontAwesome';
import {styles} from './style';
import {useLazyGetSttCarQuery} from '../../app/services/statusCar';
import LoadingModal from '../../components/modals/loadingModal';
import {getProductKey} from '../../app/hooks';
import {dataStatusCar} from '../../types/statusCar';
import {useNavigation} from '@react-navigation/native';

const StatusCarScreen = () => {
  const navigate = useNavigation();
  const [getList, {data, isLoading}] = useLazyGetSttCarQuery();
  const [statusCarList, setStatusCarList] = useState([]);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const Limit = 10;

  useEffect(() => {
    fetchStatusCarList(page);
  }, [page]);

  const fetchStatusCarList = async (page: number) => {
    try {
      const ProductKey = await getProductKey();
      const response = await getList({
        Page: page,
        Limit: Limit,
        ProductKey: ProductKey ?? '',
      });

      if (response?.data) {
        setStatusCarList(prevStatusCarList =>
          page === 1
            ? response.data.data
            : [...prevStatusCarList, ...response.data],
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    setPage(1);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const loadMore = () => {
    console.log('reload');

    if (!loadingMore && statusCarList.length >= Limit * page) {
      setLoadingMore(true);
      setPage(prevPage => prevPage + 1);
      setLoadingMore(false);
    }
  };

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
        onScroll={({nativeEvent}) => {
          if (isCloseToBottom(nativeEvent)) {
            loadMore();
          }
        }}
        scrollEventThrottle={400}
        style={styles.containerScroll}>
        {statusCarList.map((val: dataStatusCar) => (
          <TouchableOpacity
            key={val.IDXe}
            style={styles.itemContainer}
            onPress={() =>
              navigate.navigate('StatusCarDetailScreen', {
                item: val,
              })
            }>
            <View style={styles.infoContainer}>
              <Text style={styles.title}>Biển số xe: {val.BienSoXe}</Text>
            </View>
            <View style={styles.infoContainer}>
              <View style={styles.containerIcon}>
                <Icon name="truck" size={20} style={styles.icon} />
              </View>
              <Text style={styles.text}>Số chuyến: {val.SoLuongChuyen}</Text>
            </View>
            <View style={styles.infoContainer}>
              <View style={styles.containerIcon}>
                <Icon name="info-circle" size={20} style={styles.icon} />
              </View>
              <Text
                style={[
                  styles.text,
                  styles.status,
                  {backgroundColor: val.RGB ?? ''},
                ]}>
                Trạng thái: {val.TrangThai}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
        {loadingMore && <ActivityIndicator size="large" color="#0000ff" />}
        <View style={{paddingBottom: 20}}></View>
        <LoadingModal isVisible={isLoading} />
      </ScrollView>
    </View>
  );
};

const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
  const paddingToBottom = 20;
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};

export default StatusCarScreen;
