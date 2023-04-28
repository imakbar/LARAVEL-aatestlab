import { Action, Mutation, Module, VuexModule } from "vuex-module-decorators";
import { Actions, Mutations } from "../enums/StoreEnums";

interface SampleData {}

interface StoreInfo {
  sample_data: SampleData;
}

@Module
export default class SampleModule extends VuexModule implements StoreInfo {
  sample_data = {} as SampleData;

  @Mutation
  [Mutations.SET_SAMPLE_MUTATION](payload) {
    this.sample_data = payload;
  }

  @Action
  [Actions.SET_SAMPLE_ACTION](payload) {
    this.context.commit(Mutations.SET_SAMPLE_MUTATION, payload);
  }
}
