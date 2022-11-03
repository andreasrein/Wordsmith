<template>
  <div class="smithing-input">
    <section class="smithing-input__result">
      <div v-if="!loading" class="smithing-input__result__content">{{result}}</div>
      <div v-show="loading" class="smithing-input__result__logo">
        <AcronymLogo />
      </div>
    </section>
    <form class="smithing-input__form">
      <div class="smithing-input__form__input">
        <label for="smithing-field">Skriv din mening här</label>
        <input
          type="text"
          id="smithing-field"
          v-model="smithInput"
          placeholder="The red fox crosses the ice…">
      </div>
      <div class="smithing-input__form__button">
        <button
          type="button"
          class="primary"
          :disabled="smithInput.length < 1"
          @click="handleSmithClick">
          Smith it!
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import AcronymLogo from '@/components/icons/AcronymLogo.vue'
export default {
  name: 'SmithingInput',
  components: { AcronymLogo },
  data () {
    return {
      smithInput: '',
      result: null,
      loading: false
    }
  },
  methods: {
    handleSmithClick () {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 1500);
      const result = this.smithInput.split(/([\W])/).
        map(word => {
          return word.split('').reverse().join('')
        }).join('')

      this.result = result
      this.smithInput = ''
    }
  }
}
</script>

<style lang="scss">
.smithing-input {
  display: flex;
  flex-direction: column;
  width: 100%;
  &__result {
    font-size: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 80px;
    padding: 0 $gutter-l;
    margin-bottom: calc($gutter-xl * 2);
    &__content {
      font-weight: bold;
      color: $white;
    }
    &__logo {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 80px;
      animation: rotateY 1.5s ease-out, fadeinout 1.5s linear;
    }
  }
  &__form {
    flex: 1;
    display: flex;
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
  .smithing-input__form__button {
    flex: none;
    width: auto;
    margin-top: $gutter-l;
  }
  .smithing-input__form {
    flex-direction: row;
  }
}
@media all and (min-width: 800px) {
  .smithing-input__form {
    flex-direction: row;
  }
}
</style>