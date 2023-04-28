enum Actions {
  SET_SAMPLE_ACTION = "SampleAction",
  // VERIFY_AUTH_ACTION = "verifyAuthAction",

  SET_SELECT_MEDIA_ACTION = "SelectMediaAction",
  APP_SETTINGS_ACTION = "AppSettingsAction",

  LOGIN = "login",
  LOGOUT = "logout",
  REGISTER = "register",
  FORGOT_PASSWORD = "forgotPassword",
  RESET_PASSWORD = "resetPassword",
  VERIFY_AUTH = "verifyAuth",
  //   UPDATE_USER = "updateUser",

  HELPER_FUNCTIONS = "helperFunctions",
}

enum Mutations {
  SET_SAMPLE_MUTATION = "SampleMutation",
  // VERIFY_AUTH_MUTATION = "verifyAuthMutation",

  SET_SELECT_MEDIA_MUTATION = "SelectMediaMutation",
  APP_SETTINGS_MUTATION = "AppSettingsMutation",

  PURGE_AUTH = "logOut",
  SET_AUTH = "setAuth",
  SET_USER_PERMISSIONS = "setUserPermissions",
  DEFAULT_THUMBNAIL_SIZES = "thumbnailSizes",
  SET_USER = "setUser",
  SET_PASSWORD = "setPassword",
  SET_ERROR = "setError",


  SET_LAYOUT_CONFIG = "setLayoutConfig",
  RESET_LAYOUT_CONFIG = "resetLayoutConfig",
  OVERRIDE_LAYOUT_CONFIG = "overrideLayoutConfig",
  OVERRIDE_PAGE_LAYOUT_CONFIG = "overridePageLayoutConfig",

  HELPERS = "helpers",
}

export { Actions, Mutations };