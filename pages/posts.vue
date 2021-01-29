<template>
  <div>
    <v-app-bar color="orange darken-1" dark fixed app>
      <v-toolbar-title v-text="state.title" />
      <v-spacer />
      <v-btn @click="signOut()" text>Sign Out</v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <h1>Posts</h1>
      </v-container>
    </v-main>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, useContext } from "@nuxtjs/composition-api";
import { RootMutation } from "~/store/index";

type State = {};

export default defineComponent({
  middleware: "auth",

  setup() {
    const context = useContext();
    const state = reactive<State>({
      title: "Firebase Blog App",
      email: "",
      password: ""
    });

    function signOut() {
      context.$fire.auth.signOut();
      context.store.commit(RootMutation.SET_USER, null);
      context.app.router?.push({ name: "index" });
    }

    return {
      state,
      signOut
    };
  }
});
</script>
