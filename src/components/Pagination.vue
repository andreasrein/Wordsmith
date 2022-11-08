<template>
  <section
    class="pagination"
    :class="{
      'pagination--first-page': index === 0,
      'pagination--last-page': index === maxPage
    }">
    <button class="minor pagination__prev" @click="prevClick">
      <ChevronLeft /> Prev
    </button>
    <button class="minor pagination__next" @click="nextClick">
      Next <ChevronRight />
    </button>
  </section>
</template>

<script>
import ChevronRight from '@/components/icons/ChevronRight.vue'
import ChevronLeft from '@/components/icons/ChevronLeft.vue'

export default {
  components: {
    ChevronRight,
    ChevronLeft
  },
  props: {
    pageSize: {
      type: Number
    },
    total: {
      type: Number
    }
  },
  data () {
    return {
      index: 0
    }
  },
  computed: {
    maxPage () {
      return Math.floor(this.total / this.pageSize)
    }
  },
  methods: {
    prevClick () {
      this.index--
      this.$emit('onPaginate', this.index)
    },
    nextClick () {
      this.index++
      this.$emit('onPaginate', this.index)
    }
  }
}
</script>

<style lang="scss">
.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .pagination__next {
    margin-right: $gutter-xs;
  }
  &--first-page .pagination__prev,
  &--last-page .pagination__next {
    visibility: hidden;
  }
}
</style>