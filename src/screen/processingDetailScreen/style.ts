import {StyleSheet} from 'react-native';
import {colors} from '../../common/color';

export const styles = StyleSheet.create({
  label: {
    marginBottom: 5,
    marginTop: 12,
    fontWeight: '600',
    fontSize: 16
  },
  input: {
    borderWidth: 0.5,
    borderColor: 'gray',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
    marginBottom: 5,
    minHeight: 40,
    fontSize: 16
  },
  errorText: {
    color: 'red',
    marginBottom: 5,
  },
  buttonContainer: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 4,
    marginTop: 12,
  },
  textBtn: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16
  },
  iconButton: {
    flexDirection: 'row',
    paddingVertical: 10,
    marginTop: 10,
  },
  iconInput: {
    position: 'absolute',
    right: 10,
    fontSize: 14,
    // color: colors.colorMain2,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: '100%',
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 4,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  inputDate: {
    flex: 1,
    paddingRight: 30, // Space for the icon
    height: '100%',
    // alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  ImgItem: {
    position: 'relative',
  },
  icon_delete_img: {
    position: 'absolute',
    right: 15,
    top: 5,
    color: 'red',
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 10,
  },
});
