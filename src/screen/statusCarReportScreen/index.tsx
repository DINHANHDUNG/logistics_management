import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {styles} from './style';
import {useLazyGetSttCarQuery} from '../../app/services/statusCar';
import LoadingModal from '../../components/modals/loadingModal';
import {getProductKey} from '../../app/hooks';
import {dataStatusCar} from '../../types/statusCar';
import {useNavigation} from '@react-navigation/native';
import {isCloseToBottom} from '../../utils';
import {MSG} from '../../common/contants';
import HeaderCustom from '../../components/header';

const StatusCarReportScreen = () => {
  const navigate = useNavigation();
  const [getList, {isLoading, isFetching}] = useLazyGetSttCarQuery();
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

      if (response?.data?.status === 200) {
        setStatusCarList(prevStatusCarList =>
          page === 1
            ? response.data.data.data
            : [...prevStatusCarList, ...response.data],
        );
      }
    } catch (error) {
      Alert.alert(MSG.err, MSG.errAgain);
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

  return (
    <View style={styles.container}>
      <HeaderCustom title="Báo cáo trạng thái xe" />
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
            style={[styles.itemContainer, {backgroundColor: val.RGB ?? '#FFF'}]}
            // onPress={() =>
            //   navigate.navigate('StatusCarDetailScreen', {
            //     item: val,
            //   })
            // }
          >
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
                  // styles.status,
                  // {backgroundColor: val.RGB ?? ''},
                ]}>
                Trạng thái: {val.TrangThai}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
        {loadingMore && <ActivityIndicator size="large" color="#0000ff" />}
        <View style={{paddingBottom: 20}}></View>
        <LoadingModal isVisible={isLoading || isFetching} />
      </ScrollView>
    </View>
  );
};

export default StatusCarReportScreen;
