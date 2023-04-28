import { Action, Mutation, Module, VuexModule } from "vuex-module-decorators"
import ApiService from "../../services/ApiService"
import JwtService from "../../services/JwtService"
import { Actions, Mutations } from "../enums/StoreEnums"
import * as Helpers from "../../components/helpers/helpers"

import { useStore } from "vuex";

const store = useStore();

export interface helpers {}

export interface User {
  name: string;
  surname: string;
  email: string;
  password: string;
  api_token: string;
}

export interface UserPermissionsData {}
export interface DefaultThumbnailSizes {}

export interface UserAuthInfo {
  errors: unknown;
  user: User;
  userPermissions: Object;
  defaultThumbnailSizes: Object;
  isAuthenticated: boolean;
}

@Module
export default class AuthModule extends VuexModule implements UserAuthInfo {
  errors = {};
  user = {} as User;
  userPermissions = {} as UserPermissionsData;
  defaultThumbnailSizes = {} as DefaultThumbnailSizes;
  isAuthenticated = !!JwtService.getToken();

  /**
   * Get current user object
   * @returns User
   */
  get currentUser(): User {
    return this.user;
  }

  /**
   * Verify user authentication
   * @returns boolean
   */
  get isUserAuthenticated(): boolean {
    return this.isAuthenticated;
  }

  /**
   * Get authentification errors
   * @returns array
   */
  get getErrors() {
    return this.errors;
  }

  @Mutation
  [Mutations.SET_ERROR](error) {
    this.errors = { ...error };
  }

  @Mutation
  [Mutations.HELPERS](data) {
    this.helpers = data;
  }

  @Mutation
  [Mutations.SET_AUTH](user) {
    // console.log('set_auth=',user)
    this.isAuthenticated = true;
    this.user = user.userInfo;
    this.errors = {}; 
    JwtService.saveToken(user.userInfo.api_token);
    JwtService.saveUser(user.userInfo.id);
  }

  @Mutation
  [Mutations.SET_USER_PERMISSIONS](permissions:any) {
    // console.log('SET_USER_PERMISSIONS=',permissions)
    // this.user_permissions = permissions;
    this.userPermissions = permissions
  }

  @Mutation
  [Mutations.DEFAULT_THUMBNAIL_SIZES](default_thumbnail_sizes:any) {
    this.defaultThumbnailSizes = default_thumbnail_sizes
  }

  @Mutation
  [Mutations.SET_USER](user) {
    this.user = user;
  }

  @Mutation
  [Mutations.SET_PASSWORD](password) {
    this.user.password = password;
  }

  @Mutation
  [Mutations.PURGE_AUTH]() {
    this.isAuthenticated = false;
    this.user = {} as User;
    this.errors = [];
    JwtService.destroyToken();
  }

  @Action
  [Actions.LOGIN](credentials) {
    return ApiService.post("login", credentials)
      .then(({ data }) => {
        JwtService.saveInfo(JSON.stringify(data))
        this.context.commit(Mutations.SET_AUTH, data);
      })
      .catch(({ response }) => {
        // if(response.data.errors && response.data.errors.length > 0){
          if(typeof response.data.errors != "undefined"){
          this.context.commit(Mutations.SET_ERROR, response.data.errors);
        } else {
          this.context.commit(Mutations.SET_ERROR, [response.data.message]);
        }
      });
  }

  @Action
  [Actions.LOGOUT]() {
    this.context.commit(Mutations.PURGE_AUTH);
  }

  @Action
  [Actions.REGISTER](credentials) {
    return ApiService.post("register", credentials)
      .then((response) => {
        // this.context.commit(Mutations.SET_AUTH, data);
        // if(response.data.status == 'success'){
          return response.data
        // } else {
        //   this.context.commit(Mutations.SET_ERROR, response.data);
        // }
      })
      .catch(({ response }) => {
        this.context.commit(Mutations.SET_ERROR, response.data.errors);
      });
  }

  @Action
  [Actions.FORGOT_PASSWORD](payload) {
    return ApiService.post("forgot-password", payload)
      .then(() => {
        this.context.commit(Mutations.SET_ERROR, {});
      })
      .catch(({ response }) => {
        // if(response.data.errors && response.data.errors.length > 0){
          if(typeof response.data.errors != "undefined"){
          this.context.commit(Mutations.SET_ERROR, response.data.errors);
        } else {
          this.context.commit(Mutations.SET_ERROR, [response.data.message]);
        }
      });
  }

  @Action
  [Actions.RESET_PASSWORD](payload) {
    console.log(payload)
    return ApiService.post("reset-password", payload)
      .then(() => {
        this.context.commit(Mutations.SET_ERROR, {});
      })
      .catch(({ response }) => {
        // if(response.data.errors && response.data.errors.length > 0){
        if(typeof response.data.errors != "undefined"){
          this.context.commit(Mutations.SET_ERROR, response.data.errors);
        } else {
          this.context.commit(Mutations.SET_ERROR, [response.data.message]);
        }
      });
  }

  @Action
  [Actions.VERIFY_AUTH](payload) {
    // console.log('Actions.VERIFY_AUTH payload',payload)
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.post("verify-token", payload)
        .then(({ data }) => {
          // console.log('data data',data.status)
          if(data.status == 'success'){
            this.context.commit(Mutations.SET_AUTH, data);
            // console.log('data.permissions',data.permissions)
            this.context.commit(Mutations.SET_USER_PERMISSIONS, data.permissions)
            this.context.commit(Mutations.DEFAULT_THUMBNAIL_SIZES, data.default_thumbnail_sizes)
            // 
            JwtService.saveInfo(JSON.stringify(data))
            
            /////////////////// App Settings
            // ApiService.get(process.env.MIX_APP_END_POINT+"/app-settings")
            // .then((res) => {
            //     JwtService.saveAppSettings(JSON.stringify(res.data))
            //     // store.dispatch(Actions.APP_SETTINGS_ACTION,res.data);
            // })
            /////////////////// App Settings

          } else {
            this.context.commit(Mutations.PURGE_AUTH);
          }
        })
        .catch(({ response }) => {
          if(response.data.authCheck && response.data.authCheck == false){
            this.context.commit(Mutations.SET_ERROR, [response.data.message]);
            setTimeout(() => {
              window.location.reload();
            }, 500);
          }
          this.context.commit(Mutations.SET_ERROR, response.data.errors);
          this.context.commit(Mutations.PURGE_AUTH);
        });
    } else {
      // console.log('Actions.VERIFY_AUTH else',JwtService.getToken())
      this.context.commit(Mutations.PURGE_AUTH);
    }
  }

  @Action
  [Actions.HELPER_FUNCTIONS]() {
    ApiService.get(Helpers.appEndPoint()+"/helpers")
      .then(({ data }) => {
        this.context.commit(Mutations.HELPERS, data);
      })
      .catch(({ response }) => {
        // console.log('HELPER_FUNCTIONS=',response)
      });
    /////////////////// App Settings
    ApiService.get("/app-settings")
    .then((res) => {
        JwtService.saveAppSettings(JSON.stringify(res.data))
        // store.dispatch(Actions.APP_SETTINGS_ACTION,res.data);
    })
    /////////////////// App Settings
  }
}
