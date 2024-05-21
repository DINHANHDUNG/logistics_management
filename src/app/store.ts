import {configureStore} from '@reduxjs/toolkit';
import counterReducer from './features/counter/counterSlice';
import authReducer from './features/auth/authSlice';
// import {pokemonApi} from './services/pokemon';
import {authApi} from './services/login';
import {statusCarApi} from './services/statusCar';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    //RTKQR
    // [pokemonApi.reducerPath]: pokemonApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [statusCarApi.reducerPath]: statusCarApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(authApi.middleware, statusCarApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
