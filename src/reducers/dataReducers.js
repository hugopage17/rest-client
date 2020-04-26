import {SET_USER, SAVE_REQUEST, ADD_HEADER, SET_BODY} from '../actions/Types'

const initialState = {
  user:{},
  request:{},
  headers:[],
  body:''
}

export default function(state = initialState, action){
  switch(action.type){
    case SET_USER:
      return{
        ...state,
        user:action.payload
      }
    case SAVE_REQUEST:
      return{
        ...state,
        request:action.payload
      }
    case ADD_HEADER:
      return{
        ...state,
        headers:action.payload
      }
    case SET_BODY:
      return{
        ...state,
        body:action.payload
      }
    default:
      return state;
  }
}
