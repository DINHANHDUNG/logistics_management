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

  const onSubmit = (values: {
    username: string;
    password: string;
    key: string;
  }) => {
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
        initialValues={{username: '', password: '', key: ''}}
        onSubmit={onSubmit}>
        {({handleChange, handleBlur, handleSubmit, values, errors}) => (
          <View>
            <Text style={styles.label}>User name</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              value={values.username}
              placeholder="Enter username"
            />
            {errors.username && (
              <Text style={styles.errorText}>{errors.username}</Text>
            )}

            <Text style={styles.label}>Password</Text>
            <View style={[styles.input, styles.inputPass]}>
              <TextInput
                style={{flex: 1}}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                placeholder="Enter password"
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

            <Text style={styles.label}>Key</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('key')}
              onBlur={handleBlur('key')}
              value={values.key}
              placeholder="Enter key"
            />
            {errors.key && <Text style={styles.errorText}>{errors.key}</Text>}
            <TouchableOpacity
              style={styles.btnLogin}
              onPress={() => handleSubmit()}>
              <Text style={styles.textLogin}>Đăng nhập</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
}
