<template>
  <div class="app-wrapper">
    <main>
      <RouterView />
    </main>
    <Footer />
  </div>
</template>

<script>
import './styles/index.scss';
import { RouterView } from 'vue-router';
import Footer from '@/components/Footer.vue'

export default {
  components: {
    RouterView,
    Footer
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