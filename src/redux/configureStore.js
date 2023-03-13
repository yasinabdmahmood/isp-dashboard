import { combineReducers, configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import rocketReducer from './rockets/rocketReducer';
import loginReducer from './login/loginReducer';

const rootReducer = combineReducers({
  rockets: rocketReducer,
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
