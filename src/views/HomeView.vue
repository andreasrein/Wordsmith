<template>
  <div class="home">
    <div class="home__background">
      <BackgroundLetter />
    </div>
    <section class="home__logo">
      <MainLogo />
    </section>
    <SmithingInput />
    <SmithingHistory />
  </div>
</template>

<script>
import MainLogo from '@/components/icons/MainLogo.vue'
import BackgroundLetter from '@/components/icons/BackgroundLetter.vue'
import SmithingInput from '@/components/SmithingInput.vue'
import SmithingHistory from '@/components/SmithingHistory.vue'

export default {
  name: 'HomeView',
  components: { 
    MainLogo,
    BackgroundLetter,
    SmithingInput,
    SmithingHistory
  }
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