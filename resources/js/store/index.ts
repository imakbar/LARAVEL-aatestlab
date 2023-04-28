import { createStore } from "vuex"
import { config } from "vuex-module-decorators";

// import SampleModule from "@store/modules/SampleModule"
import SampleModule from "./modules/SampleModule"
import AuthModule from "./modules/AuthModule";
import ConfigModule from "./modules/ConfigModule";
import SelectMediaModule from "./modules/SelectMediaModule"

config.rawError = true;

const store = createStore({
    modules: {
        SampleModule,
        AuthModule,
        ConfigModule,
        SelectMediaModule,
    }
});

export default store;