<template>
  <div class="app-wrapper">
    <main>
      <RouterView />
    </main>
  </div>
</template>

<script>
import './styles/index.scss';
import { RouterView } from 'vue-router';

export default {
  components: {
    RouterView
  },
  created () {
    this.$store.dispatch('auth/checkIfAuthorized')
  }
}
</script>
<style lang="scss">
  .app-wrapper {
    display: flex;
    flex-direction: column;
  }
</style>