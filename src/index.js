import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider} from "react-redux";
import {configureStore, combineReducers} from "@reduxjs/toolkit";
import currentUserReducer from "./features/currentUser";
import allUsersReduces from "./features/allUsers";
import {persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER,} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {PersistGate} from "redux-persist/integration/react";
import {createStateSyncMiddleware, initMessageListener} from 'redux-state-sync';
import conversationsReducer from "./features/conversations";
import blockedUsersReducer from "./features/blockedUsers";

const rootReducer = combineReducers({
    currentUser: currentUserReducer,
    allUsers: allUsersReduces,
    conversations: conversationsReducer,
    blockedUsers: blockedUsersReducer
});

const stateSyncConfig = {
    blacklist: ['persist/PERSIST', 'current_user/setCurrentUser'],
};

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['currentUser']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat([createStateSyncMiddleware(stateSyncConfig)]),
})

initMessageListener(store);
const persist = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persist}>
            <App />
        </PersistGate>
    </Provider>
);