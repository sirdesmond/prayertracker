import { AsyncStorage } from 'react-native'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from '../reducers';

export default configureStore = (initialState)  => {
  const store = createStore(reducers,{},applyMiddleware(thunk))
  // syncOffline(store)
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept(reducers, () => {
      const nextRootReducer = require('../reducers/index');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store
}
