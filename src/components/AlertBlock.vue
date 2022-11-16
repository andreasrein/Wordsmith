<template>
  <aside class="alert-block">
    <h3 class="alert-block__header">{{label}}</h3>
    <slot></slot>
    <div class="alert-block__footer">Status: {{err.response.status}}</div>
  </aside>
</template>

<script>
export default {
  name: 'AlertBlock',
  props: {
    err: {
      type: Object
    },
    label: {
      type: String
    }
  }
}
</script>

<style lang="scss">
.alert-block {
  padding: $gutter-l;
  margin-bottom: $gutter-xl;
  background-color: $yellow-1;
  border-radius: $border-radius;
  box-shadow: 0 4px 16px 0 rgba($black, .3);
  &__header {
    margin-bottom: $gutter-s;
  }
  &__footer {
    margin-top: $gutter-l;
  }
}
</style>