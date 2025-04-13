/**
 * @TODO: Define reducer for the isPreLoad state
 */

import { ActionType } from "./action";

function isPreLoadReducer(isPreLoad = true, action = {}) {
  switch (action.type) {
    case ActionType.SET_IS_PRELOAD:
      return action.payload.isPreLoad;
    default:
      return isPreLoad;
  }
}

export default isPreLoadReducer;
