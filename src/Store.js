import {createStore, applyMiddleware, compose} from 'redux'
import reducer from './reducers'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'


const initialState = {}
const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(
    applyMiddleware(...middleware)
  )
)

export default store
