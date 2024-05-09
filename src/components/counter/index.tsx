import type {RootState} from '../../app/store';
import {decrement, increment} from '../../app/features/counter/counterSlice';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {useGetPokemonByNameQuery} from '../../app/services/pokemon';

export function Counter() {
  const count = useAppSelector((state: RootState) => state.counter.value);
  const dispatch = useAppDispatch();
  const {data, isLoading} = useGetPokemonByNameQuery('bulbasaur');
  
  return (
    <View>
      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => dispatch(increment())}>
          <Text>Increment</Text>
        </TouchableOpacity>
        <Text>{count}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => dispatch(decrement())}>
          <Text>Decrement</Text>
        </TouchableOpacity>
        {isLoading && <Text>Loading...</Text>}
        {data && (
          <View>
            <Text>{data.species.name}</Text>
            <Image
              source={{uri: data.sprites.front_shiny}}
              style={{width: 100, height: 100}}
            />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
  countContainer: {
    alignItems: 'center',
    padding: 10,
  },
});
