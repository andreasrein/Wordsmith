<template>
  <section class="smithing-history">
    <div class="smithing-history__header">
      <h3>Tidigare meningar</h3>
      <button type="button" class="minor" @click="toggleModal">
        <span>Sortera</span>
        <SortIcon />
      </button>
    </div>
    <div class="smithing-history__list">
      <div class="smithing-history__list__header">
        <div>Datum</div>
        <div>Text</div>
      </div>
      <ul class="smithing-list">
        <li class="smithing-list__item">
          <div class="smithing-list__item__date">2022-02-12</div>
          <div>ehT der xof sessorc eht eci, tnetni no enon fo ym ssenisub.</div>
        </li>
        <li class="smithing-list__item">
          <div class="smithing-list__item__date">2022-02-12</div>
          <div>ehT der xof sessorc eht eci, tnetni no enon fo ym ssenisub.</div>
        </li>
        <li class="smithing-list__item">
          <div class="smithing-list__item__date">2022-02-12</div>
          <div>ehT der xof sessorc eht eci, tnetni no enon fo ym ssenisub.</div>
        </li>
      </ul>
    </div>
    <Modal
      v-if="showModal"
      size="s"
      @onClose="toggleModal">
      <template v-slot:header>Sortera</template>
      <section class="modal-sort">
        <div>
          <div class="modal-sort__item">
            <input type="radio" id="dateAsc" name="date"/>
            <label for="dateAsc">Datum (0-9)</label>
          </div>
          <div class="modal-sort__item">
            <input type="radio" id="dateDesc" name="date"/>
            <label for="dateDesc">Datum (9-0)</label>
          </div>
        </div>
        <div>
          <div class="modal-sort__item">
            <input type="radio" id="textAsc" name="text"/>
            <label for="textAsc">Text (A-Ö)</label>
          </div>
          <div class="modal-sort__item">
            <input type="radio" id="textDesc" name="text"/>
            <label for="textDesc">Text (Ö-A)</label>
          </div>
        </div>
      </section>
      <template v-slot:footer>
        <div class="modal-sort__footer">
          <button
            type="button"
            class="primary align-right"
            @click="toggleModal">
            Klar
          </button>
        </div>
      </template>
    </Modal>
  </section>
</template>

<script>
import SortIcon from '@/components/icons/SortIcon.vue'
import Modal from '@/components/Modal.vue'

export default {
  name: 'SmithingList',
  data () {
    return {
      showModal: false
    }
  },
  components: {
    SortIcon,
    Modal
  },
  methods: {
    toggleModal () {
      this.showModal = !this.showModal
    }
  }
}
</script>

<style lang="scss" scoped>
  .smithing-history {
    width: 100%;
    padding: $gutter-l;
    color: $white;
    &__header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-bottom: $gutter-s;
      h3 {
        color: $white;
        font-weight: bold;
      }
      button span {
        margin-right: $gutter-s;
      }
    }
    &__list {
      display: flex;
      flex-direction: column;
      &__header {
        background-color: $green-0;
        padding: $gutter-xl;
        margin-bottom: $gutter-xs;
        font-weight: bold;
        flex: 1;
        display: grid;
        grid-template-columns: 85px auto;
        column-gap: $gutter-xxl;
        border-top-left-radius: $border-radius;
        border-top-right-radius: $border-radius;
      }
    }
    .smithing-list {
      margin: 0;
      padding: 0;
      &__item {
        background-color: rgba($green-2, 0.2);
        margin-bottom: $gutter-xs;
        padding: $gutter-xl;
        display: grid;
        grid-template-columns: 85px auto;
        column-gap: $gutter-xxl;
        &__date {
          display: flex;
          align-items: center;
          font-weight: bold;
        }
      }
    }
  }
  .modal-sort {
    display: grid;
    grid-template-columns: 1fr;
    &__item {
      display: flex;
      align-items: center;
      margin-bottom: $gutter-l;
      font-weight: bold;
      label {
        margin-left: $gutter-s;
      }
    }
    &__footer {
      button {
        width: 100%;
        text-align: center;
      }
    }
  }
  @media all and (min-width: 500px) {
    .smithing-history {
      &__list__header {
        column-gap: calc($gutter-xxl * 2);
      }
      .smithing-list__item {
        column-gap: calc($gutter-xxl * 2);
      }
    }
    .modal-sort {
      grid-template-columns: 1fr 1fr;
      &__footer {
        text-align: right;
        button {
          width: auto;
        }
      }
    }
  }
</style>