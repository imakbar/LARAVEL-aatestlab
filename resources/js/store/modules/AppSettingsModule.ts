import { Action, Mutation, Module, VuexModule } from "vuex-module-decorators";
import { Actions, Mutations } from "../enums/StoreEnums";

interface AppSettingsMediaData {}

interface StoreInfo {
  app_settings: AppSettingsMediaData;
}

@Module
export default class AppSettingsModule extends VuexModule implements StoreInfo {
  app_settings = {} as AppSettingsMediaData;

  @Mutation
  [Mutations.APP_SETTINGS_MUTATION](payload) {
    this.app_settings = payload;
  }

  @Action
  [Actions.APP_SETTINGS_ACTION](payload) {
    this.context.commit(Mutations.APP_SETTINGS_MUTATION, payload);
  }
}
