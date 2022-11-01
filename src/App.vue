<template>
  <header></header>
  <main>
    <RouterView />
  </main>
</template>

<script>
import './styles/index.scss';
import { RouterView } from 'vue-router';

export default {
  components: { RouterView },
  data () {
    return {
      loading: false
    }
  },
  created () {
    this.$store.dispatch('auth/checkIfAuthorized')
  }
}
</script>
