// // store/index.ts
// import { combineReducers, applyMiddleware } from 'redux';
// import { legacy_createStore as createStore } from 'redux';
// import { taskMiddleware } from 'react-palm/tasks';
// import keplerGlReducer from 'kepler.gl/reducers';

// const reducers = combineReducers({
//   keplerGl: keplerGlReducer,
// });

// export type RootState = ReturnType<typeof reducers>;

// const store = createStore(reducers, {}, applyMiddleware(taskMiddleware));
// export default store;
