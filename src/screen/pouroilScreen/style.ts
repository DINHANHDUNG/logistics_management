import {Platform, StyleSheet} from 'react-native';
import {colors} from '../../common/color';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Màu nền tổng thể
  },
  containerScroll: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff', // Màu nền tổng thể
  },
  containerFilter: {
    marginTop: 10,
    paddingHorizontal: 20,
  },

  containerIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 30,
    justifyContent: 'center',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginBottom: 4,
  },
  icon: {
    marginRight: 8,
    color: colors.colorMain2,
  },
  pouroilContainer: {
    margin: 10,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 5,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  text: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    // flex: 1,
    width: '40%',
    // marginHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 5,
    alignItems: 'center',
  },
  acceptButton: {
    backgroundColor: '#4CAF50',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  rejectButton: {
    backgroundColor: '#F44336',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 5,
  },
  //Input Date
  label: {
    marginBottom: 5,
    marginTop: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  input: {
    flex: 1,
    textAlign: 'center',
    paddingRight: 30, // Space for the icon
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconInput: {
    position: 'absolute',
    right: 10,
    color: colors.colorMain2,
  },
  border: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});
