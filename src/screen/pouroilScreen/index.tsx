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
import {useAppSelector} from '../../app/hooks'; // Assuming you have a service for fetching repair records
import {useLazyGetListDoDauQuery} from '../../app/services/report';
import HomeHeader from '../../components/header/headerBottomTab';
import LoadingModal from '../../components/modals/loadingModal';
import {itemReport} from '../../types/report';
import {formatCurrency2} from '../../utils';
import {styles} from './style'; // Assuming you have a style.js file
import {MSG} from '../../common/contants';
import {useDeleteDoDauMutation} from '../../app/services/pouroil';

const Limit = 10;

const PouroilScreen = () => {
  const [getList, {isLoading}] = useLazyGetListDoDauQuery();
  const [deleteDoDau, {isLoading: loadingDelete}] = useDeleteDoDauMutation();
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
      if (newData?.status === 200) {
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
      // setValues({
      //   startDate: moment().startOf('month').toDate(),
      //   endDate: moment().endOf('month').toDate(),
      // });
      // if (page !== 1) {
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

  const deleteItem = (item: any) => {
    Alert.alert(MSG.wraning, MSG.wraningDelete + ' ' + item.ID, [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          deleteDoDau({
            ID: item.ID,
            ProductKey: auth.Key,
          }).then((req: any) => {
            if (req.data.status === 200) {
              Alert.alert(MSG.success, 'Đã xóa thành công');
              return onRefresh();
            }
            // else {
            //   Alert.alert(MSG.err, MSG.errAgain);
            // }
            if (req.data.status === 404) {
              return Alert.alert(MSG.err, 'Không tìm thấy bản ghi !');
            }
            if (req.data.status === 400) {
              return Alert.alert(MSG.err, 'Không thể xóa !');
            }
            return Alert.alert(MSG.err, MSG.errAgain);
          });
        },
      },
    ]);
  };

  const renderItem = ({item}: {item: itemReport}) => (
    <View key={item.ID} style={styles.deliveryContainer}>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>Biển số xe: {item.BienSoXe}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.text}>Ngày đổ dầu: {item.NgayDoDau}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.text}>
          Thành tiền: {item.ThanhTien ? formatCurrency2(item.ThanhTien) : 0}
        </Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.text}>Lái xe: {item.LaiXe}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.completeButton]}
          onPress={() =>
            navigate.navigate('PouroilDetailScreen', {item: item})
          }>
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

  return (
    <View style={styles.container}>
      <HomeHeader />
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
            <ActivityIndicator size="large" color="tomato" />
          ) : (
            <View style={{height: 30}}></View>
          )
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
      <TouchableOpacity
        style={styles.iconPlus}
        onPress={() => navigate.navigate('PouroilDetailScreen', {})}>
        <Icon name="plus" size={23} color="#fff" />
      </TouchableOpacity>
      <LoadingModal isVisible={isLoading || loadingDelete} />
    </View>
  );
};

export default PouroilScreen;
