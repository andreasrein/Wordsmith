<template>
  <div class="login-form">
    <form class="form" data-test="login-form" @submit.prevent="handleSubmit">
      <h1>Välkomment till Wordsmith!</h1>
      <AlertBlock v-if="loginErr" :err="loginErr" label="Misslyckad inloggning!">
        <span>Kontrollera att användarnamn och lösenord är korrekt och försök igen.</span>
      </AlertBlock>
      <div class="login-form__row">
        <label for="email-input">E-post</label>
        <input
          type="email"
          id="email-input"  
          name="email"
          placeholder="john.doh@email.com"
          aria-required="true"
          :disabled="loading"
          ref="loginEmail"
          data-cy="loginEmail"
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
          :disabled="loading"
          ref="loginPassword"
          data-cy="loginPassword"
          v-model="password"
        />
      </div>
      <div class="login-form__button">
        <div v-if="loading" class="login-form__button__spinner">
          <SpinnerIcon/>
        </div>
        <button
          type="submit"
          class="primary"
          :disabled="isButtonDisabled"
          data-cy="loginSubmit">
          <span>{{loading ? 'Loggar in' : 'Logga in'}}</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import SpinnerIcon from '@/components/icons/SpinnerIcon.vue'
import AlertBlock from '@/components/AlertBlock.vue'

export default {
  name: 'LoginForm',
  components: {
    SpinnerIcon,
    AlertBlock
  },
  data () {
    return {
      username: '',
      password: '',
      loading: false
    }
  },
  methods: {
    ...mapActions({
      login: 'auth/login'
    }),
    handleSubmit () {
      this.loading = true
      const payload = {
        username: this.username,
        password: this.password
      }
      this.login(payload)
        .then(() => {
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    }
  },
  computed: {
    ...mapState({
      loginErr: state => state.auth.loginErr
    }),
    isButtonDisabled () {
      if ((this.username.length < 1 && this.password.length < 1) || this.loading) {
        return true
      }
      return false
    }
  }
};
</script>

<style lang="scss" scoped>
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

}
@media all and (min-width: 800px) {
  .login-form {
    flex: 1;
  }
}
</style>
