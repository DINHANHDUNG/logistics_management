import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import React, {useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {loginValidationSchema} from './schema';
import {styles} from './styleLogin';

const eyeOff = <Icon name="eye-off-outline" size={15} />;
const eyeOn = <Icon name="eye-outline" size={15} />;

export default function LoginScreen() {
  const navigation = useNavigation();
  const [state, setState] = useState({
    showPassword: false,
  });

  const changeState = (key: string, value: any) => {
    setState(pre => ({...pre, [key]: value}));
  };

  const onSubmit = (values: {email: string; password: string}) => {
    console.log(values);
    navigation.navigate('LoadingScreen');
  };
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.textTitle}>Đăng nhập</Text>
        <Text style={styles.subTitle}>Vui lòng đăng nhập để tiếp tục</Text>
      </View>
      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{email: '', password: ''}}
        onSubmit={onSubmit}>
        {({handleChange, handleBlur, handleSubmit, values, errors}) => (
          <View>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              //   onChangeText={onChangeNumber}
              //   value={number}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              keyboardType="email-address"
              placeholder="Nhập địa chỉ email"
            />
            {errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}

            <Text style={styles.label}>Mat khau</Text>
            <View style={[styles.input, styles.inputPass]}>
              <TextInput
                style={{flex: 1}}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                placeholder="Nhập mật khẩu"
                secureTextEntry={state.showPassword ? true : false}
              />
              <TouchableOpacity
                onPress={() =>
                  changeState('showPassword', !state.showPassword)
                }>
                {state.showPassword ? eyeOn : eyeOff}
              </TouchableOpacity>
            </View>
            {errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
            <TouchableOpacity style={styles.btnLogin} onPress={handleSubmit}>
              <Text style={styles.textLogin}>Đăng nhập</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
}
