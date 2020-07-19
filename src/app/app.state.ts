import { AuthState, Action } from 'app/app.type';
import { updateObject } from 'helper/common-helper';
import { LS } from 'helper/local-storage-helper';
import { LS_KEY } from './app.constant';

const AUTH = 'AUTH';
export const RESTORE_AUTH = 'RESTORE_AUTH';
export const AUTH_ACTION_STOPPED = 'AUTH_ACTION_STOPPED';
export const AUTH_ACTION_PENDING = `${AUTH}_ACTION_PENDING`;
export const SIGN_IN_ERROR = `${AUTH}_SIGN_IN_ERROR`;
export const SIGN_IN_SUCCESS = `${AUTH}_SIGN_IN_SUCCESS`;
export const SIGN_OUT_SUCCESS = `${AUTH}_SIGN_OUT_SUCCESS`;

export const initialState: AuthState = {
  email: '',
  isHandlingAuth: false,
  isAuthenticated: false,
  setCurrentAuth: () => null,
};

export const reducer = (
  state: AuthState = initialState,
  action: Action
): any => {
  switch (action.type) {
    case AUTH_ACTION_PENDING:
      return updateObject(state, {
        isHandlingAuth: true,
      });

    case SIGN_IN_SUCCESS:
      LS.set(LS_KEY.CURRENT_USER, action.payload);

      return updateObject(state, {
        isHandlingAuth: false,
        isAuthenticated: true,
        email: action.payload.email,
      });

    case SIGN_IN_ERROR:
      return updateObject(state, {
        isHandlingAuth: false,
      });

    case AUTH_ACTION_STOPPED:
      return updateObject(state, {
        isHandlingAuth: false,
      });

    case SIGN_OUT_SUCCESS:
      return updateObject(state, {
        ...initialState,
      });

    case RESTORE_AUTH:
      return updateObject(state, {
        isHandlingAuth: false,
        isAuthenticated: true,
        ...action.payload,
      });

    default:
      return state;
  }
};
