<template>
  <div class="login-form">
    <form action="" class="form">
      <h1>Välkomment till Wordsmith!</h1>
      <div class="login-form__row">
        <label for="email-input">E-post</label>
        <input type="email" id="email-input" name="email" placeholder="john.doh@email.com" required aria-required="true">
      </div>
      <div class="login-form__row">
        <label for="email-input">Lösenord</label>
        <input type="password" id="password-input" name="password" placeholder="********" required aria-required="true">
      </div>
      <div class="align-right">
        <button type="submit">Logga in</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
  .login-form {
    display: flex;
    flex: none;
    flex-direction: column;
    justify-content: center;
    max-width: 400px;
    margin: 0 auto;
  }
  @media all and (min-width: 800px) {
    .login-form {
      flex: 1;
    }
  }
  .login-form h1 {
    margin-bottom: var(--gutter-xl);
  }
  .login-form__row {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-bottom: var(--gutter-xl);
  }
</style>