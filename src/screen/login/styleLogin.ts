import {StyleSheet} from 'react-native';
import {colors} from '../../common/color';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
  },
  top: {
    // marginVertical: 10,
    alignItems: 'center',
  },
  textTitle: {
    color: colors.colorMain2,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    textTransform: 'uppercase',
  },
  subTitle: {
    color: 'gray',
  },
  label: {
    marginBottom: 5,
    marginTop: 12,
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
  inputPass: {
    paddingHorizontal: 5,
    paddingVertical: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 40,
    alignItems: 'center',
  },
  btnLogin: {
    backgroundColor: colors.colorMain2,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 4,
    marginTop: 12,
  },
  textLogin: {
    color: 'white',
    textAlign: 'center',
  },
  errorText: {
    fontSize: 10,
    color: 'red',
  },
  logoWrapper: {
    width: 400,
    height: 150,
    objectFit: 'contain',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    marginRight: 10,
  },
  checkboxLabel: {
    fontSize: 16,
  },
});
