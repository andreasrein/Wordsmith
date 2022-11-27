<template>
  <div class="home">
    <div class="home__background">
      <BackgroundLetter />
    </div>
    <section class="home__logo">
      <MainLogo />
    </section>
    <div class="home__err">
      <AlertBlock v-if="sentenceErr" :err="sentenceErr" label="Något gick snett!">
        <span>Försök igen!</span>
      </AlertBlock>
    </div>
    <SmithingInput />
    <SmithingHistory />
    <Footer />
  </div>
</template>

<script>
import MainLogo from '@/components/icons/MainLogo.vue'
import BackgroundLetter from '@/components/icons/BackgroundLetter.vue'
import SmithingInput from '@/components/SmithingInput.vue'
import SmithingHistory from '@/components/SmithingHistory.vue'
import AlertBlock from '@/components/AlertBlock.vue'
import Footer from '@/components/Footer.vue'
import { mapState } from 'vuex'

export default {
  name: 'HomeView',
  components: { 
    MainLogo,
    BackgroundLetter,
    SmithingInput,
    SmithingHistory,
    AlertBlock,
    Footer
  },
  computed: {
    ...mapState({
      sentenceErr: state => state.sentence.sentenceErr
    })
  }
}
</script>

<style lang="scss" scoped>
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
    margin-bottom: 0;
    max-width: 340px;
    margin-top: 0;
    padding: $gutter-l;
  }
  &__err {
    width: 100%;
    padding: $gutter-l;
  }
}
@media all and (min-width: 500px) {
  .home__logo {
    margin-top: 10vh;
    margin-bottom: calc($gutter-xxl * 3);
  }
}
</style>