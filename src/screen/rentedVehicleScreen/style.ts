import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
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
    backgroundColor: '#2196F3',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 4,
    marginTop: 12,
  },
  textBtn: {
    color: 'white',
    textAlign: 'center',
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
    height: 40,
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
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 10,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemRow: {
    width: '48%',
  },
});
