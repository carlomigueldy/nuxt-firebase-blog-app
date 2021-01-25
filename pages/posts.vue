<template>
  <div></div>
</template>

<script lang="ts">
import { defineComponent, reactive, useContext } from "@nuxtjs/composition-api";

type State = {};

export default defineComponent({
  setup() {
    const context = useContext();
    const state = reactive<State>({
      email: "",
      password: ""
    });

    const signIn = async () => {};

    return {
      state
    };
  }
});
</script>
