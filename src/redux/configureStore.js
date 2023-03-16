import { combineReducers, configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import loginReducer from './login/loginReducer';
import databaseReducer from './database/databaseReducer';

const rootReducer = combineReducers({
  database: databaseReducer,
  login: loginReducer,

});
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: ['getRockets//fulfilled', 'getMissions//fulfilled'],
    },
  }).concat(logger),
});

export default store;
