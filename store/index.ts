import { GetterTree, ActionTree, MutationTree } from "vuex";
import { Post } from "~/models/Post";
import { User } from "~/models/User";
import { AppStoreModule } from "~/utils/store-module";

export type RootState = {
  user: User | any;
  posts: Post[];
};

export enum RootMutation {
  SET_USER = "SET_USER",
  SET_POSTS = "SET_POSTS"
}

export enum RootAction {
  FETCH_ALL_POSTS = "fetchAllPosts"
}

const store: AppStoreModule<RootState, RootState> = {
  state: () => ({
    posts: [],
    user: null
  }),

  mutations: {
    [RootMutation.SET_USER]: (state, payload) => (state.user = payload),

    [RootMutation.SET_POSTS]: (state, payload) => (state.posts = payload)
  },

  actions: {
    [RootAction.FETCH_ALL_POSTS](context) {
      console.log(RootAction.FETCH_ALL_POSTS, context);

      context.commit(RootMutation.SET_POSTS, []);

      return "Awesome";
    }
  }
};

export default store;
