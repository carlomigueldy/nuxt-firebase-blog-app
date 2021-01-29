<template>
  <v-app>
    <v-main class="orange darken-1 d-flex justify-center align-center">
      <v-container>
        <v-row justify="center" align="center">
          <v-col xl="5" lg="6" md="8" sm="12" xs="12">
            <v-form
              ref="form"
              @submit.prevent="signIn()"
              aria-autocomplete="off"
              autocomplete="off"
            >
              <v-card class="rounded-lg elevation-16 px-10 py-10">
                <div class="d-flex justify-center align-center py-3">
                  <div class="headline text-center">
                    <v-icon color="orange darken-3" size="128">mdi-fire</v-icon>
                    <div>Awesome Fire Blog</div>
                  </div>
                </div>

                <v-card-text>
                  <v-text-field
                    v-model="state.email"
                    :rules="state.rules.required"
                    type="email"
                    label="Email"
                    name="new-email"
                    autocomplete="new-email"
                    aria-autocomplete="new-email"
                    solo
                  ></v-text-field>
                  <v-text-field
                    v-model="state.password"
                    :rules="state.rules.required"
                    type="password"
                    label="Password"
                    name="new-password"
                    autocomplete="new-password"
                    aria-autocomplete="new-password"
                    solo
                  ></v-text-field>
                </v-card-text>
                <div class="px-5">
                  <v-btn
                    type="submit"
                    block
                    x-large
                    class="text-capitalize"
                    color="primary"
                    depressed
                  >
                    Sign In
                  </v-btn>
                </div>

                <section id="auth-providers" class="mt-5">
                  <small>Or you may sign in with ...</small>

                  <div class="d-flex justify-space-around align-center mt-5">
                    <v-tooltip bottom>
                      <template #activator="{ on, attrs }">
                        <v-btn
                          v-bind="attrs"
                          v-on="on"
                          fab
                          @click="signInWithFacebook()"
                        >
                          <v-icon color="blue" large>mdi-facebook</v-icon>
                        </v-btn>
                      </template>
                      <span>Sign in with Facebook</span>
                    </v-tooltip>

                    <v-tooltip bottom>
                      <template #activator="{ on, attrs }">
                        <v-btn
                          v-bind="attrs"
                          v-on="on"
                          fab
                          @click="signInWithGoogle()"
                        >
                          <v-icon color="orange darken-2" large>
                            mdi-google
                          </v-icon>
                        </v-btn>
                      </template>
                      <span>Sign in with Google</span>
                    </v-tooltip>

                    <v-tooltip bottom>
                      <template #activator="{ on, attrs }">
                        <v-btn
                          v-bind="attrs"
                          v-on="on"
                          fab
                          @click="signInWithGithub()"
                        >
                          <v-icon color="black" large>mdi-github</v-icon>
                        </v-btn>
                      </template>
                      <span>Sign in with Github</span>
                    </v-tooltip>
                  </div>
                </section>
              </v-card>
            </v-form>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  useContext
} from "@nuxtjs/composition-api";
import { RootAction, RootMutation } from "~/store";

type State = {
  email: string;
  password: string;
  user: any;
  rules: {
    [key: string]: ((value: any) => true | string)[];
  };
};

export default defineComponent({
  layout: "none",

  setup() {
    const context = useContext();
    const form = ref();
    const state = reactive<State>({
      email: "carlomigueldy@gmail.com",
      password: "password",
      user: null,
      rules: {
        required: [value => !!value || "This field is required."]
      }
    });

    const signIn = async () => {
      if (form.value.validate()) {
        try {
          const response = await context.store.dispatch(
            RootAction.SIGN_IN_WITH_EMAIL_AND_PASSWROD,
            {
              email: state.email,
              password: state.password
            }
          );

          await context.app.router?.push({ name: "posts" });
        } catch (error) {
          console.log(error);
        }
      }
    };

    function signInWithFacebook() {}
    function signInWithGoogle() {}
    function signInWithGithub() {}

    return {
      state,
      signIn,
      form,
      signInWithFacebook,
      signInWithGoogle,
      signInWithGithub
    };
  }
});
</script>

<style scoped>
/* main.v-main {
  background-image: url("../static/images/blue.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
} */
</style>
