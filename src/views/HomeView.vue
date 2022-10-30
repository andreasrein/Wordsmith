<template>
  <div class="home">
    <div class="home__background">
      <BackgroundLetter />
    </div>
    <div class="home__logo">
      <MainLogo />
    </div>
    <form class="home__form">
      <div class="home__form__input">
        <label for="smithing-field">Skriv din mening här</label>
        <input type="text" id="smithing-field">
      </div>
      <div class="home__form__button">
        <button type="button">Smith it!</button>
      </div>
    </form>
  </div>
</template>
<script>
import MainLogo from '@/components/icons/MainLogo.vue'
import BackgroundLetter from '@/components/icons/BackgroundLetter.vue'

export default {
  components: { MainLogo, BackgroundLetter }
}
</script>

<style lang="scss">
.home {
  max-width: 660px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  &__background {
    opacity: 0.1;
    position: absolute;
    right: 0;
    top: 0;
    z-index: -1;
  }
  &__logo {
    display: flex;
    width: 100%;
    justify-content: center;
    margin-bottom: calc($gutter-xxl * 4);
    max-width: 340px;
    margin-top: 20vh;
    padding: $gutter-l;
  }
  &__form {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: flex-end;
    padding: $gutter-l;
    &__input {
      display: flex;
      flex-direction: column;
      width: 100%;
      color: $white;
    }
    &__button {
      flex: 1;
      width: 100%;
      margin-left: $gutter-l;
      margin-top: $gutter-l;
      button {
        width: 100%;
        text-align: center;
      }
    }

  }
}
@media all and (min-width: 500px) {
  .home__form__button {
    flex: none;
    width: auto;
    margin-top: $gutter-l;
  }
  .home__form {
    flex-direction: row;
  }
}
@media all and (min-width: 800px) {
  .home__form {
    flex-direction: row;
  }
}
</style>