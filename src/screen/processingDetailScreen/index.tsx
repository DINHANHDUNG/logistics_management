import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePickerModal from '../../components/modals/selectImgModal';
import HeaderCustom from '../../components/header';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {styles} from './style';
import SelectValueModal from '../../components/modals/selectModal';

const validationSchema = yup.object().shape({
  status: yup.string().required('Vui lòng nhập trạng thái'),
  time: yup.string().required('Vui lòng nhập thời gian'),
});

const ProcessingDetailScreen = ({route}: {route: any}) => {
  const {item: record} = route.params;

  console.log('record', record);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImages, setSelectedImages] = useState<Array<string>>([]);
  const [visibleDate, setVisibleDate] = useState(false);

  //Select
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState<any | null>(null);

  const handleValueSelect = (value: any) => {
    setSelectedValue(value);
  };

  const options = [
    {key: '1', value: 'Option 1'},
    {key: '2', value: 'Option 2'},
    {key: '3', value: 'Option 3'},
    {key: '4', value: 'Option 4'},
    {key: '5', value: 'Option 5'},
    {key: '6', value: 'Option 6'},
    {key: '7', value: 'Option 7'},
    {key: '8', value: 'Option 8'},
    {key: '9', value: 'Option 9'},
    {key: '10', value: 'Option 10'},
  ];

  const showHidenDate = () => {
    setVisibleDate(!visibleDate);
  };

  const showHidenStt = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <HeaderCustom
        title={`${'Chuyển tt (' + record?.customer + ')'}`}
        IconRight={<Icon name="history" size={16} />}
      />
      <View style={{flex: 1, padding: 20}}>
        <Formik
          initialValues={{status: '', time: '', note: ''}}
          validationSchema={validationSchema}
          onSubmit={values => {
            console.log(values);
            console.log('Selected Images:', selectedImages);
          }}>
          {({
            handleChange,
            setFieldValue,
            handleBlur,
            handleSubmit,
            values,
            errors,
          }) => (
            <View>
              <Text style={styles.label}>Trạng thái</Text>
              <TouchableOpacity
                style={styles.inputContainer}
                onPress={showHidenStt}>
                <View style={styles.inputDate}>
                  <Text>
                    {values.status ? values.status : 'Chọn trạng thái'}
                  </Text>
                </View>
                <Icon name="chevron-down" style={styles.iconInput} />
              </TouchableOpacity>

              {errors.status && (
                <Text style={styles.errorText}>{errors.status}</Text>
              )}

              <Text style={styles.label}>Thời gian</Text>
              <TouchableOpacity
                style={styles.inputContainer}
                onPress={showHidenDate}>
                <View style={styles.inputDate}>
                  <Text>
                    {values.time
                      ? moment(values.time).format('DD/MM/YYYY').toString()
                      : 'Chọn ngày'}
                  </Text>
                </View>
                <Icon name="calendar" style={styles.iconInput} />
              </TouchableOpacity>
              {errors.time && (
                <Text style={styles.errorText}>{errors.time}</Text>
              )}

              <Text style={styles.label}>Ghi chú</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('note')}
                onBlur={handleBlur('note')}
                value={values.note}
                placeholder="Nhập ghi chú"
              />
              {errors.note && (
                <Text style={styles.errorText}>{errors.note}</Text>
              )}

              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => setIsModalVisible(true)}>
                <Icon name="camera" size={20} color="#2196F3" />
                <Text style={{marginLeft: 10}}>Chọn ảnh</Text>
              </TouchableOpacity>

              <ScrollView horizontal style={styles.imageContainer}>
                {selectedImages.map((image, index) => (
                  <Image
                    key={index}
                    source={{uri: image}}
                    style={styles.image}
                  />
                ))}
              </ScrollView>

              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => handleSubmit()}>
                <Text style={styles.textBtn}>Lưu</Text>
              </TouchableOpacity>

              <DateTimePickerModal
                isVisible={visibleDate}
                mode="date"
                locale="vi_VN"
                confirmTextIOS="Chọn"
                cancelTextIOS="Hủy"
                onConfirm={date => setFieldValue('time', date)}
                onCancel={showHidenDate}
              />

              <SelectValueModal
                title="Chọn trạng thái"
                isVisible={modalVisible}
                onClose={() => setModalVisible(false)}
                onSelectValue={e => setFieldValue('status', e.value)}
                values={options}
              />
            </View>
          )}
        </Formik>

        <ImagePickerModal
          isVisible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          onSelectImage={e => {
            setSelectedImages(e);
            setIsModalVisible(false);
          }}
          multiple={true}
        />
      </View>
    </View>
  );
};

export default ProcessingDetailScreen;
