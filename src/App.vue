<template>
  <div class="app-wrapper">
    <main>
      <RouterView />
    </main>
  </div>
</template>

<script>
import './styles/index.scss'
import { RouterView } from 'vue-router'
import { mapActions } from 'vuex'

export default {
  components: {
    RouterView
  },
  created () {
    this.checkIfAuth()
  },
  methods: {
    ...mapActions({
      checkIfAuth: 'auth/checkIfAuthorized'
    })
  }
}
</script>
<style lang="scss">
  .app-wrapper {
    display: flex;
    flex-direction: column;
  }
</style>