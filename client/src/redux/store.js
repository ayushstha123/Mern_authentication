import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import {persistReducer,persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';

 //THE ROOT REDUCER IS THE STORE REDUCER THAT IS USED TO STORE THE STATE OF THE APPLICATION IN THE REDUX STORE.COMBINE REDUCERS IS USED TO COMBINE MULTIPLE REDUCERS INTO ONE
const rootReducer=combineReducers({user:userReducer});

const persistConfig={
    key:'root',//key=root means that the state will be stored in the local storage.which means that the entire state of the store will be persisted.
    version:1,//version 1 is used to version the state.This is used to ensure that the persisted state is compatible with the current version of your application. 
    storage //this is used to store the state in the local storage
}

const persistedReducer=persistReducer(persistConfig,rootReducer);//persistConfig is an object that contains the configuration for the persistence

//It then exports a variable named store which is created by calling configureStore() with an object containing the reducer and middleware.
export const store = configureStore({
    reducer: persistedReducer, //this line of code is used to store the state in the local storage
    middleware: (getDefaultMiddleware) => {//this line of code is used to configure the middleware      
        return getDefaultMiddleware({
            serializableCheck: false
        });
    }

})

// middleware: This property is a function that receives getDefaultMiddleware as a parameter.
//  It returns the result of calling getDefaultMiddleware with an options object that 
//  has serializableCheck set to false.This disables the serializability checks for the Redux state,
//     which is useful when you have non - serializable values in your state.

export const persistor= persistStore(store);