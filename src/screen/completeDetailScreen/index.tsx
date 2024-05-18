import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {styles} from './style';
import HeaderCustom from '../../components/header';

const DetailCompleteScreen = ({route}: {route: any}) => {
  // Thông tin bản ghi
  const {item: record} = route.params;
  return (
    <View style={{flex: 1}}>
      <HeaderCustom title="Chi tiết đơn hàng" />
      <View style={styles.container}>
        <View style={styles.detailContainer}>
          <View style={styles.row}>
            <View style={styles.containerIcon}>
              <Icon name="user" size={20} style={styles.icon} />
            </View>
            <Text style={styles.label}>Khách hàng:</Text>
          </View>
          <Text style={styles.value}>{record?.customer}</Text>
        </View>
        <View style={styles.detailContainer}>
          <View style={styles.row}>
            <View style={styles.containerIcon}>
              <Icon name="truck" size={20} style={styles.icon} />
            </View>
            <Text style={styles.label}>Điểm đón:</Text>
          </View>
          <Text style={styles.value}>{record?.pickupPoint}</Text>
        </View>
        <View style={styles.detailContainer}>
          <View style={styles.row}>
            <View style={styles.containerIcon}>
              <Icon name="clock-o" size={20} style={styles.icon} />
            </View>
            <Text style={styles.label}>Thời gian đón:</Text>
          </View>
          <Text style={styles.value}>{record?.pickupTime}</Text>
        </View>
        <View style={styles.detailContainer}>
          <View style={styles.row}>
            <View style={styles.containerIcon}>
              <Icon name="map-marker" size={20} style={styles.icon} />
            </View>
            <Text style={styles.label}>Điểm trả:</Text>
          </View>
          <Text style={styles.value}>{record?.dropoffPoint}</Text>
        </View>
      </View>
    </View>
  );
};

export default DetailCompleteScreen;
