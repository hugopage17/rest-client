import {SET_USER, SAVE_REQUEST, ADD_HEADER, SET_BODY} from './Types'

export const setUser = (user) => dispatch => {
  dispatch({
    type:SET_USER,
    payload:user
  })
}

export const saveRequest = (request) => dispatch => {
  dispatch({
    type:SAVE_REQUEST,
    payload:request
  })
}

export const setHeaders = (array) => dispatch => {
  dispatch({
    type:ADD_HEADER,
    payload:array
  })
}

export const setBody = (body) => dispatch => {
  dispatch({
    type:SET_BODY,
    payload:body
  })
}
