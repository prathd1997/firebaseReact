import axios from 'axios';
import * as actionTypes from '../ActionTypes/actionsTypes';

export const getUserList = (data) => {
    return {
      type: actionTypes.GET_USER_LIST,
      usersList: data,
    };
  };
  export function loadingFlag(data) {
    return {
      type: actionTypes.GET_USER_LIST_LOADING_FLAG,
      loading: data,
    };
  }
export const getUsersListData = () => {
    return (dispatch) => {
      dispatch(loadingFlag(true));
      return axios
        .get(`https://zerostics-default-rtdb.firebaseio.com/users`)
        .then((response) => {
            console.log(response)
          dispatch(loadingFlag(false));
          if (response && response.data) {
            dispatch(getUserList(response.data));
          } else {
            dispatch(getUserList([]));
          }
        })
        .catch((error) => {
          dispatch(getUserList([]));
  
          console.log(error);
        });
    };
  };