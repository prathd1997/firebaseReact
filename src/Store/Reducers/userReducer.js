import * as actionTypes from '../ActionTypes/actionsTypes';
import { initialState } from '../Constants/constants';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_LIST:
      return { ...state, usersList: action.userList };
    default:
      return state;
  }
};
export default reducer;
