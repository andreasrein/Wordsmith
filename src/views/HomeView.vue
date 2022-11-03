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
    margin-bottom: calc($gutter-xxl * 3);
    max-width: 340px;
    margin-top: 20vh;
    padding: $gutter-l;
  }
}
</style>