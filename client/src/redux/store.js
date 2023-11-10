import { configureStore } from '@reduxjs/toolkit'

//It then exports a variable named store which is created by calling configureStore() with an object containing the reducer and middleware.
export const store = configureStore({
    reducer: {},//
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: false``
        });
    }

})

// middleware: This property is a function that receives getDefaultMiddleware as a parameter.
//  It returns the result of calling getDefaultMiddleware with an options object that 
//  has serializableCheck set to false.This disables the serializability checks for the Redux state,
//     which is useful when you have non - serializable values in your state.

