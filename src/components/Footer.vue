<template>
  <footer class="footer">
    <button
      type="button"
      class="minor minor--green"
      @click="handleLogout">
      Logga ut
    </button>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  methods: {
    handleLogout() {
      this.$store.commit('auth/LOGOUT')
    }
  }
}
</script>

<style lang="scss">
  .footer {
    padding: $gutter-xl;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>