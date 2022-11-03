<template>
  <div class="login-form">
    <form class="form" data-test="login-form" @submit.prevent="handleSubmit">
      <h1>Välkomment till Wordsmith!</h1>
      <aside v-if="loginErr" class="login-form__err">
        <h3 class="login-form__err__header">Misslyckad inloggning!</h3>
        <div>Kontrollera att användarnamn och lösenord är korrekt och försök igen.</div>
      </aside>
      <div class="login-form__row">
        <label for="email-input">E-post</label>
        <input
          type="email"
          id="email-input"  
          name="email"
          placeholder="john.doh@email.com"
          aria-required="true"
          :disabled="loadingLogin"
          data-test="email"
          v-model="username"
        />
      </div>
      <div class="login-form__row">  
        <label for="email-input">Lösenord</label>
        <input
          type="password"
          id="password-input"
          name="password"
          placeholder="********"
          aria-required="true"
          minlength="8"
          :disabled="loadingLogin"
          data-test="password"
          v-model="password"
        />
      </div>
      <div class="login-form__button">
        <div v-if="loadingLogin" class="login-form__button__spinner">
          <SpinnerIcon/>
        </div>
        <button
          type="submit"
          class="primary"
          :disabled="isButtonDisabled">
          <span>{{loadingLogin ? 'Loggar in' : 'Logga in'}}</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import SpinnerIcon from '@/components/icons/SpinnerIcon.vue'
export default {
  name: 'LoginForm',
  components: { SpinnerIcon },
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    handleSubmit () {
      const payload = {
        username: this.username,
        password: this.password
      }
      this.$store.dispatch('auth/login', payload)
    }
  },
  computed: {
    ...mapState({
      loginErr: state => state.auth.loginErr,
      loadingLogin: state => state.auth.loadingLogin,
    }),
    isButtonDisabled () {
      if ((this.username.length < 1 && this.password.length < 1) || this.loadingLogin) {
        return true
      }
      return false
    }
  }
};
</script>

<style lang="scss">
.login-form {
  display: flex;
  flex: none;
  flex-direction: column;
  justify-content: center;
  max-width: 400px;
  margin: 0 auto;
  h1 {
    margin-bottom: $gutter-xl;
  }
  &__row {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-bottom: $gutter-xl;
  }
  &__button {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    &__spinner {
      margin-right: $gutter-l;
    }
  }
  &__err {
    padding: $gutter-l;
    margin-bottom: $gutter-xl;
    background-color: $yellow-1;
    border-radius: $border-radius;
    &__header {
      margin-bottom: $gutter-s;
    }
  }

}
@media all and (min-width: 800px) {
  .login-form {
    flex: 1;
  }
}
</style>
