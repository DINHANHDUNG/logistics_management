import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import {authStore} from '../../app/features/auth/authSlice';
import {useAppSelector} from '../../app/hooks';
import {
  useLazyGetListQuery,
  useUpdateStatusMutation,
} from '../../app/services/vehicleCoordination';
import {MSG} from '../../common/contants';
import HomeHeader from '../../components/header/headerBottomTab';
import LoadingModal from '../../components/modals/loadingModal';
import {dataVehicleCoordination} from '../../types/vehicleCoordination';
import {styles} from './style';

const Limit = 10;

const DeliveryListScreen = () => {
  const [getList, {isLoading, isFetching}] = useLazyGetListQuery();

  const [updateTrangThai, {isLoading: loading3}] = useUpdateStatusMutation();
  const auth = useAppSelector(authStore);
  const navigate = useNavigation();
  const [uiState, setUiState] = useState({
    visibleStartDate: false,
    visibleEndDate: false,
    itemSelect: {} as dataVehicleCoordination,
    refreshing: false,
    loadingMore: false,
  });
  const [page, setPage] = useState(1);
  const [trips, setTrips] = useState<Array<dataVehicleCoordination>>([]);
  const [values, setValues] = useState({
    startDate: new Date(),
    endDate: new Date(new Date().setDate(new Date().getDate() + 1)),
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
        TrangThai: 1,
      });

      const newData = response?.data?.data.data ?? [];

      if (response?.data?.status === 200) {
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

  useEffect(() => {
    const unsubscribe = navigate.addListener('focus', () => {
      setValues({
        startDate: values.startDate,
        endDate: values.endDate,
      });
      if (page != 1) {
        setPage(1);
      } else {
        fetchList(1);
      }
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

  const changeUiState = (key: string, value: any) => {
    setUiState(prevState => ({...prevState, [key]: value}));
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

  const handleAccept = (item: dataVehicleCoordination) => {
    sendItem(item, 2);
  };

  const handleReject = (item: dataVehicleCoordination) => {
    sendItem(item, 3);
  };

  const sendItem = (item: dataVehicleCoordination, TrangThai: number) => {
    updateTrangThai({
      IDChuyen: item.IDChuyen,
      ProductKey: auth.Key,
      IDUser: auth.IDUser,
      TrangThai: TrangThai,
    }).then((req: any) => {
      if (req?.data?.status === 200) {
        Alert.alert(MSG.success, 'Cập nhật thành công');
        return onRefresh();
      }
      if (req?.error.status === 404 || req?.error.status === 409) {
        return Alert.alert(MSG.err, req?.error?.data || '');
      }
      return Alert.alert(MSG.err, MSG.errAgain);
    });
  };

  const renderItem = ({item}: {item: dataVehicleCoordination}) => {
    return (
      <View
        key={item.IDChuyen}
        style={[
          styles.deliveryContainer,
          // {backgroundColor: item.RGB ?? '#fff'},
        ]}>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>Khách hàng: {item.KhachHang}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>Biển số xe: {item.BienSoXe}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>Lái xe: {item.LaiXe}</Text>
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
          <Text style={styles.text}>Thời gian: {item.NgayDongHang}</Text>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.containerIcon}>
            <Icon name="info-circle" size={20} style={styles.icon} />
          </View>
          <Text style={styles.text}>
            Trạng thái điều phối: {item.TrangThaiDieuPhoiOut || 'Chưa gửi lệnh'}
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.acceptButton]}
            onPress={() => handleAccept(item)}>
            <Icon name="check" size={20} color="#fff" />
            <Text style={styles.buttonText}>Nhận</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.rejectButton]}
            onPress={() => handleReject(item)}>
            <Icon name="times" size={20} color="#fff" />
            <Text style={styles.buttonText}>Từ chối</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <HomeHeader />
      {/* <View style={styles.containerFilter}>
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
      </View> */}

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
            <ActivityIndicator size="large" color="#0000ff" />
          ) : null
        }
        ListEmptyComponent={
          <Text style={{textAlign: 'center', marginTop: 20}}>Không có dữ liệu</Text>
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
      {/* <View style={styles.iconPlus}>
        <Icon
          name="plus"
          size={23}
          color="#fff"
          onPress={() =>
            navigate.navigate('TransportTripDetailScreen', { item: {} })
          }
        />
      </View> */}

      <LoadingModal isVisible={isLoading || isFetching || loading3} />
    </View>
  );
};

export default DeliveryListScreen;
