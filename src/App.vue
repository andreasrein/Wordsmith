<script>
import "./styles/index.scss";
import { RouterView } from "vue-router";

export default {
  components: { RouterView },
};
</script>

<template>
  <header></header>
  <main>
    <RouterView />
  </main>
</template>
