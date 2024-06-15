import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ImageViewing from 'react-native-image-viewing';
import Icon from 'react-native-vector-icons/FontAwesome';
import {authStore} from '../../app/features/auth/authSlice';
import {useAppSelector} from '../../app/hooks';
import {
  useDeleteTrangThaiVanChuyenMutation,
  useGetListTrangThaiVanChuyenQuery,
} from '../../app/services/statusCar';
import HeaderCustom from '../../components/header';
import {styles} from './style';
import {API_IMAGE_URL} from '../../common/apiKey';
import moment from 'moment';
import {MSG} from '../../common/contants';
import LoadingModal from '../../components/modals/loadingModal';
import {useNavigation} from '@react-navigation/native';

const HistoryStatusScreen = ({route}: {route: any}) => {
  const navigate = useNavigation();
  const {IDChuyen: record} = route.params;
  const auth = useAppSelector(authStore);
  const {data, isLoading, isFetching, refetch} =
    useGetListTrangThaiVanChuyenQuery(
      {ProductKey: auth.Key, IDChuyen: record.IDChuyen},
      {skip: !record.IDChuyen},
    );

  const [deleteTrangThai, {isLoading: loadingDelete}] =
    useDeleteTrangThaiVanChuyenMutation();

  const listData = data?.data ?? [];
  const [isModalVisible, setModalVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageList, setImageList] = useState([]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleImagePress = (images: any, index: any) => {
    setImageList(images);
    setCurrentImageIndex(index);
    toggleModal();
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
          deleteTrangThai({
            ID: item.ID,
            ProductKey: auth.Key,
          }).then((req: any) => {
            console.log('req', req);

            if (req.data.status === 200) {
              Alert.alert(MSG.success, 'Đã xóa thành công');
              refetch();
              return;
            }
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

  useEffect(() => {
    const unsubscribe = navigate.addListener('focus', () => {
      refetch();
    });

    return unsubscribe;
  }, [navigate]);

  return (
    <View style={styles.container}>
      <HeaderCustom title={`${'Lịch sử trạng thái'}`} />
      <ScrollView style={styles.containerScroll}>
        <View style={styles.itemContainer}>
          <View style={styles.infoContainer}>
            <Text style={styles.title}>Biển số xe: {record.BienSoXe}</Text>
          </View>
          {/* <View style={styles.infoContainer}>
              <View style={styles.containerIcon}>
                <Icon name="road" size={20} style={styles.icon} />
              </View>
              <Text style={styles.text}>Số chuyến: {delivery.trips}</Text>
            </View> */}
          <View style={styles.infoContainer}>
            <View style={styles.containerIcon}>
              <Icon
                name="info-circle"
                color={`rgb(${record.RGB})`}
                size={20}
                style={styles.icon}
              />
            </View>
            <Text style={[styles.text, styles.status]}>
              Trạng thái: {record.TrangThaiDieuPhoiOut}
            </Text>
          </View>
        </View>

        <View style={styles.historyContainer}>
          <Text style={styles.title}>Lịch sử trạng thái:</Text>
          {listData?.map(item => (
            <View key={item.id} style={styles.historyItem}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={styles.historyTitle}>
                  Trạng thái: {item.TrangThaiVanChuyen}
                </Text>
                <TouchableOpacity>
                  <Icon
                    name="trash-o"
                    size={20}
                    style={[styles.icon, {color: 'red'}]}
                    onPress={() => deleteItem(item)}
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.historyText}>
                Thời gian thay đổi:{' '}
                {item.NgayGioThucHien
                  ? moment(item.NgayGioThucHien).format('YYYY-MM-DD HH:mm')
                  : ''}
              </Text>
              <Text style={styles.historyText}>Ghi chú: {item.GhiChu}</Text>
              {/* <Text style={styles.historyText}>Ghi chú: {item.note}</Text> */}
              <ScrollView horizontal>
                {item?.FileAttach?.map((image, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleImagePress(item?.FileAttach, index)}>
                    <Image
                      source={{uri: API_IMAGE_URL + image ?? ''}}
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
        images={imageList.map(uri => ({uri: API_IMAGE_URL + uri}))}
        imageIndex={currentImageIndex}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      />

      <LoadingModal isVisible={isFetching || isLoading || loadingDelete} />
    </View>
  );
};

export default HistoryStatusScreen;
