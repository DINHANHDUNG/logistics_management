import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Example using Ionicons

interface Props {
  title: string;
  onBackPress?: () => void;
  onActionPress?: () => void;
  IconRight?: React.ReactNode;
  headerStyle?: any;
  titleStyle?: any;
}

const HeaderCustom = (props: Props) => {
  const navigate = useNavigation();
  const {
    title,
    onBackPress,
    onActionPress,
    IconRight,
    headerStyle,
    titleStyle,
  } = props;
  return (
    <View style={[styles.container, headerStyle]}>
      <TouchableOpacity
        onPress={onBackPress ? onBackPress : () => navigate.goBack()}>
        <Icon name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={[styles.title, titleStyle]}>{title}</Text>
      {IconRight ? (
        <TouchableOpacity onPress={onActionPress}>{IconRight}</TouchableOpacity>
      ) : (
        <View></View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: 'white', // Example background color
    borderBottomWidth: 1,
    borderBottomColor: '#ccc', // Example border color,
    height: 50,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HeaderCustom;
