import {Formik} from 'formik';
import React from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import HeaderCustom from '../../components/header';
import {formatCurrency} from '../../utils';
import {styles} from './style';
import {validationSchema} from './schema';

const PouroilDetailScreen = ({route}: {route: any}) => {
  const {item: record} = route.params;

  console.log('record', record);

  return (
    <View style={{flex: 1}}>
      <HeaderCustom title={`${!record?.id ? 'Thêm mới' : 'Cập nhật'} đổ dầu`} />
      <View style={styles.container}>
        <Formik
          initialValues={{
            licensePlate: record?.licensePlate || '',
            seller: record?.seller || '',
            quantity: record?.quantity?.toString() || '',
            unitPrice: record?.unitPrice?.toString() || '',
          }}
          validationSchema={validationSchema}
          onSubmit={values => {
            console.log(values);
          }}>
          {({handleChange, handleBlur, handleSubmit, values, errors}) => (
            <View>
              <Text style={styles.label}>Biển số xe</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('licensePlate')}
                onBlur={handleBlur('licensePlate')}
                value={values.licensePlate}
                placeholder="Nhập biển số xe"
              />
              {errors?.licensePlate && (
                <Text style={styles.errorText}>{errors?.licensePlate}</Text>
              )}

              <Text style={styles.label}>Đơn vị bán</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('seller')}
                onBlur={handleBlur('seller')}
                value={values.seller}
                placeholder="Nhập đơn vị bán"
              />
              {errors?.seller && (
                <Text style={styles.errorText}>{errors?.seller}</Text>
              )}

              <Text style={styles.label}>Số lượng</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('quantity')}
                onBlur={handleBlur('quantity')}
                // value={formatCurrency2(values.quantity)}
                value={values.quantity}
                placeholder="Nhập số lượng"
                keyboardType="numeric"
              />
              {errors?.quantity && (
                <Text style={styles.errorText}>{errors?.quantity}</Text>
              )}

              <Text style={styles.label}>Đơn giá</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('unitPrice')}
                onBlur={handleBlur('unitPrice')}
                // value={formatCurrency2(values.unitPrice)}
                value={values.unitPrice}
                placeholder="Nhập đơn giá"
                keyboardType="numeric"
              />
              {errors?.unitPrice && (
                <Text style={styles.errorText}>{errors?.unitPrice}</Text>
              )}

              <Text style={styles.label}>Thành tiền</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('unitPrice')}
                onBlur={handleBlur('unitPrice')}
                value={formatCurrency(
                  (
                    Number(values?.unitPrice ?? 0) *
                    Number(values?.quantity ?? 0)
                  ).toString(),
                )}
                placeholder="Thành tiền"
                keyboardType="numeric"
                editable={false}
              />
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => handleSubmit()}>
                <Text style={styles.textBtn}>Lưu</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
};

export default PouroilDetailScreen;
