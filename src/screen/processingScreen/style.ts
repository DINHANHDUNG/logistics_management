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
  deliveryContainer: {
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
    width: '45%',
    // marginHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
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
  transferButton: {
    backgroundColor: '#FF5733', // Màu nền cho nút "Chuyển TT"
  },
  completeButton: {
    backgroundColor: '#28a745', // Màu nền cho nút "Hoàn thành"
  },
});