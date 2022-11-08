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

<script>
import LoginForm from '../components/LoginForm.vue';
import MainLogo from '../components/icons/MainLogo.vue';
import BackgroundLetter from '../components/icons/BackgroundLetter.vue';

export default {
  name: 'LoginView',
  components: {
    LoginForm,
    MainLogo,
    BackgroundLetter
  }
}
</script>

<style lang="scss">
.login-view {
  display: flex;
  min-height: 100vh;
  overflow: hidden;
  &__main {
    display: flex;
    flex-direction: column;
    width: 100%;
    flex: 1;
    padding: $gutter-l;
    background-color: $green-2;
    &__logo {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: $gutter-xxl;
      svg {
        max-width: 400px;
      }
    }
  }
}

.login-aside {
  display: none;
  &__logo {
    width: 55%;
    min-width: 350px;
    svg {
      width: 100%;
    }
  }
  &__background {
    position: absolute;
    right: 0;
    top: 0;
    z-index: -1;
  }
}

@media all and (min-width: 800px) {
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
@media all and (min-width: 1500px) {
  .login-view__main {
    width: 800px;
  }
}
</style>
