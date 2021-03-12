import { defineNuxtMiddleware } from "@nuxtjs/composition-api";
import { RootMutation } from "~/store";

export default defineNuxtMiddleware(async context => {
  context.$fire.auth.onAuthStateChanged(
    async user => {
      console.log("[AuthMiddleware] user", user);

      context.store.commit(RootMutation.SET_USER, {
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

      if (!context.store?.state?.user?.uid) return context.redirect(401, "/");
    },
    error => {
      console.log("[AuthMiddleware] error", error);
    },
    () => {
      console.log("[AuthMiddleware] completed");
    }
  );

  // console.log('[AuthMiddleware] context.store.state.user', context.store.state.user)

  // if (!context.store.state.user) context.redirect(401, '/')
});
