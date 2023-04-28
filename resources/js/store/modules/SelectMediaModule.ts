import { Action, Mutation, Module, VuexModule } from "vuex-module-decorators";
import { Actions, Mutations } from "../enums/StoreEnums";

interface SelectMediaData {}

interface StoreInfo {
  select_media_data: SelectMediaData;
}

@Module
export default class SelectMediaModule extends VuexModule implements StoreInfo {
  select_media_data = {} as SelectMediaData;

  @Mutation
  [Mutations.SET_SELECT_MEDIA_MUTATION](payload) {
    this.select_media_data = payload;
  }

  @Action
  [Actions.SET_SELECT_MEDIA_ACTION](payload) {
    this.context.commit(Mutations.SET_SELECT_MEDIA_MUTATION, payload);
  }
}
