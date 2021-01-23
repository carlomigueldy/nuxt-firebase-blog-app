<template>
  <div></div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "@nuxtjs/composition-api";

type IndexPageState = {};

export default defineComponent({
  setup() {
    const state = reactive<IndexPageState>({});

    return {
      state
    };
  }
});
</script>
