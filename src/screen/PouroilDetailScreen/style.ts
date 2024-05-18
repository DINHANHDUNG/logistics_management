import {StyleSheet} from 'react-native';
import { colors } from '../../common/color';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff', // Màu nền tổng thể
  },
  label: {
    marginBottom: 5,
    marginTop: 12,
    fontWeight: '600',
  },
  input: {
    borderWidth: 0.5,
    borderColor: 'gray',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
    marginBottom: 5,
    height: 40,
  },
  errorText: {
    color: 'red',
    marginBottom: 5,
  },
  buttonContainer: {
    backgroundColor: colors.colorMain2,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
    marginTop: 12,
  },
  textBtn: {color: 'white', textAlign: 'center'},
});
