<template>
  <section class="modal">
    <aside class="modal__cover" @click="handleClose"></aside>
    <div class="modal__inner" :class="`modal__inner--${size}`">
      <header class="modal__inner__header">
        <h2>
          <slot name="header"></slot>
        </h2>
      </header>
      <slot></slot>
      <footer class="modal__inner__footer">
        <slot name="footer"></slot>
      </footer>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: 's'
    }
  },
  methods: {
    handleClose () {
      this.$emit('onClose')
    }
  }
}
</script>

<style lang="scss">
.modal {
  &__cover {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(34, 34, 34, .75);
    z-index: 2000;
  }
  &__inner {
    position: fixed;
    max-height: 90%;
    width: 100%;
    top: 50%;
    left: 50%;
    background-color: $white;
    color: $black;
    border-radius: $border-radius;
    transform: translate(-50%, -50%);
    overflow: auto;
    padding: $gutter-l $gutter-xl;
    z-index: 99999;
    box-shadow: 0 4px 16px 0 rgba($green-2, .3);
    &--s {
      max-width: 360px;
    }
    &--l {
      max-width: calc(100% - (#{$gutter-l} * 2));
    }
    &__header {
      color: $black;
      margin-bottom: $gutter-xxl;
    }
    &__footer {
      margin-top: calc($gutter-xl * 2);
    }
  }
}
</style>