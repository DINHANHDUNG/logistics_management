import {StyleSheet} from 'react-native';
import {colors} from '../../common/color';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  containerIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 30,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  detailContainer: {
    marginBottom: 15,
  },
  icon: {
    marginRight: 10,
    color: colors.colorMain2,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  value: {
    fontSize: 16,
    color: 'gray',
    marginLeft: 30, // Canh chỉnh text value thụt vào bằng với label
  },
});
