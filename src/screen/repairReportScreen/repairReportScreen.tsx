import React, {useEffect, useState, useCallback} from 'react';
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
import {styles} from './style'; // Assuming you have a style.js file
import HomeHeader from '../../components/header/headerBottomTab';
import {authStore} from '../../app/features/auth/authSlice';
import {useAppSelector} from '../../app/hooks'; // Assuming you have a service for fetching repair records
import LoadingModal from '../../components/modals/loadingModal';
import {useLazyGetListSuachuaXeQuery} from '../../app/services/report';
import {itemReport} from '../../types/report';
import HeaderCustom from '../../components/header';
import { formatCurrency2 } from '../../utils';

const Limit = 10;

const RepairReportScreen = () => {
  const [getList, {isLoading, isFetching}] = useLazyGetListSuachuaXeQuery();
  const auth = useAppSelector(authStore);
  const navigate = useNavigation();
  const [uiState, setUiState] = useState({
    visibleStartDate: false,
    visibleEndDate: false,
    refreshing: false,
    loadingMore: false,
  });
  const [page, setPage] = useState(1);
  const [records, setRecords] = useState([] as itemReport[]);

  console.log('records', records);

  const [values, setValues] = useState({
    startDate: moment().startOf('month').toDate(),
    endDate: moment().endOf('month').toDate(),
  });

  const changeValue = (key: string, value: any) => {
    setValues(prevState => ({...prevState, [key]: value}));
  };

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

      const newData = response?.data;
      console.log('newData', newData);
      if (newData.status === 200) {
        if (page === 1) {
          setRecords(newData.data.data);
        } else {
          setRecords((prevRecords: itemReport[]) => [
            ...prevRecords,
            ...newData.data.data,
          ]);
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
      setValues({
        startDate: moment().startOf('month').toDate(),
        endDate: moment().endOf('month').toDate(),
      });
      if (page !== 1) {
        setPage(1);
      } else {
        fetchList(1);
      }
    });

    return unsubscribe;
  }, [navigate]);

  const onRefresh = () => {
    setUiState(prevState => ({...prevState, refreshing: true}));
    if (page !== 1) {
      setPage(1);
    } else {
      fetchList(1);
    }
    setTimeout(() => {
      setUiState(prevState => ({...prevState, refreshing: false}));
    }, 2000);
  };

  const loadMore = () => {
    if (!uiState.loadingMore && records.length >= Limit * page) {
      setUiState(prevState => ({...prevState, loadingMore: true}));
      setPage(prevPage => prevPage + 1);
      setUiState(prevState => ({...prevState, loadingMore: false}));
    }
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

  const handleConfirm = (date: any, key: string) => {
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

  const renderItem = ({item}: {item: itemReport}) => (
    <View key={item.ID} style={styles.deliveryContainer}>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>Biển số xe: {item.BienSoXe}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.text}>
          Nội dung sửa chữa: {item.NoiDungSuaChua}
        </Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.text}>
          Thành tiền: {item.ThanhTien ? formatCurrency2(item.ThanhTien) : 0}
        </Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.text}>Lái xe: {item.LaiXe}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.text}>Ngày sửa: {item.NgaySua}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.text}>Ngày hoàn thành: {item.NgayHoanThanh}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <HeaderCustom title="Báo cáo sửa chữa" />
      <View style={styles.containerFilter}>
        <TouchableOpacity
          style={styles.inputContainer}
          onPress={() =>
            setUiState(prevState => ({
              ...prevState,
              visibleStartDate: !prevState.visibleStartDate,
            }))
          }>
          <View style={styles.input}>
            <Text>{moment(values.startDate).format('DD/MM/YYYY')}</Text>
          </View>
          <Icon name="calendar" size={20} style={styles.iconInput} />
        </TouchableOpacity>
        <Text>~</Text>
        <TouchableOpacity
          style={styles.inputContainer}
          onPress={() =>
            setUiState(prevState => ({
              ...prevState,
              visibleEndDate: !prevState.visibleEndDate,
            }))
          }>
          <View style={styles.input}>
            <Text>{moment(values.endDate).format('DD/MM/YYYY')}</Text>
          </View>
          <Icon name="calendar" size={20} style={styles.iconInput} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={records}
        renderItem={renderItem}
        keyExtractor={item => item?.ID?.toString()}
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
          ) : (
            <View style={{height: 30}}></View>
          )
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

      <LoadingModal isVisible={isLoading || isFetching} />
    </View>
  );
};

export default RepairReportScreen;
