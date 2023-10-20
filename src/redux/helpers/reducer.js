import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import baseUrl from '../baseUrl';

export default class Reducer {
    constructor({name,url,method,reducer}){
        this.asyncThunk = this.buildAsyncThunk(name,url,method);
        Reducer.asyncThunks[name] = this.asyncThunk;
        this.reducer = reducer
    }
    buildAsyncThunk(name,url,method){
        return createAsyncThunk(
            name,
            async (payload) => {
              const config = {withCredentials: true}
              if(payload){config.params = payload}
              try {
                return  axios[method](baseUrl + url, config);
              } catch (error) {
                return error;
              }
            },
          );
    }

    static asyncThunks = {};
}

