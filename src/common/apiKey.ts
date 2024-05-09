import Config from "react-native-config";
export const API_URL = Config.REACT_APP_BASE_URL ?? ''

export const NetWork = {
  //Admin
  login: 'auth/login',

  //Pokemon
  pokemon: 'api/v2/'
}
