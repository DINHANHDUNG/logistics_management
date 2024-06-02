import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Bạn có thể thay thế bằng bất kỳ bộ icon nào
import {colors} from '../../common/color';
import HomeHeader from '../../components/header/headerBottomTab';
import Ionicons from 'react-native-vector-icons/Ionicons';
const ListReportScreen = () => {
  const navigation = useNavigation();
  const items = [
    // {name: 'Chuyến vận chuyển', icon: 'truck', screen: 'TransportScreen'},
    // {name: 'Lịch Vận chuyển', icon: 'calendar', screen: 'ScheduleScreen'},
    {name: 'Sửa chữa xe', icon: 'wrench', screen: 'RepairReportScreen'},
    {name: 'Đổ dầu', icon: 'tint', screen: 'PouroilReportScreen'},
    {name: 'Trạng thái xe', icon: 'bus', screen: 'StatusCarReportScreen'},
    {
      name: 'Điều phối',
      icon: 'car-sport',
      screen: 'VehicleCoordinationReportScreen',
    },
  ];

  return (
    <View style={styles.container}>
      <HomeHeader />
      <View style={styles.containerItem}>
        {items.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.item}
            onPress={() => navigation.navigate(item.screen)}>
            <View style={styles.itemContent}>
              <View style={styles.containIcon}>
                {item.name === 'Điều phối' ? (
                  <Ionicons
                    name={item.icon}
                    size={24}
                    color={colors.colorMain2}
                  />
                ) : (
                  <Icon name={item.icon} size={24} color={colors.colorMain2} />
                )}
              </View>
              <Text style={styles.itemText}>{item.name}</Text>
              <Icon
                name="chevron-right"
                size={14}
                color="gray"
                style={styles.chevronIcon}
              />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
    backgroundColor: '#fff',
  },
  containerItem: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  containIcon: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 15,
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#000',
  },
  chevronIcon: {
    marginLeft: 'auto',
  },
});

export default ListReportScreen;
