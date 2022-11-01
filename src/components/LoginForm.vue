<template>
  <div class="login-form">
    <form class="form" data-test="login-form" @submit.prevent="handleSubmit">
      <h1>Välkomment till Wordsmith!</h1>
      <div class="login-form__row">
        <label for="email-input">E-post</label>
        <input
          type="email"
          id="email-input"  
          name="email"
          placeholder="john.doh@email.com"
          aria-required="true"
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
          data-test="password"
          v-model="password"
        />
      </div>
      <div class="align-right">
        <button
          type="submit"
          class="primary"
          :disabled="isButtonDisabled">
          Logga in
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'LoginForm',
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
    isButtonDisabled () {
      if (this.username.length < 1 && this.password.length < 1) {
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
}
@media all and (min-width: 800px) {
  .login-form {
    flex: 1;
  }
}
</style>
