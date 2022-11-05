import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { libraryApi } from './libraryApi';
import { appSlice } from './appSlice';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [libraryApi.reducerPath],
};

const reducer = combineReducers({
  [appSlice.name]: appSlice.reducer,
  [libraryApi.reducerPath]: libraryApi.reducer,
});

// this ensures your redux state is saved to persisted storage whenever it changes
// we pass this to the store
const persistedReducer = persistReducer(persistConfig, reducer);
const makeStore = () =>
  configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(libraryApi.middleware),
  });

const reduxStore = () => {
  const store = makeStore();

  const persistor = persistStore(store);
  return { persistor, store };
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export default reduxStore;
