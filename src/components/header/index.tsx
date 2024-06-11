import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
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

  const insets = useSafeAreaInsets();

  return (
    <View style={{backgroundColor: '#fff'}}>
      <StatusBar
        animated={true}
        backgroundColor={'#fff'}
        // barStyle={'slide'}
        translucent={false}
        hidden={false}
        barStyle={'dark-content'}
      />
      <View
        style={{
          height: Platform.OS === 'ios' ? insets.top : 0,
        }}></View>
      <View style={[styles.container, headerStyle]}>
        <TouchableOpacity
          onPress={onBackPress ? onBackPress : () => navigate.goBack()}>
          <Icon name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={[styles.title, titleStyle]}>{title}</Text>
        {IconRight ? (
          <TouchableOpacity onPress={onActionPress}>
            {IconRight}
          </TouchableOpacity>
        ) : (
          <View></View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
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
