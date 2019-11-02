import { USER_CHANGE } from '../constants';

export function changeUid(uid) {
  return {
    type: USER_CHANGE,
    payload: uid
  }
}