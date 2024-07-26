import {Alert, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {authStore} from '../../app/features/auth/authSlice';
import {uploadImage, useAppSelector} from '../../app/hooks';
import {useLazyGetStatusShowQuery} from '../../app/services/vehicleCoordination';
import {ENUMSTATUS, MSG} from '../../common/contants';
import LoadingModal from '../../components/modals/loadingModal';
import {dataVehicleCoordination} from '../../types/vehicleCoordination';
import {styles} from './style';
import UpdateStatusProcessingModal from '../../components/modals/updateStatusProcessingModal';
import {useState} from 'react';
import {API_URL, NetWork} from '../../common/apiKey';

export const ItemProcessing = ({item}: {item: dataVehicleCoordination}) => {
  const auth = useAppSelector(authStore);
  const [getStatus, {isLoading}] = useLazyGetStatusShowQuery();
  const [isVisibleUpdate, setIsVisibleUpdate] = useState(false);
  const [statusEnum, setStatusEnum] = useState(0);
  //   useUpdateTrangThaiChuyenMutation
  const fnc_UpdateStatus = async (data: any) => {
    console.log('Update trạng thái');
    // setIsVisibleUpdate(true);

    const res = (await uploadImage(
      API_URL + NetWork.UpdateTrangThaiChuyen,
      data,
    )) as any;

    const req = JSON.parse(res.data) as any;

    console.log('res', JSON.parse(res.data));

    // setIsLoading(false);
    // if (req?.data.IDChuyen) {
    //   Alert.alert(MSG.success, MSG.updateSuccess, [
    //     {
    //       text: 'Cancel',
    //       onPress: () => navigate.goBack(),
    //       style: 'cancel',
    //     },
    //     {text: 'OK', onPress: () => navigate.goBack()},
    //   ]);
    // } else {
    //   Alert.alert(MSG.err, MSG.errAgain);
    // }
  };

  const fnc_EnterShell = () => {
    console.log('Nhập số vỏ');
    //Show Form nhập số vỏ
  };

  const fnc_TakeAPhoto = () => {
    console.log('Chọn ảnh');
    //Show form chọn ảnh
  };

  const onClickButton = async () => {
    Alert.alert(MSG.wraning, 'Bạn có chắc chắn không?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          checkButton();
        },
      },
    ]);
  };

  const checkButton = async () => {
    try {
      const params = {ProductKey: auth.Key, IDChuyen: item.IDChuyen};
      const response = await getStatus(params);
      console.log('response', response);

      if (response?.data?.status === 200) {
        const EnumTrangThai = response.data.data.data.EnumTrangThai ?? 0;
        setStatusEnum(EnumTrangThai);
        switch (EnumTrangThai) {
          case ENUMSTATUS.ENTERSHELL:
            return fnc_EnterShell();
          case ENUMSTATUS.TAKEPHOTO:
            return fnc_TakeAPhoto();
          default:
            const newD = [
              {
                name: 'data',
                data: JSON.stringify({
                  IDChuyen: item.IDChuyen,
                  ProductKey: auth.Key,
                  SoVo: null,
                }),
              },
            ];
            return fnc_UpdateStatus(newD);
        }
      } else {
        Alert.alert(MSG.err, MSG.errAgain);
      }
    } catch (error) {
      Alert.alert(MSG.err, MSG.errAgain);
    }
  };

  return (
    <View key={item.IDChuyen} style={[styles.deliveryContainer]}>
      <View style={[styles.infoContainer, styles.justifyContent]}>
        <Text style={[styles.title, styles.fontS20]}>{item.STTChuyen}</Text>
      </View>
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
        <Text style={styles.text}>Thời gian đóng: {item.NgayDongHang}</Text>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.containerIcon}>
          <Icon name="clock-o" size={20} style={styles.icon} />
        </View>
        <Text style={styles.text}>Thời gian trả: {item.NgayTraHang}</Text>
      </View>
      {item.ThoiGianVe && (
        <View style={styles.infoContainer}>
          <View style={styles.containerIcon}>
            <Icon name="clock-o" size={20} style={styles.icon} />
          </View>
          <Text style={styles.text}>Thời gian về: {item.ThoiGianVe}</Text>
        </View>
      )}
      <View style={styles.infoContainer}>
        <View style={styles.containerIcon}>
          <Icon name="info-circle" size={20} style={styles.icon} />
        </View>
        <Text style={styles.text}>
          Trạng thái vận chuyển: {item.TrangThaiDieuPhoiOut || 'Chưa gửi lệnh'}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.transferButton]}
          onPress={onClickButton}>
          {/* <Icon name="exchange" size={16} color="#fff" /> */}
          <Text style={styles.buttonText}>{item.TenNutHienThi || ''}</Text>
        </TouchableOpacity>
      </View>
      <UpdateStatusProcessingModal
        onClose={() => setIsVisibleUpdate(false)}
        item={item}
        visible={isVisibleUpdate}
        status={statusEnum}
        submitForm={data => console.log(data)}
      />
      <LoadingModal isVisible={isLoading} />
    </View>
  );
};
