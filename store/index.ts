import { GetterTree, ActionTree, MutationTree, Plugin } from "vuex";
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
  SIGN_IN_WITH_EMAIL_AND_PASSWROD = "SIGN_IN_WITH_EMAIL_AND_PASSWROD",
  SIGN_IN_WITH_FACEBOOK = "SIGN_IN_WITH_FACEBOOK",
  SIGN_IN_WITH_GOOGLE = "SIGN_IN_WITH_GOOGLE",
  SIGN_IN_WITH_GITHUB = "SIGN_IN_WITH_GITHUB",
  FETCH_ALL_POSTS = "FETCH_ALL_POSTS",
  ON_AUTH_STATE_CHANGED_ACTION = "ON_AUTH_STATE_CHANGED_ACTION"
}

const state = (): RootState => ({
  posts: [],
  user: null
});

const mutations: MutationTree<RootState> = {
  [RootMutation.SET_USER]: (state, payload) => (state.user = payload),

  [RootMutation.SET_POSTS]: (state, payload) => (state.posts = payload)
};

const actions: ActionTree<RootState, RootState> = {
  async nuxtServerInit({ dispatch, commit }, { req }) {
    this.$fire.auth.onAuthStateChanged(
      user => {
        console.log("[Store] nuxtServerInit -> onAuthStateChanged", user);

        if (user) {
          commit(RootMutation.SET_USER, {
            uid: user?.uid,
            displayName: user?.displayName,
            email: user?.email,
            emailVerified: user?.emailVerified,
            isAnonymous: user?.isAnonymous,
            phoneNumber: user?.phoneNumber,
            photoURL: user?.photoURL,
            providerId: user?.providerId,
            refreshToken: user?.refreshToken,
            tenantId: user?.tenantId
          });
        }
      },
      error => {
        console.log("[Store] nuxtServerInit -> error", error);
      },
      () => {
        console.log("[Store] nuxtServerInit -> completed");
      }
    );
  },

  async [RootAction.SIGN_IN_WITH_EMAIL_AND_PASSWROD](
    { state, commit },
    payload
  ) {
    try {
      const userCredential = await this.$fire.auth.signInWithEmailAndPassword(
        payload.email,
        payload.password
      );

      const user = userCredential?.user;

      if (user) {
        const {
          uid,
          displayName,
          email,
          emailVerified,
          isAnonymous,
          phoneNumber,
          photoURL,
          providerId,
          refreshToken,
          tenantId
        } = user;

        commit(RootMutation.SET_USER, {
          uid,
          displayName,
          email,
          emailVerified,
          isAnonymous,
          phoneNumber,
          photoURL,
          providerId,
          refreshToken,
          tenantId
        });
      }

      return user;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  [RootAction.FETCH_ALL_POSTS](context) {
    console.log(RootAction.FETCH_ALL_POSTS, context);

    context.commit(RootMutation.SET_POSTS, []);

    return "Awesome";
  }
};

export default {
  state,

  mutations,

  actions
};
