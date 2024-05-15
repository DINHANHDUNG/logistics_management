import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
  },
  top: {
    marginBottom: 30,
  },
  textTitle: {
    color: '#1F41BB',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 5,
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
    // flex: 1,
    paddingVertical: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 40,
    alignItems: 'center',
  },
  btnLogin: {
    backgroundColor: '#1F41BB',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
    marginTop: 12,
  },
  textLogin: {
    color: 'white',
    textAlign: 'center',
  },
  errorText: {fontSize: 10, color: 'red'},
});
