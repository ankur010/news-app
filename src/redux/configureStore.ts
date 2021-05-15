/* @flow */
import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import state from './initialState';

import news from './reducers/news';


function configureStore(initialState = state) {
  const reducer = combineReducers({
    news,
  });


  const store = createStore(
    persistReducer(
      {
        key: 'root',
        storage,
        whitelist: [
          'news',
        ],
      },
      reducer,
    ),
    initialState,
    
  );

  const persistor = persistStore(store);
  return { store, persistor };
}

export default configureStore;
