import React from "react";
import * as ReactDOM from "react-dom";
import App from "#components/app/app";
// import {BrowserRouter} from "react-router-dom";
import "#src/css/style.scss";
import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import rootReducer from "#src/js/redux/reducers/root-reducer";
import {Provider} from "react-redux";
import {ReadListActions} from "#src/js/redux/reducers/slices/read-list-slice";
// import {FavoriteActions} from "#src/js/redux/reducers/slices/favorite-slice";

(() => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware({thunk: true}),
    devTools: true,
  });

  // Получим из хранилища в state сохранённые данные
  store.dispatch(ReadListActions.fromStorage());

  // Сохраним в localStorage изменения нужных нам данны х
  store.subscribe(() => {
    const state = store.getState();
    localStorage.setItem(`readList`, JSON.stringify(state.readListReducer));
  });

  ReactDOM.render((
      <Provider store={store}>
        <App />
      </Provider>
    ),
    document.querySelector(`#root`),
  );

})();