<script>
  import LoginForm from '../components/LoginForm.vue'
  import MainLogo from '../components/icons/MainLogo.vue'
  import BackgroundLetter from '../components/icons/BackgroundLetter.vue'

  export default {
    components: { LoginForm, MainLogo, BackgroundLetter }
  }
</script>
<template>
  <div class="login-view">
    <div class="login-view__main">
      <div class="login-view__main__logo">
        <MainLogo />
      </div>
      <LoginForm />
    </div>
    <aside class="login-aside">
      <div class="login-aside__logo">
        <MainLogo />
      </div>
      <div class="login-aside__background">
        <BackgroundLetter />
      </div>
    </aside>
  </div>
</template>

<style scoped>
  .login-view {
    display: flex;
    min-height: 100vh;
  }
  .login-view__main {
    display: flex;
    flex-direction: column;
    width: 100%;
    flex: 1;
    padding: var(--gutter-l);
    background-color: var(--green-2);
  }
  .login-view__main__logo {
    display: flex;
    /* flex: 1; */
    justify-content: center;
    align-items: center;
    margin-bottom: var(--gutter-xxl);
  }
  .login-view__main__logo svg {
    max-width: 400px;
  }
  @media all and (min-width: 1500px) {
    .login-view__main {
      width: 800px;
    }
  }
  .login-aside {
    display: none;
  }
  @media (min-width: 800px) {
    .login-view__main__logo {
      display: none;
    }

    .login-aside {
      position: relative;
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 auto;
    }
  }
  .login-aside .login-aside__logo {
    width: 55%;
    min-width: 350px;
    
  }
  .login-aside .login-aside__logo svg {
    width: 100%;
  }
  .login-aside__background {
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: -1;
  }
</style>
