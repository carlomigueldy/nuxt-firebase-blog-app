import { GetterTree, ActionTree, MutationTree, Plugin } from "vuex";

export type AppStoreModule<CurrentModuleState, AppRootState> = {
  state?: CurrentModuleState | (() => CurrentModuleState);
  getters?: GetterTree<CurrentModuleState, AppRootState>;
  mutations?: MutationTree<CurrentModuleState>;
  actions?: ActionTree<CurrentModuleState, AppRootState>;
  plugins?: Plugin<CurrentModuleState>[];
  devtools?: boolean;
  strict?: boolean;
};
