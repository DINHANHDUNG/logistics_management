import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {styles} from './style';
import HomeHeader from '../../components/header/headerBottomTab';
import {authStore} from '../../app/features/auth/authSlice';
import {useAppSelector} from '../../app/hooks';
import {
  useDeleteTransportTripMutation,
  useLazyGetListQuery,
} from '../../app/services/transportTrip';
import {dataTransportTrip} from '../../types/transportTrip';
import LoadingModal from '../../components/modals/loadingModal';
import {MSG} from '../../common/contants';

const Limit = 10;

const TransportTripScreen = () => {
  const [getList, {isLoading, isFetching}] = useLazyGetListQuery();
  const [deleteTrip, {isLoading: loadingDelete}] =
    useDeleteTransportTripMutation();
  const auth = useAppSelector(authStore);
  const navigate = useNavigation();
  const [uiState, setUiState] = useState({
    visibleStartDate: false,
    visibleEndDate: false,
    refreshing: false,
    loadingMore: false,
  });
  const [page, setPage] = useState(1);
  const [trips, setTrips] = useState<Array<dataTransportTrip>>([]);
  const [values, setValues] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  const fetchList = async (page: number) => {
    try {
      const ProductKey = auth.Key;
      const response = await getList({
        Page: page,
        Limit: Limit,
        ProductKey: ProductKey ?? '',
        dtE: moment(values.endDate).format('YYYY/MM/DD'),
        dtS: moment(values.startDate).format('YYYY/MM/DD'),
        IDUser: auth.IDUser,
      });

      const newData = response?.data?.data.data ?? [];

      if (response?.data.status === 200) {
        if (page === 1) {
          setTrips(newData);
        } else {
          setTrips(prevTrips => [...prevTrips, ...newData]);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchList(1);
  }, [values.startDate, values.endDate]);

  useEffect(() => {
    fetchList(page);
  }, [page]);

  React.useEffect(() => {
    const unsubscribe = navigate.addListener('focus', () => {
      // setValues({
      //   startDate: values.startDate,
      //   endDate: values.endDate,
      // });
      // if (page != 1) {
      //   setPage(1);
      // } else {
      //   fetchList(1);
      // }
      fetchList(1);
    });

    return unsubscribe;
  }, [navigate]);

  const onRefresh = () => {
    setUiState(prevState => ({...prevState, refreshing: true}));
    if (page != 1) {
      setPage(1);
    } else {
      fetchList(1);
    }
    setTimeout(() => {
      setUiState(prevState => ({...prevState, refreshing: false}));
    }, 2000);
  };

  const loadMore = () => {
    if (!uiState.loadingMore && trips.length >= Limit * page) {
      setUiState(prevState => ({...prevState, loadingMore: true}));
      setPage(prevPage => prevPage + 1);
      setUiState(prevState => ({...prevState, loadingMore: false}));
    }
  };

  const changeValue = (key: string, value: any) => {
    setValues(prevState => ({...prevState, [key]: value}));
  };

  const showHideStartDate = () => {
    setUiState(prevState => ({
      ...prevState,
      visibleStartDate: !prevState.visibleStartDate,
    }));
  };

  const showHideEndDate = () => {
    setUiState(prevState => ({
      ...prevState,
      visibleEndDate: !prevState.visibleEndDate,
    }));
  };

  const handleConfirm = (date: any, key: any) => {
    if (key === 'startDate') {
      if (date < values.endDate) {
        changeValue(key, date);
      } else {
        setValues(prevState => ({
          ...prevState,
          [key]: date,
          endDate: new Date(date),
        }));
      }
    }
    if (key === 'endDate') {
      if (date < values.startDate) {
        setUiState(prevState => ({...prevState, visibleEndDate: false}));
        Alert.alert('Lỗi', 'Ngày kết thúc phải lớn hơn ngày bắt đầu');
        return;
      }
      changeValue(key, date);
    }
    setPage(1); // Reset the page number
    setUiState(prevState => ({
      ...prevState,
      visibleStartDate: false,
      visibleEndDate: false,
    }));
  };

  const deleteItem = (item: dataTransportTrip) => {
    Alert.alert(MSG.wraning, MSG.wraningDelete + ' ' + item.IDChuyen, [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          deleteTrip({
            IDChuyen: item.IDChuyen,
            ProductKey: auth.Key,
          }).then((req: any) => {
            if (req.data?.status === 200) {
              Alert.alert(MSG.success, 'Đã xóa chuyến thành công');
              return onRefresh();
            }
            if (req.error?.status === 404 || req.error?.status === 400) {
              return Alert.alert(MSG.err, req.error?.data);
            }
            return Alert.alert(MSG.err, MSG.errAgain);
          });
        },
      },
    ]);
  };

  const updateItem = (item: dataTransportTrip) => {
    console.log(item);
    navigate.navigate('TransportTripDetailScreen', {item});
  };

  const renderItem = ({item}: {item: dataTransportTrip}) => {
    return (
      <View key={item.IDChuyen} style={styles.deliveryContainer}>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>Khách hàng: {item.KhachHang}</Text>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.containerIcon}>
            <Icon name="truck" size={20} style={styles.icon} />
          </View>
          <Text style={styles.text}>Điểm đi: {item.DiemDi}</Text>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.containerIcon}>
            <Icon name="map-marker" size={20} style={styles.icon} />
          </View>
          <Text style={styles.text}>Điểm đến: {item.DiemDen}</Text>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.containerIcon}>
            <Icon name="clock-o" size={20} style={styles.icon} />
          </View>
          <Text style={styles.text}>Ngày đóng: {item.NgayDongHang}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.completeButton]}
            onPress={() => updateItem(item)}>
            <Text style={styles.buttonText}>Cập nhật</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.transferButton]}
            onPress={() => deleteItem(item)}>
            <Text style={styles.buttonText}>Xóa</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <HomeHeader />
      <View style={styles.containerFilter}>
        <TouchableOpacity
          style={styles.inputContainer}
          onPress={showHideStartDate}>
          <View style={styles.input}>
            <Text>
              {values.startDate
                ? moment(values.startDate).format('DD/MM/YYYY')
                : 'Chọn ngày bắt đầu'}
            </Text>
          </View>
          <Icon name="calendar" size={20} style={styles.iconInput} />
        </TouchableOpacity>
        <Text>~</Text>
        <TouchableOpacity
          style={styles.inputContainer}
          onPress={showHideEndDate}>
          <View style={styles.input}>
            <Text>
              {values.endDate
                ? moment(values.endDate).format('DD/MM/YYYY')
                : 'Chọn ngày kết thúc'}
            </Text>
          </View>
          <Icon name="calendar" size={20} style={styles.iconInput} />
        </TouchableOpacity>
      </View>

      {/* List of Deliveries */}
      <FlatList
        data={trips}
        renderItem={renderItem}
        keyExtractor={item => item?.IDChuyen?.toString()}
        refreshControl={
          <RefreshControl
            refreshing={uiState.refreshing}
            onRefresh={onRefresh}
          />
        }
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          uiState.loadingMore ? (
            <ActivityIndicator size="large" color="tomato" />
          ) : null
        }
        ListEmptyComponent={
          <Text style={{textAlign: 'center', marginTop: 20}}>
            Không có dữ liệu
          </Text>
        }
        style={styles.containerScroll}
      />
      {/* Date Time Pickers */}
      <DateTimePickerModal
        isVisible={uiState.visibleStartDate}
        mode="date"
        locale="vi_VN"
        confirmTextIOS="Chọn"
        cancelTextIOS="Hủy"
        onConfirm={date => handleConfirm(date, 'startDate')}
        onCancel={showHideStartDate}
      />

      <DateTimePickerModal
        isVisible={uiState.visibleEndDate}
        mode="date"
        locale="vi_VN"
        confirmTextIOS="Chọn"
        cancelTextIOS="Hủy"
        onConfirm={date => handleConfirm(date, 'endDate')}
        onCancel={showHideEndDate}
      />
      <View style={styles.iconPlus}>
        <Icon
          name="plus"
          size={23}
          color="#fff"
          onPress={() =>
            navigate.navigate('TransportTripDetailScreen', {item: {}})
          }
        />
      </View>
      <LoadingModal isVisible={isLoading || loadingDelete || isFetching} />
    </View>
  );
};

export default TransportTripScreen;
