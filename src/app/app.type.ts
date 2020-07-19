export interface AuthState {
  email: string;
  isHandlingAuth: boolean;
  isAuthenticated: boolean;
  setCurrentAuth: (currentAuth: AuthState) => void;
}

export interface Action {
  payload?: any;
  type: string;
}
