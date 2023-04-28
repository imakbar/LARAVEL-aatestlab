const ID_TOKEN_KEY = "id_token" as string;
const USER_TOKEN_KEY = "user" as string;
const Store_USER_TOKEN_KEY = "userinfo" as string;
const Store_Dashboard_TOKEN_KEY = "dashboard_data" as string;
const Store_APP_SETTINGS = "app_settings" as string;



/**
 * @description get token form localStorage
 */
export const getToken = (): string | null => {
  return window.localStorage.getItem(ID_TOKEN_KEY);
};

/**
 * @description save token into localStorage
 * @param token: string
 */
export const saveToken = (token: string): void => {
  window.localStorage.setItem(ID_TOKEN_KEY, token);
};

export const saveUser = (user: string): void => {
  window.localStorage.setItem(USER_TOKEN_KEY, user);
};

export const saveInfo = (user: string): void => {
  window.localStorage.setItem(Store_USER_TOKEN_KEY, user);
};

export const saveAppSettings = (appsettings: string): void => {
  window.localStorage.setItem(Store_APP_SETTINGS, appsettings);
};

/**
 * @description remove token form localStorage
 */
export const destroyToken = (): void => {
  window.localStorage.removeItem(ID_TOKEN_KEY);
  window.localStorage.removeItem(USER_TOKEN_KEY);
  window.localStorage.removeItem(ID_TOKEN_KEY);
  window.localStorage.removeItem(Store_USER_TOKEN_KEY);
  window.localStorage.removeItem(Store_Dashboard_TOKEN_KEY);
  window.localStorage.removeItem(Store_APP_SETTINGS);
  window.localStorage.clear();
};

export default { getToken, saveToken, destroyToken, saveUser, saveInfo, saveAppSettings };
