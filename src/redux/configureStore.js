import { combineReducers, configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import loginReducer from './login/loginReducer';
import databaseReducer from './database/databaseReducer';
import AppStateReducer from './app-state/appState';

const rootReducer = combineReducers({
  database: databaseReducer,
  login: loginReducer,
  appState: AppStateReducer,

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
