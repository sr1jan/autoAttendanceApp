import { USER_CHANGE } from '../constants';

const initialState = {
uid: ''
};

const userReducer = (state = initialState, action) => {
  switch(action.type) {
    case USER_CHANGE:
      return {
        ...state,
        uid:action.payload
      };

    default:
      return state;
  }
}

export default userReducer;