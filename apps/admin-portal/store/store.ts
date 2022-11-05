import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { appSlice } from './appSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const reducer = combineReducers({
  [appSlice.name]: appSlice.reducer,
});

// this ensures your redux state is saved to persisted storage whenever it changes
// we pass this to the store
const persistedReducer = persistReducer(persistConfig, reducer);
const makeStore = () =>
  configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
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
