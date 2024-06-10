import {useNavigation} from '@react-navigation/native';
import {useFormik} from 'formik';
import React, {useState, useEffect} from 'react';
import {
  Alert,
  Platform,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {loginValidationSchema} from './schema';
import {styles} from './styleLogin';
import {Image} from 'react-native';
import {useLazyLoginQuery} from '../../app/services/login';
import LoadingModal from '../../components/modals/loadingModal';
import {useAppDispatch} from '../../app/hooks';
import {changeUser} from '../../app/features/auth/authSlice';
import {MSG} from '../../common/contants';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
const iconLogo = require('../../assets/images/logoLogin.png');

const eyeOff = <Icon name="eye-off-outline" size={15} />;
const eyeOn = <Icon name="eye-outline" size={15} />;

const LoginScreen = () => {
  const [login, {isLoading, isError}] = useLazyLoginQuery();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [state, setState] = useState({
    showPassword: false,
  });

  const insets = useSafeAreaInsets();

  const changeState = (key: string, value: any) => {
    setState(pre => ({...pre, [key]: value}));
  };

  const formik = useFormik({
    initialValues: {
      UserName: '',
      Password: '',
      ProductKey: '',
      rememberMe: false,
    },
    validationSchema: loginValidationSchema,
    onSubmit: async values => {
      login({
        UserName: values.UserName,
        Password: values.Password,
        ProductKey: values.ProductKey,
      }).then((req: any) => {
        console.log(req);
        if (req.data.data.IDUser) {
          dispatch(changeUser(req.data.data));
          navigation.navigate('LoadingScreen');
        } else {
          Alert.alert(MSG.err, MSG.errLoginfail);
        }
      });
      if (values.rememberMe) {
        try {
          await AsyncStorage.setItem('UserName', values.UserName);
          await AsyncStorage.setItem('Password', values.Password);
          await AsyncStorage.setItem('ProductKey', values.ProductKey);
          await AsyncStorage.setItem('rememberMe', 'true');
        } catch (error) {
          console.error('Failed to save credentials', error);
        }
      } else {
        try {
          await AsyncStorage.removeItem('UserName');
          await AsyncStorage.removeItem('Password');
          await AsyncStorage.removeItem('ProductKey');
          await AsyncStorage.removeItem('rememberMe');
        } catch (error) {
          console.error('Failed to clear credentials', error);
        }
      }
    },
  });

  useEffect(() => {
    const loadCredentials = async () => {
      try {
        const savedUserName = await AsyncStorage.getItem('UserName');
        const savedPassword = await AsyncStorage.getItem('Password');
        const savedProductKey = await AsyncStorage.getItem('ProductKey');
        const rememberMe = await AsyncStorage.getItem('rememberMe');
        if (
          savedUserName &&
          savedPassword &&
          savedProductKey &&
          rememberMe === 'true'
        ) {
          formik.setValues({
            UserName: savedUserName,
            Password: savedPassword,
            ProductKey: savedProductKey,
            rememberMe: true,
          });
        }
      } catch (error) {
        console.error('Failed to load credentials', error);
      }
    };
    loadCredentials();
  }, [formik.setValues]);

  useEffect(() => {
    if (!isLoading && isError === true) {
      Alert.alert(MSG.err, MSG.errLoginfail);
    }
  }, [isError, isLoading]);

  return (
    <View
      style={{
        ...styles.container,
        paddingTop: Platform.OS === 'ios' ? insets.top : 0,
      }}>
      <StatusBar
        animated={true}
        backgroundColor={'#ffffff'}
        // barStyle={'slide'}
        translucent={false}
        hidden={false}
        barStyle={'dark-content'}
      />
      <View style={styles.top}>
        <Image source={iconLogo} style={styles.logoWrapper} />
      </View>
      <KeyboardAwareScrollView
      // keyboardShouldPersistTaps={'always'}
      >
        <Text style={styles.label}>Tài khoản</Text>
        <TextInput
          style={styles.input}
          onChangeText={formik.handleChange('UserName')}
          onBlur={formik.handleBlur('UserName')}
          value={formik.values.UserName}
          placeholder="Enter UserName"
        />
        {formik.touched.UserName && formik.errors.UserName && (
          <Text style={styles.errorText}>{formik.errors.UserName}</Text>
        )}

        <Text style={styles.label}>Mật khẩu</Text>
        <View style={[styles.input, styles.inputPass]}>
          <TextInput
            style={{flex: 1}}
            onChangeText={formik.handleChange('Password')}
            onBlur={formik.handleBlur('Password')}
            value={formik.values.Password}
            placeholder="Enter Password"
            secureTextEntry={!state.showPassword}
          />
          <TouchableOpacity
            onPress={() => changeState('showPassword', !state.showPassword)}>
            {state.showPassword ? eyeOn : eyeOff}
          </TouchableOpacity>
        </View>
        {formik.touched.Password && formik.errors.Password && (
          <Text style={styles.errorText}>{formik.errors.Password}</Text>
        )}

        <Text style={styles.label}>ProductKey</Text>
        <TextInput
          style={styles.input}
          onChangeText={formik.handleChange('ProductKey')}
          onBlur={formik.handleBlur('ProductKey')}
          value={formik.values.ProductKey}
          placeholder="Enter ProductKey"
        />
        {formik.touched.ProductKey && formik.errors.ProductKey && (
          <Text style={styles.errorText}>{formik.errors.ProductKey}</Text>
        )}

        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            onPress={() =>
              formik.setFieldValue('rememberMe', !formik.values.rememberMe)
            }
            style={styles.checkbox}>
            <Icon
              name={
                formik.values.rememberMe
                  ? 'checkbox-marked'
                  : 'checkbox-blank-outline'
              }
              size={20}
            />
          </TouchableOpacity>
          <Text style={styles.checkboxLabel}>Lưu tài khoản</Text>
        </View>

        <TouchableOpacity style={styles.btnLogin} onPress={formik.handleSubmit}>
          <Text style={styles.textLogin}>Đăng nhập</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
      <LoadingModal isVisible={isLoading} />
    </View>
  );
};

export default LoginScreen;
