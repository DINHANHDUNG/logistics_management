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
import {useLazyGetListQuery} from '../../app/services/vehicleCoordination';
import {MSG} from '../../common/contants';
import HomeHeader from '../../components/header/headerBottomTab';
import SelectCarModal from '../../components/modals/SelectCarModal';
import LoadingModal from '../../components/modals/loadingModal';
import {dataVehicleCoordination} from '../../types/vehicleCoordination';
import {styles} from './style';
import HeaderCustom from '../../components/header';

const Limit = 10;

const VehicleCoordinationReportScreen = () => {
  const [getList, {isLoading, isFetching}] = useLazyGetListQuery();
  const auth = useAppSelector(authStore);
  const navigate = useNavigation();
  const [uiState, setUiState] = useState({
    visibleStartDate: false,
    visibleEndDate: false,
    visibleSelectCar: false,
    itemSelect: {} as dataVehicleCoordination,
    refreshing: false,
    loadingMore: false,
  });
  const [page, setPage] = useState(1);
  const [trips, setTrips] = useState<Array<dataVehicleCoordination>>([]);
  const [values, setValues] = useState({
    startDate: moment().startOf('month').toDate(),
    endDate: moment().endOf('month').toDate(),
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

  useEffect(() => {
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

  const updateItem = (item: dataVehicleCoordination) => {
    console.log(item);
    navigate.navigate('TransportTripDetailScreen', {item});
  };

  const handleDieuPhoi = (item: dataVehicleCoordination) => {
    changeUiState('itemSelect', item);
    changeUiState('visibleSelectCar', true);
  };

  const cancelItem = (item: dataVehicleCoordination) => {
    Alert.alert(
      MSG.wraning,
      'Bạn có chắc chắn muốn hủy chuyến' + ' ' + item.IDChuyen,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            // deleteTrip({
            //   IDChuyen: item.IDChuyen,
            //   ProductKey: auth.Key,
            // }).then((req: any) => {
            //   if (req.data.status === 200) {
            //     Alert.alert(MSG.success, 'Cập nhật thành công');
            //     return onRefresh();
            //   }
            //   if (req.data.status === 404) {
            //     return Alert.alert(MSG.err, 'Không tìm thấy chuyến !');
            //   }
            //   if (req.data.status === 400) {
            //     return Alert.alert(MSG.err, 'Không thể xóa chuyến !');
            //   }
            //if (req.data.status === 409) {
            //     return Alert.alert(MSG.err, 'Không thể thực hiện hủy chuyến trên chuyến này !');
            //   }
            //   return Alert.alert(MSG.err, MSG.errAgain);
            // });
          },
        },
      ],
    );
  };

  const cancelLenhItem = (item: dataVehicleCoordination) => {
    Alert.alert(
      MSG.wraning,
      'Bạn có chắc chắn muốn bỏ gửi lệnh' + ' ' + item.IDChuyen,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            // deleteTrip({
            //   IDChuyen: item.IDChuyen,
            //   ProductKey: auth.Key,
            // }).then((req: any) => {
            //   if (req.data.status === 200) {
            //     Alert.alert(MSG.success, 'Cập nhật thành công');
            //     return onRefresh();
            //   }
            //   if (req.data.status === 404) {
            //     return Alert.alert(MSG.err, 'Không tìm thấy chuyến !');
            //   }
            //if (req.data.status === 409) {
            //     return Alert.alert(MSG.err, 'Không thể thực hiện bỏ gửi lệnh trên chuyến này !');
            //   }
            //   return Alert.alert(MSG.err, MSG.errAgain);
            // });
          },
        },
      ],
    );
  };

  const sendItem = (item: dataVehicleCoordination) => {
    Alert.alert(
      MSG.wraning,
      'Bạn có chắc chắn muốn bỏ gửi lệnh' + ' ' + item.IDChuyen,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            // deleteTrip({
            //   IDChuyen: item.IDChuyen,
            //   ProductKey: auth.Key,
            // }).then((req: any) => {
            //   if (req.data.status === 200) {
            //     Alert.alert(MSG.success, 'Cập nhật thành công');
            //     return onRefresh();
            //   }
            //   if (req.data.status === 404) {
            //     return Alert.alert(MSG.err, 'Không tìm thấy chuyến');
            //   }
            //if (req.data.status === 409) {
            //     return Alert.alert(MSG.err, 'Không thể thực hiện gửi lệnh trên chuyến này !');
            //   }
            //   return Alert.alert(MSG.err, MSG.errAgain);
            // });
          },
        },
      ],
    );
  };

  const renderItem = ({item}: {item: dataVehicleCoordination}) => {
    return (
      <View
        key={item.IDChuyen}
        style={[
          styles.deliveryContainer,
          // {backgroundColor: item.RGB ? `rgb(${item.RGB})` : '#FFFFFF'},
        ]}>
        <View
          style={[
            styles.infoContainer,
            {
              justifyContent: 'space-between',
              flex: 1,
              alignItems: 'flex-start',
            },
          ]}>
          <Text style={[styles.title, {width: '90%', flex: 1}]}>
            Khách hàng: {item.KhachHang}{' '}
          </Text>
          <Icon
            name="flag"
            size={20}
            style={[
              styles.icon,
              {color: item.RGB ? `rgb(${item.RGB})` : '#FFFFFF'},
            ]}
          />
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
          <Text style={styles.text}>Thời gian đóng: {item.NgayDongHang}</Text>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.containerIcon}>
            <Icon name="info-circle" size={20} style={styles.icon} />
          </View>
          <Text style={styles.text}>
            Trạng thái điều phối: {item.TrangThaiDieuPhoiOut || 'Chưa gửi lệnh'}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      {/* <HomeHeader /> */}
      <HeaderCustom title='Báo cáo điều phối' />
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
      <SelectCarModal
        onClose={() => changeUiState('visibleSelectCar', false)}
        visible={uiState.visibleSelectCar}
        item={uiState.itemSelect}
      />
      <LoadingModal isVisible={isLoading || isFetching} />
    </View>
  );
};

export default VehicleCoordinationReportScreen;
