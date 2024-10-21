import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
// slices

import authReducer from './slices/auth';

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  //   whitelist: [],
  //   blacklist: [],
};

const rootReducer = combineReducers({
  auth: authReducer,
  
});

export { rootPersistConfig, rootReducer };
