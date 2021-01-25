<template>
  <div>
    <v-form ref="form" @submit.prevent="signIn()">
      <v-card>
        <v-card-title>Login</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="state.email"
            :rules="state.rules.required"
            type="email"
            label="Email"
            outlined
          ></v-text-field>
          <v-text-field
            v-model="state.password"
            :rules="state.rules.required"
            type="password"
            label="Password"
            outlined
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn type="submit" color="primary">Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  useContext
} from "@nuxtjs/composition-api";

type State = {
  email: string;
  password: string;
  user: any;
  rules: {
    [key: string]: ((value: any) => true | string)[];
  };
};

export default defineComponent({
  setup() {
    const context = useContext();
    const form = ref();
    const state = reactive<State>({
      email: "",
      password: "",
      user: null,
      rules: {
        required: [value => !!value || "This field is required."]
      }
    });








    const signIn = async () => {
      if (form.value.validate()) {
        try {
          const userCredential = await context.$fire.auth.signInWithEmailAndPassword(
            state.email,
            state.password
          );
          state.user = userCredential.user;
        } catch (error) {
          console.log(error);
        }
      }
    };

    return {
      state,
      signIn,
      form
    };
  }
});
</script>
